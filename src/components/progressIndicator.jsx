import React from "react"

export function Spinner() {
    return (
        <svg
            className="animate-spin w-8 h-8 md:w-10 md:h-10"
            viewBox={[0, 0, 40, 40]}>
                <circle r="14" cx="20" cy="20" stroke="#ddd" fill="none" strokeWidth="4" />
                <circle r="14" cx="20" cy="20" stroke="#888" fill="none" strokeDasharray="100" strokeLinecap="round" strokeDashoffset="60" strokeWidth="4" />
        </svg>
    )
}