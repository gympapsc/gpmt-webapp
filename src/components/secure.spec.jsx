import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import Secure from "./secure"
import api from "../api/http"
import { redirect } from "../utils"
import store from "../store"

jest.mock("../utils")


describe("secure component", () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it("should redirect if user not signed in", async () => {
        render(
            <Provider store={store}>
                <Secure>
                    <div>Secure content</div>
                </Secure>
            </Provider>
        )

        await waitFor(() => screen.getByText(/Loading/i))
        expect(screen.queryByText(/Secure\scontent/i)).toBeNull()
        await waitFor(() => expect(redirect).toHaveBeenCalled())
    })

    it("should render child if user signed in", async () => {
        await api.signinUser("testing@taylor.com", "Password")
        render(
            <Provider store={store}>
                <Secure>
                    <div>Secure content</div>
                </Secure>
            </Provider>
        )

        await waitFor(() => screen.getByText(/Loading/i))
        expect(screen.queryByText(/Secure\scontent/i)).toBeNull()
        expect(redirect).not.toHaveBeenCalled()
    })
})