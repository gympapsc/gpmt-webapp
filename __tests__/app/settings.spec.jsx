import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import Settings from "../../src/pages/app/settings"
import store from "../../src/store"
import api from "../../src/api/http"

describe("/app/settings page", () => {

    beforeEach(async () => {
        await api.signinUser("testing@taylor.com", "Password")
    })

    it("should render Settings properly", async () => {
        render(
            <Provider store={store}>
                <Settings />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        expect(screen.getAllByText("Übersicht")).toBeDefined()
    })

    it("should change user first- and surname", async () => {
        render(
            <Provider store={store}>
                <Settings />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        expect(screen.getAllByText("Übersicht")).toBeDefined()
    })
})