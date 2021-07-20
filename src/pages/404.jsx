import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function FileNotFound() {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-row justify-center items-center bg-gray-50">
            <div className="max-w-screen-sm">
                <div className="w-14 h-14 mx-auto mb-8">
                    <Image src="/img/gympap.png" width="400" height="400" />
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-2">Seite nicht gefunden.</h1>
                <p className="text-gray-600 text-center mb-6">Diese Seite ist nicht verfügbar. Versuche dich anzumelden.</p>
                <div className="w-full flex">
                    <Link href="/signin">
                        <a className="px-4 py-2 text-indigo-600 text-sm lg:text-base font-medium hover:bg-indigo-100 rounded-md mx-auto">
                            Anmelden
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
