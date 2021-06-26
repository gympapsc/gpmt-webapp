import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import MicturitionEdit from "../../src/pages/app/micturition/[id]"
import store from "../../src/store"
import api from "../../src/api/http"

describe("/overview page", () => {

    it("should display after sign in", async () => {
        await api.signinUser("testing@taylor.com", "Password")

        render(
            <Provider store={store}>
                <MicturitionEdit />
            </Provider>
        )

        await waitFor(() => screen.getAllByText('Übersicht'))

        expect(screen.getAllByText("Übersicht")).toBeTruthy()
    })
})