import React from "react"
import PropTypes from "prop-types"

const TextInput = ({label, value, defaultValue, onChange, placeholder}) => {
    return (
        <>
            <label className="text-sm text-gray-600 high-contrast:text-gray-800" htmlFor={label}>{label}</label>
            <input
                className="color transition ease-in-out duration-200 w-full border border-gray-300 high-contrast:border-gray-400 bg-white rounded-lg px-3 py-2 md:py-3 block mt-1 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:border-transparent focus:outline-none"
                type="text"
                id={label}
                defaultValue={defaultValue ? defaultValue : null}
                value={value ? value : null}
                placeholder={placeholder || ""}
                onChange={e => onChange(e.target.value)}
                />
        </>
    )
}

TextInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
}

export default TextInput