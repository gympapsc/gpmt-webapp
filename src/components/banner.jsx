import React, { useState } from "react"
import { Transition } from "@headlessui/react"


export const InfoBanner = () => {
    const [shown, setShown] = useState(true)

    return (
        <Transition
            show={shown}
            className="absolute transform top-0 left-0 right-0 z-50"
            enterFrom="-translate-10"
            enterTo="translate-0"
            enter="transition-transform ease-in-out duration-100"
            leave="transition-transform ease-in-out duration-100"
            leaveFrom="translate-0"
            leaveTo="-translate-10"
            >
            <div className="bg-indigo-600">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <span className="flex p-2 rounded-lg bg-indigo-800">
                                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </span>
                            <p className="ml-3 font-medium text-white truncate">
                                <span className="md:hidden">
                                    We announced a new product!
                                </span>
                                <span className="hidden md:inline">
                                    Big news! We're excited to announce a brand new product.
                                </span>
                            </p>
                        </div>
                        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                                Learn more
                            </a>
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                            <button 
                                type="button" 
                                className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                                onClick={() => setShown(!shown)}
                                >
                                <span className="sr-only">Dismiss</span>
                                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    )
}

export const WarningBanner = ({message, messageShort, buttonTitle, dismissable=true}) => {
    const [shown, setShown] = useState(true)

    return (
        <Transition
            show={shown}
            className="absolute transform top-0 left-0 right-0 z-50"
            enterFrom="-translate-y-10"
            enterTo="translate-y-0"
            enter="transition-transform ease-in-out duration-100"
            leave="transition-transform ease-in-out duration-100"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-10"
            >
            <div className="bg-yellow-500">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <span className="flex p-2 rounded-lg bg-yellow-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <p className="ml-3 font-medium text-white truncate">
                                <span className="md:hidden">
                                    {messageShort}
                                </span>
                                <span className="hidden md:inline">
                                    {message}
                                </span>
                            </p>
                        </div>
                        {   
                            buttonTitle &&
                            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-600 bg-white hover:bg-indigo-50">
                                    {buttonTitle}
                                </a>
                            </div>
                        }
                        {
                            dismissable &&
                            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                                <button 
                                    role="dismiss"
                                    type="button" 
                                    className="-mr-1 flex p-2 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                                    onClick={() => setShown(!shown)}
                                    >
                                    <span className="sr-only">Dismiss</span>
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Transition>
    )
}


export const ErrorBanner = ({message, messageShort, buttonTitle, dismissable=true}) => {
    const [shown, setShown] = useState(true)

    return (
        <Transition
            show={shown}
            className="absolute transform top-0 left-0 right-0 z-50"
            enterFrom="-translate-y-10"
            enterTo="translate-y-0"
            enter="transition-transform ease-in-out duration-100"
            leave="transition-transform ease-in-out duration-100"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-10"
            >
            <div className="bg-red-600">
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <span className="flex p-2 rounded-lg bg-red-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </span>
                            <p className="ml-3 font-medium text-white truncate">
                                <span className="md:hidden">
                                    {messageShort}
                                </span>
                                <span className="hidden md:inline">
                                    {message}
                                </span>
                            </p>
                        </div>
                        {   
                            buttonTitle &&
                            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-indigo-50">
                                    {buttonTitle}
                                </a>
                            </div>
                        }
                        {
                            dismissable &&
                            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                                <button 
                                    role="dismiss"
                                    type="button" 
                                    className="-mr-1 flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                                    onClick={() => setShown(!shown)}
                                    >
                                    <span className="sr-only">Dismiss</span>
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Transition>
    )
}

