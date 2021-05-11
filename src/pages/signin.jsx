import React, {useState} from "react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import {useForm} from "react-hook-form"

import {
    signinUser
} from "../actions"


const Signin = () => {
    const { register, handleSubmit, watch, formState: { errors, isValid, isDirty}} = useForm()
    let dispatch = useDispatch()

    const submit = data => {
        dispatch(signinUser(data.email, data.password))
    }

    console.log(errors)

    return (
        <div className="absolute top-0 bottom-0 w-full bg-gray-100 flex flex-row">
            <div className="px-3 self-center w-full md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto bg-gray-100">
                <h1 className="text-2xl md:text-3xl font-bold text-center mx-auto mb-10">Gymnasium Papenburg<br/> Miktionstagebuch</h1>
                <form className="mt-3 space-y-7 max-w-md w-full mx-auto" onSubmit={handleSubmit(submit)}>
                    <div className="w-full space-y-1">
                        <span className="text-sm text-red-700">{errors.email?.type}</span>
                        <input
                            className="w-full block bg-white text-black rounded-t-lg p-2 focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                            type="email"
                            placeholder="Email"
                            { ...register("email", { required: true, maxLength: 10 })}
                            />
                        <input
                            className="w-full block bg-white text-black rounded-b-lg p-2 focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                            type="password"
                            placeholder="Passwort"
                            {...register("password", { required: true, minLength: 12})}
                            />
                    </div>
                    <div className="flex flex-row justify-between">
                        <Link href="/signup">
                            <a className="text-sm lg:text-lg text-blue-600">
                                Registrieren
                            </a>
                        </Link>
                        <a className="text-sm lg:text-lg text-blue-600">
                            Passwort vergessen
                        </a>
                    </div>
                    <button className="bg-blue-600 disabled:bg-blue-300 hover:bg-blue-500 text-white p-2 rounded-lg w-full focus:ring-2 focus:ring-offset-gray-100 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none">
                        Anmelden
                    </button> 
                </form>
            </div>
        </div>
    )
}

export default Signin
