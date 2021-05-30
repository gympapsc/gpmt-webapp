import React, {useState} from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import {useForm} from "react-hook-form"

import {
    signinUser
} from "../actions"


const Signin = () => {
    const { register, handleSubmit, watch, formState: { errors, isValid, isDirty}} = useForm()
    let dispatch = useDispatch()
    let signinError = useSelector(state => state.errors.signin) ? "Anmeldedaten sind falsch." : false

    const submit = data => {
        dispatch(signinUser(data.email, data.password))
    }

    return (
        <div className="absolute top-0 bottom-0 w-full bg-gray-100 flex flex-row">
            <div className="px-3 self-center w-full md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto bg-gray-100">
                <h1 className="text-2xl md:text-3xl font-bold text-center mx-auto mb-6">Gymnasium Papenburg<br/> Miktionstagebuch</h1>
                <form className="space-y-5 max-w-md w-full mx-auto" onSubmit={handleSubmit(submit)}>
                    <div className="w-full space-y-1">
                        <span className="text-sm text-red-600">{errors.email?.message || signinError}&nbsp;</span>
                        <input
                            className="color transition ease-in-out duration-200 border-gray-300 w-full block tracking-wide bg-white text-black rounded-t-lg p-2 focus:border-transparent focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                            type="email"
                            placeholder="Email"
                            { ...register("email", { 
                                    required: "Email ist erforderlich" 
                                }
                            )}
                            />
                        <input
                            className="color transition ease-in-out duration-200 border-gray-300 w-full block tracking-wide bg-white text-black rounded-b-lg p-2 focus:border-transparent focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                            type="password"
                            placeholder="Passwort"
                            {...register("password", { 
                                required: "Passwort is erforderlich"
                            })}
                            />
                        <span className="text-sm text-red-600">{errors.password?.message}&nbsp;</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <Link href="/signup">
                            <a className="text-sm lg:text-base text-blue-600">
                                Registrieren
                            </a>
                        </Link>
                        <a className="text-sm lg:text-base text-blue-600">
                            Passwort vergessen
                        </a>
                    </div>
                    <button className="color transition ease-in-out duration-200 bg-blue-600  hover:bg-blue-500 text-white p-2 rounded-lg w-full focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none">
                        Anmelden
                    </button> 
                </form>
            </div>
        </div>
    )
}

export default Signin
