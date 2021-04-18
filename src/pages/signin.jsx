import React, {useState} from "react"
import { useDispatch } from "react-redux"

import {
    signinUser
} from "../actions"


const Signin = () => {
    
    let dispatch = useDispatch()
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const submit = e => {
        e.preventDefault()
        dispatch(signinUser(email, password))
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Gymnasium Papenburg<br/>Miktionstagebuch
                    </h2>
                </div>

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input 
                                id="email-address" 
                                name="email" 
                                type="email"  
                                required
                                onChange={e => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                required 
                                onChange={e => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between font-medium">
                        <div className="text-sm">
                            <a href="/signup" className="text-indigo-600 hover:text-indigo-500">Sign up</a>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin
