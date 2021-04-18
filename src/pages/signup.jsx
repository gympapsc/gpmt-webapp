import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { signupUser } from "../actions";

const Signup = () => {
  let dispatch = useDispatch();
  let [firstname, setFirstname] = useState("");
  let [surname, setSurname] = useState("");
  let [email, setEmail] = useState("");
  let [weight, setWeight] = useState(20);
  let [height, setHeight] = useState(100);
  let [birthDate, setBirthDate] = useState("");
  let [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      signupUser({
        firstname,
        surname,
        email,
        password,
        weight,
        height,
        birthDate: new Date(birthDate),
        password,
      })
    );
  };

  return (
    <div className="mt-10 sm:m-3">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h1 className="text-3xl font-medium leading-6 text-gray-900">
              Registrierung
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              <a href="/signin" className="text-indigo-600 font-medium">Bereits angemeldet?</a>
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={submit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vorname
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      required
                      value={firstname}
                      onChange={e => setFirstname(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nachname
                    </label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      required
                      value={surname}
                      onChange={e => setSurname(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="email_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email_address"
                      id="email_address"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="birthDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Geburtsdatum
                    </label>
                    <input
                        type="date"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-5000 block w-full border-gray-300 rounded-md"
                        onChange={e => setBirthDate(e.target.value)}
                        required
                        value={birthDate}
                        id="birthDate" />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="weight"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gewicht
                    </label>
                    <input
                        type="number"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-5000 block w-full border-gray-300 rounded-md"
                        required
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        id="weight" />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="height"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Köpergröße
                    </label>
                    <input
                        type="number"
                        value={height}
                        required
                        onChange={e => setHeight(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-5000 block w-full border-gray-300 rounded-md"
                        id="height" />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Passwort
                    </label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-5000 block w-full border-gray-300 rounded-md"
                        id="password" />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Wiederholtes Passwort
                    </label>
                    <input
                        type="password"
                          required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-5000 block w-full border-gray-300 rounded-md"
                        id="password" />
                  </div>

                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full sm:w-auto justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Registrieren
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
