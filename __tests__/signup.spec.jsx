import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import Signup from "../src/pages/signup"
import store from "../src/store"
import api from "../src/api/http"
import { redirect } from "../src/utils"

jest.mock("../src/utils")

describe("/signup page", () => {

    it("should display sign up form", async () => {
        render(
            <Provider store={store}>
                <Signup />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Gymnasium Papenburg/i))

        expect(screen.getByText(/Anmelden/i)).toBeDefined()

        expect(screen.getByLabelText(/Vorname/i)).toBeDefined()
        expect(screen.getByLabelText(/Nachname/i)).toBeDefined()
        expect(screen.getByLabelText(/Email/i)).toBeDefined()
        expect(screen.getByLabelText(/Gewicht/i)).toBeDefined()
        expect(screen.getByLabelText(/Größe/i)).toBeDefined()
        expect(screen.getByLabelText(/Geburtstag/i)).toBeDefined()
        expect(screen.getByText(/Registrieren/i)).toBeDefined()

    })

    it("should require all fields", async () => {
        render(
            <Provider store={store}>
                <Signup />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Gymnasium Papenburg/i))

        let submit = screen.getByText(/Registrieren/i)
        let firstnameField = screen.getByLabelText(/Vorname/i)

        fireEvent.click(submit)

        await waitFor(() => {
            screen.getByText(/(Vorname.*erforderlich|.*Vornamen.*angeben)/)
            screen.getByText(/(Nachname.*erforderlich|.*Nachnamen.*angeben)/)
            screen.getByText(/(Email.*erforderlich|.*Email.*angeben)/)
            screen.getByText(/(Gewicht.*erforderlich|.*Gewicht.*angeben)/)
            screen.getByText(/(Größe.*erforderlich|.*Größe.*angeben)/)
        })
        expect(redirect).not.toHaveBeenCalled()
    })


    it("should validate email uniqueness", async () => {
        render(
            <Provider store={store}>
                <Signup />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Gymnasium Papenburg/i))

        let submit = screen.getByText(/Registrieren/i)
        let emailField = screen.getByLabelText(/Email/i)

        fireEvent.change(emailField, {
            target: {
                value: "isnot@unique.com"
            }
        })
        fireEvent.click(submit)

        await waitFor(() => {
            expect(screen.getByText(/(Email.*benutzt|.*Email.*vergeben)/)).toBeDefined()
        })

        fireEvent.change(emailField, {
            target: {
                value: "is@unique.com"
            }
        })
        fireEvent.click(submit)

        await waitFor(() => {
            expect(screen.queryByText(/(Email.*benutzt|.*Email.*vergeben)/)).toBeNull()
        })
    })
})