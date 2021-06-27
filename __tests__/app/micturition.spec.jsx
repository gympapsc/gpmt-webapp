import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import MicturitionEdit from "../../src/pages/app/micturition/[id]"
import store from "../../src/store"
import api from "../../src/api/http"

import { useRouter } from "next/router"

jest.mock("next/router")

let mid = "123456789"

describe("/app/micturition edit page", () => {

    beforeAll(() => {
        useRouter.mockImplementation(() => {
            return {
                query: {
                    id: mid
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
                <MicturitionEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        expect(screen.getAllByText("Übersicht")).toBeDefined()
        expect(screen.getAllByText(/Löschen/i)).toBeDefined()
    })

    it("should render entry date and time input", async () => {
        render(
            <Provider store={store}>
                <MicturitionEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        expect(screen.getByPlaceholderText(/Jahr/i).value).toEqual("2020")
        expect(screen.getByPlaceholderText(/Monat/i).value).toEqual("1")
        expect(screen.getByPlaceholderText(/Tag/i).value).toEqual("1")
        expect(screen.getByPlaceholderText(/Stunde/i).value).toEqual("10")
    })

    it("should change entry date and time", async () => {
        render(
            <Provider store={store}>
                <MicturitionEdit />
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

        expect(store.getState().micturition.find(m => m._id === mid)).toBeDefined()
        expect(store.getState().micturition.find(m => m._id === mid).date.getFullYear()).toEqual(2012)
        expect(store.getState().micturition.find(m => m._id === mid).date.getHours()).toEqual(12)
    })

    it("should delete entry", async () => {
        render(
            <Provider store={store}>
                <MicturitionEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        fireEvent.click(screen.getByText(/Löschen/i))
        await waitFor(() => expect(store.getState().micturition.find(m => m._id === mid)).toBeUndefined())
    })
})