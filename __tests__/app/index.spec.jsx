import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import App from "../../src/pages/app/index"
import store from "../../src/store"
import api from "../../src/api/http"

describe("/app page", () => {

    beforeEach(async () => {
        await api.signinUser("testing@taylor.com", "Password")
    })

    it("should render App properly", async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Hallo/i))

        expect(screen.getAllByText("Übersicht")).toBeDefined()
        expect(screen.getAllByText(/Hallo, ich bin dein.*/i)).toBeDefined()
    })

    it("should utter message and clear textbox", async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Hallo/i))

        fireEvent.change(screen.getByPlaceholderText(/Nachricht/i), {
            target: {
                value: "Hallo, ich bin Hakim"
            }
        })
        fireEvent.click(screen.getByTitle(/Nachricht senden/i))

        expect(screen.getByPlaceholderText(/Nachricht/i).value).toEqual("")

        await waitFor(() => screen.getAllByText(/Hallo, ich bin Hakim/i))
    })
})