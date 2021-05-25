import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import {
    utterMessage
} from '../actions'


const Shell = ({children, title, className, onScroll}) => {
    let container = useRef(null)

    useEffect(() => {
        if(container.current)
            container.current.scrollTop = container.current.scrollHeight - container.current.clientHeight
    }, container)
    console.log("scrollTop", container.current?.scrollTop)

    return (
        <main ref={container} className={`absolute top-0 left-0 md:left-96 right-0 bottom-0 flex flex-col overflow-y-scroll ${className}`}>
            <header className="sticky px-3 bg-gray-50 py-1 md:py-2 top-0 right-0 flex flex-row w-full justify-between border-b bg-opacity-80 backdrop-filter backdrop-blur-xl">
                <button className="text-blue-500 md:invisible self-center flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Übersicht</span>
                </button>
                <h3 className="text-lg md:text-xl font-semibold self-center">
                    {title}
                </h3>
                <button className="text-blue-500 md:invisible self-center flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Übersicht</span>
                </button>
            </header>
            {children}
        </main>
    )
}

Shell.propTypes = {
    children: PropTypes.array,
    title: PropTypes.string,
    className: PropTypes.string,
    onScroll: PropTypes.func
}

export default Shell