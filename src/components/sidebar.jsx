import React from "react"


const Sidebar = () => {
    return (
        <aside 
            id="sidebar"
            className="z-1 absolute top-0 bottom-0 left-0 w-80 md:w-96 pt-6 px-4 overflow-y-scroll">
                <h1 className="text-2xl md:text-3xl font-semibold">Miktionstagebuch</h1>
                <div className="flex flex-col space-y-6 mt-5">
                    <a
                        href="#"
                        className="w-full bg-green-500 text-white rounded-xl p-3"    
                    >
                        <div className="flex flex-row justify-between">
                            <span>
                                Miktionswahrscheinlichkeit
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <span className="text-3xl block mt-2">
                            42<span className="text-xl">%</span>
                        </span>
                    </a>

                    <a
                        href="#"
                        className="w-full bg-white rounded-xl p-3"    
                    >
                        <div className="flex flex-row justify-between">
                            <span>
                                Heute getrunken
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                           </svg>                        
                        </div>
                        <span className="text-3xl block mt-2">
                            1,2l
                        </span>
                    </a>
                </div>
        </aside>
    )
}

export default Sidebar