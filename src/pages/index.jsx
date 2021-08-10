import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Spinner } from "../components/progressIndicator"


const Index = () => {
    return (
        <div className="font-bold flex flex-col justify-around absolute top-0 bottom-0 right-0 left-0 bg-gray-100">
            <div className="mx-auto max-w-screen-sm">
                <div className="w-16 h-16 mx-auto mb-8">
                    <Image src="/img/gympap.png" width="500" height="500" />
                </div>
                <h1 className="text-4xl self-center text-center">Gymnasium Papenburg <br/> Miktionstagebuch</h1>
                <p className="font-normal mt-4 px-8 text-center">
                    Ein intelligentes Miktionstagebuch, dass Multiple Sklerose Patienten 
                    im Alltag unterstützt und zukünkftige Toilettengänge vorhersagt.
                </p>
                <div className="w-full flex flex-row justify-around items-center mt-8">
                    <Link href="/signup">
                        <a className="px-4 py-2 hover:bg-indigo-100 transition-colors duration-100 rounded-md text-sm lg:text-base font-medium text-blue-600">
                            Registrieren
                        </a>
                    </Link>

                    <Link href="/signin">
                        <a className="px-4 py-2 bg-indigo-600 text-sm lg:text-base font-medium text-white rounded-md">
                            Anmelden
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Index
