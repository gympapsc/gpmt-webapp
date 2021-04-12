import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
    signupUser
} from '../actions'

const Signup = () => {
    let dispatch = useDispatch()    
    let [firstname, setFirstname] = useState('')
    let [surname, setSurname] = useState('')
    let [email, setEmail] = useState('')
    let [weight, setWeight] = useState(0)
    let [height, setHeight] = useState(0)
    let [birthDate, setBirthDate] = useState('')
    let [password, setPassword] = useState('')
    
    const submit = e => {
        e.preventDefault()
        dispatch(signupUser({
            firstname,
            surname,
            email,
            password,
            weight,
            height,
            birthDate: new Date(birthDate),
            password
        }))
    }

    return (
        <form onSubmit={submit}>
            <input
                type="text"
                value={firstname}
                onChange={e => setFirstname(e.target.value)} /> <br/>
            <input
                type="text"
                value={surname}
                onChange={e => setSurname(e.target.value)} /> <br/>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)} /> <br/>
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} /> <br/>
            
            <input
                type="number"
                value={height}
                onChange={e => setHeight(e.target.value)} /><br />
            <input
                type="date"
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)} /> <br/>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)} /> <br/>
            <button type="submit">
                Sign up
            </button>
        </form>
    )
}

export default Signup
