import React from "react"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import DateInput from "./dateInput"

describe("date input", () => {
    it("should render date input", async () => {
        let mockDate = new Date(2021, 0, 1)
        let onChangeHandler = jest.fn()
        render(<DateInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        expect(screen.getAllByDisplayValue("2021")).toBeDefined()
        expect(screen.getAllByDisplayValue("1")).toBeDefined()
        expect(screen.getAllByDisplayValue("1")).toBeDefined()
    })

    it("should call onChange handler on blur", async () => {
        let mockDate = new Date(2021, 0, 1)
        let onChangeHandler = jest.fn()
        render(<DateInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        let dayInput = screen.getByPlaceholderText(/Tag/i)
        let monthInput = screen.getByPlaceholderText(/Monat/i)
        let yearInput = screen.getByPlaceholderText(/Jahr/i)

        fireEvent.change(dayInput, {
            target: {
                value: 10
            }
        })
        fireEvent.blur(dayInput)
        expect(onChangeHandler).toHaveBeenCalledTimes(1)

        fireEvent.change(monthInput, {
            target: {
                value: 10
            }
        })
        fireEvent.blur(monthInput)
        expect(onChangeHandler).toHaveBeenCalledTimes(2)


        fireEvent.change(yearInput, {
            target: {
                value: 2020
            }
        })
        fireEvent.blur(yearInput)
        expect(onChangeHandler).toHaveBeenCalledTimes(3)
    })

    it("should change date on blur", async () => {
        let mockDate = new Date(2021, 0, 1)
        let onChangeHandler = jest.fn()
        render(<DateInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        let dayInput = screen.getByPlaceholderText(/Tag/i)
        let monthInput = screen.getByPlaceholderText(/Monat/i)
        let yearInput = screen.getByPlaceholderText(/Jahr/i)

        fireEvent.change(dayInput, {
            target: {
                value: 10
            }
        })
        mockDate.setDate(10)
        expect(onChangeHandler).toHaveBeenCalledWith(mockDate)

        fireEvent.change(monthInput, {
            target: {
                value: 10
            }
        })
        mockDate.setMonth(9)
        expect(onChangeHandler).toHaveBeenCalledWith(mockDate)


        fireEvent.change(yearInput, {
            target: {
                value: 2020
            }
        })
        mockDate.setFullYear(2020)
        expect(onChangeHandler).toHaveBeenCalledWith(mockDate)
    })

    it("should change time on prop change", async() => {
        let mockDate = new Date(2021, 0, 1, 10, 30)
        let onChangeHandler = jest.fn()
        let { rerender } = render(<DateInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        expect(screen.getByPlaceholderText(/Jahr/i).value).toBe("2021")
        expect(screen.getByPlaceholderText(/Monat/i).value).toBe("1")
        expect(screen.getByPlaceholderText(/Tag/i).value).toBe("1")
        
        mockDate.setFullYear(2020)
        mockDate.setMonth(2)
        mockDate.setDate(10)
        
        rerender(<DateInput value={mockDate} onChange={onChangeHandler} label={"Label"} />)
        
        expect(screen.getByPlaceholderText(/Jahr/i).value).toBe("2020")
        expect(screen.getByPlaceholderText(/Monat/i).value).toBe("3")
        expect(screen.getByPlaceholderText(/Tag/i).value).toBe("10")
    })

    it("should change time on invalid user input", async () => {
        let mockDate = new Date(2021, 0, 1)
        let onChangeHandler = jest.fn()
        render(<DateInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        let monthInput = screen.getByPlaceholderText(/Monat/i)

        fireEvent.change( monthInput, {
            target: {
                value: 14
            }
        })
        expect(onChangeHandler).toHaveBeenCalled()
    })
})