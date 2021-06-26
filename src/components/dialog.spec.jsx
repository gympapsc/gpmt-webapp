import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import Dialog from "./dialog"
import api from "../api/http"
import store from "../store"

describe("application Aside component", () => {

    it("should render Aside properly", async () => {
        await api.signinUser("testing@taylor.com", "Password")

        render(
            <Provider store={store}>
                <Dialog showMenu={false} />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Hallo/i))

        expect(screen.getAllByText(/Hallo/)).toBeDefined()
    })

})