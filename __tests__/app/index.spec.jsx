import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import App from "../../src/pages/app/index"
import store from "../../src/store"
import api from "../../src/api/http"

describe("/app page", () => {

    it("should render App properly", async () => {
        await api.signinUser("testing@taylor.com", "Password")

        render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        expect(screen.getAllByText("Übersicht")).toBeDefined()
    })
})