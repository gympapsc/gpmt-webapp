import React from "react"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import TextInput from "./textInput"

describe("date time input", () => {
    it("should render text input properly", async () => {
        let value = "Text"
        let onChangeHandler = jest.fn()
        render(<TextInput value={value} onChange={onChangeHandler} label={"Label"} placeholder={"Text"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        expect(screen.getByPlaceholderText(/Text/i).value).toEqual(value)
    })

    it("should call onChange handler on change", async () => {
        let value = "Text"
        let onChangeHandler = jest.fn()
        render(<TextInput value={value} onChange={onChangeHandler} label={"Label"} placeholder={"Text"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        let textInput = screen.getByPlaceholderText(/Text/i)

        fireEvent.change(textInput, {
            target: {
                value: "Changed text"
            }
        })
        expect(onChangeHandler).toHaveBeenCalledTimes(1)
    })

    it("should call onChange with text", async () => {
        let value = "Text"
        let onChangeHandler = jest.fn()
        render(<TextInput value={value} onChange={onChangeHandler} label={"Label"} placeholder={"Text"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        let textInput = screen.getByPlaceholderText(/Text/i)

        fireEvent.change(textInput, {
            target: {
                value: "Changed text"
            }
        })
        expect(onChangeHandler).toHaveBeenCalledWith("Changed text")
    })
})