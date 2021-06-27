import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import DrinkingEdit from "../../src/pages/app/drinking/[id]"
import store from "../../src/store"
import api from "../../src/api/http"

import { useRouter } from "next/router"

jest.mock("next/router")

let eid = "123456789"

describe("/app/drinking edit page", () => {

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
                <DrinkingEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        expect(screen.getAllByText("Übersicht")).toBeDefined()
        expect(screen.getAllByText(/Löschen/i)).toBeDefined()
    })

    it("should render entry date, time and amount input", async () => {
        render(
            <Provider store={store}>
                <DrinkingEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))
        // wait for entry to load
        await waitFor(() => screen.getAllByText('800'))

        expect(screen.getByPlaceholderText(/Jahr/i).value).toEqual("2020")
        expect(screen.getByPlaceholderText(/Monat/i).value).toEqual("1")
        expect(screen.getByPlaceholderText(/Tag/i).value).toEqual("1")
        expect(screen.getByPlaceholderText(/Stunde/i).value).toEqual("10")
        expect(screen.getAllByText("800")).toBeDefined()
    })

    it("should change entry date and time", async () => {
        render(
            <Provider store={store}>
                <DrinkingEdit />
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

        expect(store.getState().drinking.find(d => d._id === eid)).toBeDefined()
        expect(store.getState().drinking.find(d => d._id === eid).date.getFullYear()).toEqual(2012)
        expect(store.getState().drinking.find(d => d._id === eid).date.getHours()).toEqual(12)
    })

    it("should change entry amount", async () => {
        render(
            <Provider store={store}>
                <DrinkingEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        fireEvent.change(screen.getByTitle(/Trinkmenge/i), {
            target: {
                value: 200
            }
        })
        fireEvent.blur(screen.getByTitle(/Trinkmenge/i))

        expect(store.getState().drinking.find(d => d._id === eid)).toBeDefined()
        await waitFor(() => expect(store.getState().drinking.find(d => d._id === eid).amount).toEqual(200))
    })

    it("should delete entry", async () => {
        render(
            <Provider store={store}>
                <DrinkingEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        fireEvent.click(screen.getByText(/Löschen/i))
        await waitFor(() => expect(store.getState().drinking.find(e => e._id === eid)).toBeUndefined())
    })
})