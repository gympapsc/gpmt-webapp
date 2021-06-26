import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import Aside from "./aside"
import api from "../api/http"
import store from "../store"

describe("application Aside component", () => {

    it("should render Aside properly", async () => {
        await api.signinUser("testing@taylor.com", "Password")

        let { unmount } = render(
            <Provider store={store}>
                <Aside showMenu={false} />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Übersicht/i))

        expect(screen.getAllByText(/Übersicht/)).toBeDefined()

        unmount()
    })

})