import React from "react"

import Secure from "../../components/secure"

const AdminDashboard = () => {
    return (
        <Secure>
            <div className="flex flex-col absolute top-0 bottom-0 w-full bg-gray-200">
                <header className="flex-grow-0 w-full h-12 bg-gray-100 border-b border-gray-300 flex flex-row px-4">
                    <h1 className="text-2xl font-bold mr-auto self-center">
                        GPMT
                    </h1>
                    <a href="/admin-account" className="flex justify-center items-center transform scale-125 my-2 text-gray-700 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </a>
                </header>
                <main className="flex-grow flex flex-row w-full">
                    <aside className="py-4 w-14 flex-grow-0 flex flex-col bg-gray-100 border-r border-gray-300 text-gray-700">
                        <a href="/admin-dashboard.html" className="flex justify-center items-center transform scale-125 my-4 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </a>
                        <a href="/admin-images.html" className="flex justify-center items-center transform scale-125 my-4 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a href="/admin-settings.html" className="flex justify-center items-center transform scale-125 my-4 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </a>
                        <a href="/admin-settings.html" className="flex justify-center items-center transform scale-125 my-4 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </a>
                    </aside>
                    <div className="overflow-y-scroll max-h-full w-full">
                        <div className="p-4 w-full grid grid-cols-1 grid-rows-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-4">
                            <div className="col-span-1 row-span-2 text-black rounded-xl bg-white flex flex-col p-3">
                                <h3 className="text-md font-medium">Geschlecht</h3>
                                <div id="pie_chart"></div>
                            </div>
                            <div href="/overview.html" id="micturition_widget" className="col-span-1 row-span-1 text-black rounded-xl bg-white flex flex-col p-3">
                                <h3 className="text-md font-medium">Täglich aktive Nutzer</h3>
                                <div className="mt-auto">
                                    <h4 className="text-xl md:text-2xl font-bold">10</h4>
                                </div>
                            </div>
                            <div href="/overview.html" id="micturition_widget" className="col-span-1 row-span-1 text-black rounded-xl bg-white flex flex-col p-3">
                                <h3 className="text-md font-medium">Monatlich aktive Nutzer</h3>
                                <div className="mt-auto">
                                    <h4 className="text-xl md:text-2xl font-bold">20</h4>
                                </div>
                            </div>
                            <div href="/overview.html" id="micturition_widget" className="col-span-2 row-span-1 text-black rounded-xl bg-white flex flex-col p-3">
                                <h3 className="text-md font-medium">Nutzerzahl</h3>
                                <div id="bar_chart" className="h-72"></div>
                            </div>
                            <div href="/overview.html" id="micturition_widget" className="col-span-2 row-span-1 text-black rounded-xl bg-white flex flex-col p-3">
                                <h3 className="text-md font-medium">Nutzerzahl</h3>
                                <div id="chart_2" className="h-72"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Secure>
    )
}

export default AdminDashboard