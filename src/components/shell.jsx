import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import {
    utterMessage
} from '../actions'


const Shell = ({children, title, className, onScroll, toggleMenu}) => {
    let container = useRef(null)

    // useEffect(() => {
    //     if(container.current)
    //         container.current.scrollTop = container.current.scrollHeight - container.current.clientHeight
    // }, [container])
    // console.log("scrollTop", container.current?.scrollTop)

    return (
        <main ref={container} onClick={toggleMenu} className={`absolute z-0 top-0 left-0 md:left-96 right-0 bottom-0 flex flex-col overflow-y-scroll ${className}`}>
            <header className="sticky px-3 bg-gray-50 py-1 md:py-2 top-0 right-0 flex flex-row w-full justify-between border-b bg-opacity-80 backdrop-filter backdrop-blur-xl">
                <button onClick={toggleMenu} className="text-blue-500 md:invisible self-center flex flex-row">
                    <span>Übersicht</span>
                </button>
                <h3 className="text-lg md:text-xl font-semibold self-center">
                    {title}
                </h3>
                <button className="text-blue-500 md:invisible self-center flex flex-row">
                    <span>Übersicht</span>
                </button>
            </header>
            {children}
        </main>
    )
}

Shell.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    className: PropTypes.string,
    onScroll: PropTypes.func,
    toggleMenu: PropTypes.func,
}

export default Shell