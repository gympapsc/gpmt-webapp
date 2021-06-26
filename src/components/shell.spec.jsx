import React from "react"
import { Provider } from "react-redux"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import Shell from "./shell"
import api from "../api/http"
import store from "../store"

describe("application shell component", () => {

    it("should render Shell properly", async () => {
        await api.signinUser("testing@taylor.com", "Password")

        render(
            <Provider store={store}>
                <Shell title={"Titel"} className={"class"}>
                    <div data-testid={"child"}></div>
                </Shell>
            </Provider>
        )

        await waitFor(() => screen.getAllByText(/Titel/i))

        expect(screen.getByTestId(/child/)).toBeDefined()
    })

})