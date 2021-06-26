import React from "react"
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'

import DateTimeInput from "./datetimeInput"

describe("date time input", () => {
    it("should render date and time input properly", async () => {
        let mockDate = new Date(2021, 0, 1, 10, 0)
        let onChangeHandler = jest.fn()
        render(<DateTimeInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        expect(screen.getByPlaceholderText(/Jahr/i).value).toBe("2021")
        expect(screen.getByPlaceholderText(/Monat/i).value).toBe("1")
        expect(screen.getByPlaceholderText(/Tag/i).value).toBe("1")
        expect(screen.getByPlaceholderText(/Stunde/i).value).toBe("10")
        expect(screen.getByPlaceholderText(/Minute/i).value).toBe("0")
    })

    it("should call onChange handler on change", async () => {
        let mockDate = new Date(2021, 0, 1)
        let onChangeHandler = jest.fn()
        render(<DateTimeInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        let minuteInput = screen.getByPlaceholderText(/Minute/i)
        let hourInput = screen.getByPlaceholderText(/Stunde/i)
        let dayInput = screen.getByPlaceholderText(/Tag/i)
        let monthInput = screen.getByPlaceholderText(/Monat/i)
        let yearInput = screen.getByPlaceholderText(/Jahr/i)

        fireEvent.change(minuteInput, {
            target: {
                value: 35
            }
        })
        expect(onChangeHandler).toHaveBeenCalledTimes(1)

        fireEvent.change(hourInput, {
            target: {
                value: 12
            }
        })
        expect(onChangeHandler).toHaveBeenCalledTimes(2)

        fireEvent.change(dayInput, {
            target: {
                value: 10
            }
        })
        expect(onChangeHandler).toHaveBeenCalledTimes(3)

        fireEvent.change(monthInput, {
            target: {
                value: 10
            }
        })
        expect(onChangeHandler).toHaveBeenCalledTimes(4)


        fireEvent.change(yearInput, {
            target: {
                value: 2020
            }
        })
        expect(onChangeHandler).toHaveBeenCalledTimes(5)
    })

    it("should change date and time on change", async () => {
        let mockDate = new Date(2021, 0, 1)
        let onChangeHandler = jest.fn()
        render(<DateTimeInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        let minuteInput = screen.getByPlaceholderText(/Minute/i)
        let hourInput = screen.getByPlaceholderText(/Stunde/i)
        let dayInput = screen.getByPlaceholderText(/Tag/i)
        let monthInput = screen.getByPlaceholderText(/Monat/i)
        let yearInput = screen.getByPlaceholderText(/Jahr/i)


        fireEvent.change(minuteInput, {
            target: {
                value: 50
            }
        })
        mockDate.setMinutes(50)
        expect(onChangeHandler).toHaveBeenCalledWith(mockDate)

        fireEvent.change(hourInput, {
            target: {
                value: 13
            }
        })
        mockDate.setHours(13)
        expect(onChangeHandler).toHaveBeenCalledWith(mockDate)

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
        let { rerender } = render(<DateTimeInput value={mockDate} onChange={onChangeHandler} label={"Label"}/>)

        await waitFor(() => screen.getByLabelText(/Label/i))

        expect(screen.getByPlaceholderText(/Jahr/i).value).toBe("2021")
        expect(screen.getByPlaceholderText(/Monat/i).value).toBe("1")
        expect(screen.getByPlaceholderText(/Tag/i).value).toBe("1")
        expect(screen.getByPlaceholderText(/Stunde/i).value).toBe("10")
        expect(screen.getByPlaceholderText(/Minute/i).value).toBe("30")
        
        mockDate.setFullYear(2020)
        mockDate.setMonth(2)
        mockDate.setDate(10)
        mockDate.setHours(11)
        mockDate.setMinutes(20)
        
        rerender(<DateTimeInput value={mockDate} onChange={onChangeHandler} label={"Label"} />)
        
        expect(screen.getByPlaceholderText(/Jahr/i).value).toBe("2020")
        expect(screen.getByPlaceholderText(/Monat/i).value).toBe("3")
        expect(screen.getByPlaceholderText(/Tag/i).value).toBe("10")
        expect(screen.getByPlaceholderText(/Stunde/i).value).toBe("11")
        expect(screen.getByPlaceholderText(/Minute/i).value).toBe("20")
    })
})