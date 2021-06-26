import React from "react"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import { ErrorBanner } from "./banner"


describe("ErrorBanner", () => {
    it("should render ErrorBanner properly", async () => {
        render(
            <ErrorBanner message={"Error"} messageShort={"Err"} />
        )

        await waitFor(() => screen.getByRole("dismiss"))

        expect(screen.getByText("Error")).toBeDefined()
    })
})