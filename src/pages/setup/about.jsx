import React from "react"
import { useRouter } from "next/router"

import Secure from "../../components/secure"

const About = () => {
    let router = useRouter()


    const next = () => {
        router.push("/app")
    }

    return (
        <Secure>
            <div className="bg-gray-100 absolute top-0 bottom-0 right-0 left-0">
                <div className="px-4 w-full md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto flex flex-col h-full pb-20">
                    <h1 className="text-2xl text-center md:text-3xl font-bold mx-auto my-10">Über uns</h1>
                    <div className="text-justify space-y-3">
                        {/* <div className="grid grid-cols-3">
                            <div className="flex flex-col">
                                <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                <span className="text-sm">Hakim Rachidi</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                <span className="text-sm">Hakim Rachidi</span>
                            </div>
                            <div className="flex flex-col">
                                <div className="bg-gray-500 h-16 w-16 rounded-full"></div>
                                <span className="text-sm">Hakim Rachidi</span>
                            </div>
                        </div> */}
                        <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                    <div className="mt-auto">
                        <button onClick={next} className="w-full md:w-64 mx-auto bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none flex flex-row justify-center">
                            Weiter
                        </button>
                    </div>
                </div>
        </div>
        </Secure>
    )
}

export default About