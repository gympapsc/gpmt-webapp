import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import About from "../../src/pages/setup/about"
import store from "../../src/store"
import api from "../../src/api/http"

import { redirect } from "../../src/utils"
import { useRouter } from "next/router"

jest.mock("../../src/utils")
jest.mock("next/router")

const push = jest.fn()

describe("/setup/about page", () => {

    beforeAll(() => {
        useRouter.mockImplementation(() => {
            return {
                query: {},
                push
            }
        })
    })

    beforeEach(async () => {
        await api.signinUser("testing@taylor.com", "Password")
    })

    it("should render page properly", async () => {
        render(
            <Provider store={store}>
                <About />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Über.*/i))

        expect(screen.getAllByText(/Weiter/i)).toBeDefined()
    })

    it("should redirect on user consent", async () => {
        render(
            <Provider store={store}>
                <About />
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Über.*/i))

        fireEvent.click(screen.getByText(/Weiter/i))

        expect(push).toHaveBeenCalledTimes(1)
    })

})