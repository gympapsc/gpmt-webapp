import React from "react"
import { Switch, Transition } from "@headlessui/react"


const Toggle = ({value, title, description, onChange}) => {
    return (
        <Switch.Group>
            <div className="flex flex-row justify-between">
                <div>
                    <Switch.Label className="text-md text-gray-800 font-semibold block">{title}</Switch.Label>
                    <span className="text-xs md:text-sm lg:text-md text-gray-600">{description}</span>
                </div>
                <Switch
                    checked={value}
                    onChange={onChange}
                    className={`color transition ease-in-out duration-200 ${
                        value ? `bg-blue-600`: `bg-gray-200`
                    } relative inline-flex items-center h-8 rounded-full w-14 self-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600`}
                >
                    <span className="sr-only">{title}</span>
                    <span
                        className={`transform transition ease-in-out duration-200 ${
                            value ? "translate-x-7" : "translate-x-1"
                        } inline-block w-6 h-6 transform bg-white rounded-full shadow-sm`}>
                    </span>
                </Switch>
            </div>
        </Switch.Group>
    )
}

export default Toggle