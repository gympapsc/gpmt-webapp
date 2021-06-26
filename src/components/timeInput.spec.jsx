import React from "react"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import TimeInput from "./timeInput"

describe("time input", () => {
    it("should render time input properly", async () => {
        let mockDate = new Date(2021, 0, 1, 10, 0)
        let onChangeHandler = jest.fn()
        render(<TimeInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        expect(screen.getByPlaceholderText(/Stunde/i).value).toBe("10")
        expect(screen.getByPlaceholderText(/Minute/i).value).toBe("0")
    })

    it("should call onChange handler on blur", async () => {
        let mockDate = new Date(2021, 0, 1, 10, 0)
        let onChangeHandler = jest.fn()
        render(<TimeInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        let minuteInput = screen.getByPlaceholderText(/Minute/i)
        let hourInput = screen.getByPlaceholderText(/Stunde/i)

        fireEvent.change(minuteInput, {
            target: {
                value: 35
            }
        })
        fireEvent.blur(minuteInput)
        expect(onChangeHandler).toHaveBeenCalledTimes(1)

        fireEvent.change(hourInput, {
            target: {
                value: 12
            }
        })
        fireEvent.blur(hourInput)
        expect(onChangeHandler).toHaveBeenCalledTimes(2)
    })

    it("should change time on blur", async () => {
        let mockDate = new Date(2021, 0, 1)
        let onChangeHandler = jest.fn()
        render(<TimeInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        let minuteInput = screen.getByPlaceholderText(/Minute/i)
        let hourInput = screen.getByPlaceholderText(/Stunde/i)


        fireEvent.change(minuteInput, {
            target: {
                value: 50
            }
        })
        fireEvent.blur(minuteInput)
        mockDate.setMinutes(50)
        expect(onChangeHandler).toHaveBeenCalledWith(mockDate)

        fireEvent.change(hourInput, {
            target: {
                value: 13
            }
        })
        fireEvent.blur(minuteInput)
        mockDate.setHours(13)
        expect(onChangeHandler).toHaveBeenCalledWith(mockDate)
    })

    it("should change time on prop change", async() => {
        let mockDate = new Date(2021, 0, 1, 10, 30)
        let onChangeHandler = jest.fn()
        let { rerender } = render(<TimeInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        expect(screen.getByPlaceholderText(/Stunde/i).value).toBe("10")
        expect(screen.getByPlaceholderText(/Minute/i).value).toBe("30")
        mockDate.setHours(11)
        mockDate.setMinutes(20)
        rerender(<TimeInput value={mockDate} onChange={onChangeHandler} label={"Label"} />)
        expect(screen.getByPlaceholderText(/Stunde/i).value).toBe("11")
        expect(screen.getByPlaceholderText(/Minute/i).value).toBe("20")
    })
})