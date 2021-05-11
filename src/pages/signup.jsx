import React, { useState } from "react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import {useForm} from "react-hook-form"


import { signupUser } from "../actions"

const Signup = () => {
    let dispatch = useDispatch()
    let {
        register, 
        formState: { 
            errors, 
            isValid, 
            isDirty
        },
        getValues,
        handleSubmit
    } = useForm()


    const submit = () => {
        let {
            firstname,
            surname,
            email,
            password,
            weight,
            height,
            birthDate
        } = getValues()

        dispatch(
            signupUser({
                firstname,
                surname,
                email,
                password,
                weight,
                height,
                birthDate,
                password
            })
        )
    }

    return (
        <div className="absolute top-0 bottom-0 w-full bg-gray-100">
            <div className="px-3 w-full md:w-5/6 lg:w-3/4 xl:w-2/3 mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mx-auto mt-10">Gymnasium Papenburg<br/> Miktionstagebuch</h1>
                <Link href="/signin">
                    <a className="text-sm md:text-lg text-blue-600">
                        Anmelden
                    </a>
                </Link>
                <form className="w-full mt-5 clear-right" onSubmit={handleSubmit(submit)}>
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-full md:col-span-3">
                            <label
                                className="text-gray-600 text-sm md:text-md" 
                                htmlFor="vorname">
                                Vorname
                            </label>
                            <input
                                id="vorname"
                                type="text"
                                className="w-full bg-white p-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("firstname", 
                                    { 
                                        required: true 
                                    }
                                )}/>
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label
                                className="text-gray-600 text-sm md:text-md" 
                                htmlFor="nachname">
                                Nachname
                            </label>
                            <input
                                id="nachname"
                                type="text"
                                className="w-full bg-white p-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("surname", 
                                    { 
                                        required: true 
                                    }
                                )}/>
                        </div>
                        <div className="col-span-full">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                className="w-full bg-white p-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("email", 
                                    { 
                                        required: true 
                                    }
                                )}/>
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="geschlecht">
                                Geschlecht
                            </label>
                            <input
                                id="geschlecht"
                                type="text"
                                className="w-full bg-white p-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                />
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="geburtstag">
                                Geburtstag
                            </label>
                            <input
                                id="geburtstag"
                                type="date"
                                className="w-full bg-white p-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("birthDate", 
                                    { 
                                        required: true
                                    }
                                )}/>
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="größe">
                                Größe
                            </label>
                            <input
                                id="größe"
                                type="number"
                                className="w-full bg-white p-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("height", 
                                    { 
                                        required: true 
                                    }
                                )}/>
                        </div>
                        <div className="col-span-full">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="weight">
                                Gewicht in Kg
                            </label>
                            <input
                                id="weight"
                                type="number"
                                className="w-full bg-white p-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("weight", 
                                    { 
                                        required: true 
                                    }
                                )}/>
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="passwort">
                                Passwort
                            </label>
                            <input
                                id="passwort"
                                type="password"
                                className="w-full bg-white p-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("password", 
                                    { 
                                        required: "Password ist erfoderlich"
                                    }
                                )}/>
                        </div>
                        <div className="col-span-full md:col-span-3">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="passwort-wiederholen">
                                Passwort wiederholen
                            </label>
                            <input
                                id="passwort-wiederholen"
                                type="password"
                                className="w-full bg-white p-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("password_repeat", 
                                    { 
                                        required: "Password ist erfoderlich",
                                        validate: {
                                            matchesPassword: value => {
                                                const { password } = getValues()
                                                return password == value || "Passwörter müssen gleich sein"
                                            }
                                        } 
                                    }
                                )}/>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <button className="w-full self-end md:w-64 mt-12 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
                            Registrieren
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Signup
