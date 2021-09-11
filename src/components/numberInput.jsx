import React from "react"
import PropTypes from "prop-types"

const NumberInput = ({label, value, onChange, placeholder}) => {
    return (
        <>
            <label className="text-sm text-gray-600 high-contrast:text-gray-800" htmlFor={label}>{label}</label>
            <input
                className="color transition ease-in-out duration-200 w-full border border-gray-200 high-contrast:border-gray-400 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:border-transparent focus:outline-none placeholder:text-gray-600"
                type="number"
                id={label}
                value={value}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                />
        </>
    )
}

NumberInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

export default NumberInput