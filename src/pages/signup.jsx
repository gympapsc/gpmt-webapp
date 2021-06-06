import React, { useState, Fragment } from "react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { Controller, useForm } from "react-hook-form"
import { Listbox, Transition } from "@headlessui/react"
import { SelectorIcon, CheckIcon} from "@heroicons/react/solid"

import api from "../api/http"

import { signupUser } from "../actions"

const gender = [
    { id: 1, name: "weiblich"},
    { id: 2, name: "männlich"},
    { id: 3, name: "divers"}

]

const SexSelect = () => {
    const [selected, setSelected] = useState(gender[1])

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="w-full relative">
          <Listbox.Button className="relative color transition ease-in-out duration-200 border border-gray-300 w-full py-2 md:py-3 pl-3 pr-10 text-left bg-white rounded-lg  cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-offset-orange-300 focus:ring-offset-2 focus:border-transparent text-sm md:text-base">
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in duration-75"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-150"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {gender.map(s => (
                <Listbox.Option
                  key={s.id}
                  className={({ active }) =>
                    `${active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={s}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {s.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-blue-600' : 'text-blue-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

var daysInMonth = function (m, y) {
    switch (m) {
        case 1 :
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8 : case 3 : case 5 : case 10 :
            return 30;
        default :
            return 31
    }
};

const Signup = () => {
    let dispatch = useDispatch()
    let {
        register, 
        formState: { 
            errors, 
            isValid, 
            isDirty
        },
        control,
        getValues,
        handleSubmit
    } = useForm()


    const submit = data => {
        let {
            password,
            firstname,
            surname,
            email,
            birthDay,
            birthMonth,
            birthYear,
            height,
            weight
        } = data
        
        let birthDate = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay))

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
                                className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("firstname", 
                                    { 
                                        required: "Vorname ist erforderlich" ,
                                        pattern: { value: /[A-z]+/, message: "Dein Vorname kann nur Buchstaben enthalten"}
                                    }
                                )}/>
                            <span className="text-xs text-red-500">{errors.firstname?.message}&nbsp;</span>
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
                                className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("surname", 
                                    { 
                                        required: "Nachname ist erforderlich",
                                        pattern: { value: /[A-z]+/, message: "Dein Nachname kann nur Buchstaben enthalten"}
                                    }
                                )}/>
                            <span className="text-xs text-red-500">{errors.surname?.message}&nbsp;</span>
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
                                className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("email", 
                                    { 
                                        required: "Email ist erforderlich",
                                        pattern: { 
                                            value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                                            message: "Das ist keine Email"
                                        },
                                        validate: {
                                            checkUniqueness: async value => {
                                                api.init()
                                                let {isUnique} = await api.isEmailUnique(value)
                                                    .then(res => res.data)
                                                return isUnique || "Diese Email wurde schon benutzt"
                                            }
                                        }
                                    }
                                )}/>
                            <span className="text-xs text-red-500">{errors.email?.message}&nbsp;</span>
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="geschlecht">
                                Geschlecht
                            </label>
                            {/* <input
                                id="geschlecht"
                                type="text"
                                className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("sex", 
                                    { 
                                        required: "Du musst dein Geschlecht angeben" 
                                    }
                                )}/> */}
                            <SexSelect />
                            {/* <Controller
                                name="sex"
                                control={control}
                                defaultValue={"w"}
                                rules={{
                                    required: true
                                }}
                                render={
                                    ({ field }) => <SexSelect {...field} />
                                }
                                /> */}
                            <span className="text-xs text-red-500">{errors.sex?.message}&nbsp;</span>
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="größe">
                                Größe in cm
                            </label>
                            <input
                                id="größe"
                                type="number"
                                className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("height", 
                                    { 
                                        required: "Du musst deine Größe in cm angeben",
                                        min: { value: 50, message: "Du musst noch wachsen"}
                                    }
                                )}/>
                            <span className="text-xs text-red-500">{errors.height?.message}&nbsp;</span>
                        </div>
                        <div className="col-span-full md:col-span-2">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="weight">
                                Gewicht in Kg
                            </label>
                            <input
                                id="weight"
                                type="number"
                                className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("weight", 
                                    { 
                                        required: "Gewicht ist erforderlich",
                                        min: { value: 10, message: "Bist du etwa so leicht?"}
                                    }
                                )}/>
                            <span className="text-xs text-red-500">{errors.weight?.message}&nbsp;</span>
                        </div>
                        <div className="col-span-full">
                            <label
                                className="text-gray-600 text-sm md:text-md"  
                                htmlFor="tag">
                                Geburtstag
                            </label>
                            <div className="grid grid-cols-3 gap-1 md:gap-4">
                                <div>
                                    <input
                                        id="tag"
                                        type="number"
                                        placeholder="TT"
                                        className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                        {
                                            ...register("birthDay", {
                                                required: "Dein Geburtstag ist erfoderlich",
                                                validate: {
                                                    dayExists: value => {
                                                        let {birthMonth, birthYear} = getValues()
                                                        let birthDay = parseInt(value)
                                                        if(birthMonth && birthYear) {
                                                            return daysInMonth(parseInt(birthMonth) - 1, parseInt(birthYear)) >= birthDay || "Dieser Tag exisitiert nicht"
                                                        }
                                                        return true
                                                    }
                                                }
                                            })
                                        }
                                        />
                                    <span className="text-xs text-red-500">{errors.birthDay?.message}&nbsp;</span>
                                </div>
                                <div>
                                    <input
                                        id="monat"
                                        type="number"
                                        placeholder="MM"
                                        className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                        {
                                            ...register("birthMonth", {
                                                required: "Dein Geburtsmonat ist erfoderlich",
                                                min: { value: 1, message: "Dieser Monat existiert nicht"},
                                                max: { value: 12, message: "Dieser Monat existiert nicht"}
                                            })
                                        }
                                        />
                                    <span className="text-xs text-red-500">{errors.birthMonth?.message}&nbsp;</span>
                                </div>
                                <div>
                                    <input
                                        id="jahr"
                                        type="number"
                                        placeholder="JJJJ"
                                        className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                        {
                                            ...register("birthYear", {
                                                required: "Dein Geburtsjahr ist erfoderlich",
                                                validate: {
                                                    minimumAge: value => {
                                                        let year = new Date().getFullYear()
                                                        return parseInt(value) < year || "Du muss mindestens ein Jahr alt sein"
                                                    },
                                                    maximumAge: value => {
                                                        let year = new Date().getFullYear()
                                                        return (year - parseInt(value)) < 150 || "Du bist zu alt"
                                                    }
                                                }
                                            })
                                        }
                                        />
                                    <span className="text-xs text-red-500">{errors.birthYear?.message}&nbsp;</span>
                                </div>
                            </div>
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
                                className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("password", 
                                    { 
                                        required: "Password ist erfoderlich",
                                        minLength: { value: 7, message: "Password muss länger als 6 Buchstaben lang sein"},
                                        pattern: { value: /[A-Z]/, message: "Password muss Groß- und Kleinbuchstaben enthalten"}
                                    }
                                )}/>
                            <span className="text-xs text-red-500">{errors.password?.message}&nbsp;</span>        
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
                                className="color transition ease-in-out duration-200 w-full border border-gray-300 focus:border-transparent bg-white px-2 md:px-3 py-2 md:py-3 rounded-lg focus:ring-offset-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none"
                                {...register("password_repeat", 
                                    { 
                                        required: "Du muss das Password wiederholen",
                                        validate: {
                                            matchesPassword: value => {
                                                const { password } = getValues()
                                                return password == value || "Die Passwörter müssen gleich sein"
                                            }
                                        } 
                                    }
                                )}/>
                            <span className="text-xs text-red-500">{errors.password_repeat?.message}&nbsp;</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <button className="color transition ease-in-out duration-200 w-full self-end md:w-64 mt-12 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 focus:outline-none">
                            Registrieren
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Signup
