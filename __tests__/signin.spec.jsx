import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import Signin from "../src/pages/signin"
import store from "../src/store"
import { redirect } from "../src/utils"

jest.mock("../src/utils")

describe("/signin page", () => {
    it("should render sign in form", async () => {
        render(
            <Provider store={store}>
                <Signin />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Gymnasium Papenburg/i))

        expect(screen.getByPlaceholderText(/Email/i)).toBeDefined()
        expect(screen.getByPlaceholderText(/Passwort/i)).toBeDefined()
    })

    it("should require all fields", async () => {
        render(
            <Provider store={store}>
                <Signin />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Gymnasium Papenburg/i))

        let submit = screen.getByText(/Anmelden/i)

        fireEvent.click(submit)

        await waitFor(() => {
            screen.getByText(/(Email.*erforderlich|.*Email.*angeben)/)
            screen.getByText(/(Passwort.*erforderlich|.*Passwort.*angeben)/)
        })
    })

    it("should show error on wrong credentials", async () => {
        render(
            <Provider store={store}>
                <Signin />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Gymnasium Papenburg/i))

        let submit = screen.getByText(/Anmelden/i)
        let emailField = screen.getByPlaceholderText(/Email/i)
        let passwordField = screen.getByPlaceholderText(/Passwort/i)

        fireEvent.change(emailField, {
            target: {
                value: "testing@taylor.com"
            }
        })
        fireEvent.change(passwordField, {
            target: {
                value: "WrongPassword"
            }
        })
        fireEvent.click(submit)

        await waitFor(() => {
            screen.getByText(/(Anmeldedaten|Password|Email|Angaben).*falsch/)
        })
    })

    it("should redirect after sign in", async () => {
        render(
            <Provider store={store}>
                <Signin />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Gymnasium Papenburg/i))

        let submit = screen.getByText(/Anmelden/i)
        let emailField = screen.getByPlaceholderText(/Email/i)
        let passwordField = screen.getByPlaceholderText(/Passwort/i)

        fireEvent.change(emailField, {
            target: {
                value: "testing@taylor.com"
            }
        })
        fireEvent.change(passwordField, {
            target: {
                value: "Password"
            }
        })
        fireEvent.click(submit)

        await waitFor(() => expect(redirect).toHaveBeenCalledTimes(1))
    })
})