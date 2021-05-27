import React from "react"

const AdminSignin = () => {
    return (
        <div className="absolute bg-gray-100 top-0 bottom-0 left-0 right-0 flex flex-col justify-center">
            <div className="px-3 w-full md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-center mx-auto mb-10">GPMT Dashboard</h1>
                <form className="mt-3 space-y-7 max-w-md w-full mx-auto" action="#" method="GET">
                    <div className="w-full space-y-1">
                        <input
                            className="border border-gray-300 w-full block bg-white text-black rounded-lg p-2 focus:ring-2 focus:border-transparent focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                            type="password"
                            placeholder="Password"
                            />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg w-full focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none">
                        Anmelden
                    </button> 
                </form>
            </div>
        </div>
    )
}

export default AdminSignin