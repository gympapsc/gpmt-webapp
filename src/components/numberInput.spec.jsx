import React from "react"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import NumberInput from "./numberInput"

describe("number input", () => {
    it("should render number input properly", async () => {
        let value = 10
        let onChangeHandler = jest.fn()
        render(<NumberInput value={value} onChange={onChangeHandler} label={"Label"} placeholder={"Zahl"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        expect(screen.getByPlaceholderText(/Zahl/i).value).toBe("10")
    })

    it("should call onChange on change", async () => {
        let value = 10
        let onChangeHandler = jest.fn()
        render(<NumberInput value={value} onChange={onChangeHandler} label={"Label"} placeholder={"Zahl"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        fireEvent.change(screen.getByPlaceholderText(/Zahl/i), {
            target: {
                value: 11
            }
        })

        expect(onChangeHandler).toHaveBeenCalledTimes(1)
        expect(onChangeHandler).toHaveBeenCalledWith("11")
    })
})