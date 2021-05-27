import React from "react"
import Secure from "../../components/secure"

const AdminPhotoDashboard = () => {
    return (
        <Secure>
            <div className="flex flex-col absolute top-0 bottom-0 w-full bg-gray-200">
                <header className="flex-grow-0 w-full h-12 bg-gray-100 border-b border-gray-300 flex flex-row px-4">
                    <h1 className="text-2xl font-bold mr-auto self-center">
                        GPMT
                    </h1>
                    <div className="flex justify-center items-center transform scale-125 my-4 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </header>
                <main className="flex-grow flex flex-row w-full">
                    <aside className="py-4 w-14 flex-grow-0 flex flex-col bg-gray-100 border-r border-gray-300 text-gray-700">
                        <a className="flex justify-center items-center transform scale-125 my-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </a>
                        <a className="flex justify-center items-center transform scale-125 my-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a className="flex justify-center items-center transform scale-125 my-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </a>
                    </aside>
                    <div className="p-4 w-full space-y-4">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="col-span-1 h-24 text-black rounded-lg bg-white flex flex-col">
                                <div className="w-full bg-gray-100 px-3 py-3  rounded-t-lg">
                                    <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hochgeladene Bilder</h3>
                                </div>
                                <div className="mt-auto p-3">
                                    <span className="text-2xl md:text-3xl font-bold">650 <span className="text-base font-medium"> Bilder</span></span>
                                </div>
                            </div>
                            <div className="col-span-1 h-24 text-black rounded-lg bg-white flex flex-col">
                                <div className="w-full bg-gray-100 px-3 py-3  rounded-t-lg">
                                    <h3 className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hochgeladene Bilder</h3>
                                </div>
                                <div className="mt-auto p-3">
                                    <span className="text-2xl md:text-3xl font-bold">62</span><span className="text-base">%</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input
                                type="text"
                                className="border border-gray-300 h-12 w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-transparent focus:ring-indigo-500" 
                                placeholder="Bildgruppe" />
                        </div>
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Bild
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Datum
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Klassifikation
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Korrektur
                                                    </th>
                                                    <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Bearbeiten</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10" src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" alt="" />
                                                        </div>
                                                    </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">Samstag, 01.05.21</div>
                                                    <div className="text-sm text-gray-500">13:35</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Banane
                                                    </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        -
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                                                    <a href="#" className="text-blue-600 hover:text-blue-900 text-right">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </Secure>
    )
}

export default AdminPhotoDashboard