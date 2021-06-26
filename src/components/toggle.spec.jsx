import React from "react"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import Toggle from "./toggle"

describe("toggle input", () => {
    it("should render toggle input properly", async () => {
        let value = true
        let onChangeHandler = jest.fn()
        render(<Toggle value={value} onChange={onChangeHandler} title={"Label"} description={"Description"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        expect(screen.getByRole("switch").getAttribute("aria-checked")).toBe("true")
        expect(screen.getByText(/Description/i)).toBeDefined()
    })

    it("should call onChange on toggle", async () => {
        let value = true
        let onChangeHandler = jest.fn()
        render(<Toggle value={value} onChange={onChangeHandler} title={"Label"} description={"Description"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        fireEvent.click(screen.getByRole("switch"))
        expect(onChangeHandler).toHaveBeenCalledTimes(1)
    })

    it("should call onChange with toggle state", async () => {
        let value = true
        let onChangeHandler = jest.fn()
        render(<Toggle value={value} onChange={onChangeHandler} title={"Label"} description={"Description"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))
        
        fireEvent.click(screen.getByRole("switch"))

        expect(onChangeHandler).toHaveBeenCalledWith(false)
    })

    it("should change state on prop change", async () => {
        let value = true
        let onChangeHandler = jest.fn()
        let { rerender } = render(<Toggle value={value} onChange={onChangeHandler} title={"Label"} description={"Description"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))
        
        expect(screen.getByRole("switch").getAttribute("aria-checked")).toBe("true")
        value = false
        rerender(<Toggle value={value} onChange={onChangeHandler} title={"Label"} description={"Description"}/>)
        expect(screen.getByRole("switch").getAttribute("aria-checked")).toBe("false")
        expect(onChangeHandler).not.toHaveBeenCalled()
    })

})