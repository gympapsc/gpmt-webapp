import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import StressEdit from "../../src/pages/app/stress/[id]"
import store from "../../src/store"
import api from "../../src/api/http"

import { useRouter } from "next/router"

jest.mock("next/router")

const eid = "123456789"

describe("/app/stress edit page", () => {

    beforeAll(() => {
        useRouter.mockImplementation(() => {
            return {
                query: {
                    id: eid
                },
                push: jest.fn()
            }
        })
    })

    beforeEach(async () => {
        await api.signinUser("testing@taylor.com", "Password")
    })

    it("should render after sign in", async () => {
        render(
            <Provider store={store}>
                <StressEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        expect(screen.getAllByText("Übersicht")).toBeDefined()
        expect(screen.getAllByText(/Löschen/i)).toBeDefined()
    })

    it("should render entry date and time input", async () => {
        render(
            <Provider store={store}>
                <StressEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        expect(screen.getByPlaceholderText(/Jahr/i).value).toEqual("2020")
        expect(screen.getByPlaceholderText(/Monat/i).value).toEqual("1")
        expect(screen.getByPlaceholderText(/Tag/i).value).toEqual("1")
        expect(screen.getByPlaceholderText(/Stunde/i).value).toEqual("10")
        expect(screen.getAllByText("2")).toBeDefined()
    })

    it("should change entry date and time", async () => {
        render(
            <Provider store={store}>
                <StressEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        fireEvent.change(screen.getByPlaceholderText(/Jahr/i), {
            target: {
                value: "2012"
            }
        })

        fireEvent.change(screen.getByPlaceholderText(/Stunde/i), {
            target: {
                value: "12"
            }
        })

        expect(store.getState().stress.find(e => e._id === eid)).toBeDefined()
        expect(store.getState().stress.find(e => e._id === eid).date.getFullYear()).toEqual(2012)
        expect(store.getState().stress.find(e => e._id === eid).date.getHours()).toEqual(12)
    })


    it("should change stress level", async () => {
        render(
            <Provider store={store}>
                <StressEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        fireEvent.change(screen.getByTitle(/Stressstufe/i), {
            target: {
                value: 5
            }
        })
        fireEvent.blur(screen.getByTitle(/Stressstufe/i))

        expect(store.getState().stress.find(e => e._id === eid)).toBeDefined()
        expect(screen.getAllByText("5")).toBeDefined()

        await waitFor(() => expect(store.getState().stress.find(e => e._id === eid).level).toEqual(5))
    })

    it("should delete entry", async () => {
        render(
            <Provider store={store}>
                <StressEdit />
            </Provider>
        )

        screen.debug

        await waitFor(() => screen.getAllByText('Übersicht'))

        fireEvent.click(screen.getByText(/Löschen/i))
        await waitFor(() => expect(store.getState().stress.find(e => e._id === eid)).toBeUndefined())
    })
})