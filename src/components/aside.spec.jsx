import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import Aside from "./aside"
import api from "../api/http"
import store from "../store"

import { redirect } from "../utils"

jest.mock("../utils")

describe("application Aside component", () => {

    it("should render Aside properly", async () => {
        await api.signinUser("testing@taylor.com", "Password")

        let { unmount } = render(
            <Provider store={store}>
                <Aside showMenu={true} />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Übersicht/i))

        expect(screen.getAllByText(/Übersicht/)).toBeDefined()

        unmount()
    })

    it("should sign out and redirect to /signin", async () => {
        await api.signinUser("testing@taylor.com", "Password")

        render(
            <Provider store={store}>
                <Aside showMenu={true} />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Übersicht/i))

        fireEvent.click(screen.getByTitle(/Abmelden/))

        expect(redirect).toHaveBeenCalledTimes(1)
        expect(redirect).toHaveBeenCalledWith("/signin")
    })

})