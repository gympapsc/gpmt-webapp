import React from 'react'


const Survey = () => (
    <div className="bg-gray-100 absolute top-0 bottom-0 right-0 left-0">
        <div className="px-3 w-full md:w-5/6 lg:w-3/4 xl:w-2/3 max-w-2xl mx-auto h-full flex flex-col justify-around">
        <h1 className="mx-auto text-center text-2xl md:text-3xl lg:text-4xl font-bold mt-10">
            Leiden sie unter Inkontinenz?
        </h1>
        <div className="mb-10">
            <input
                type="text"
                value="Ja"
                className="bg-white p-3 text-black w-full rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-blue-600 focus:outline-none"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <button className="col-span-full md:col-span-1 bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none flex flex-row justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Zurück
            </button>
            <button className="col-span-full md:col-span-1 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none flex flex-row justify-center">
                Weiter
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </button>
        </div>
    </div>
    </div>
    
)


export default Survey