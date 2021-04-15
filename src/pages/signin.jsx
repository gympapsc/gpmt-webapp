import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import {
    signinUser
} from '../actions'


const Signin = () => {
    
    let dispatch = useDispatch()
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const submit = e => {
        e.preventDefault()
        dispatch(signinUser(email, password))
    }

    return (
        <form onSubmit={submit}>
            <input 
                type="text"
                value={email}
                placeholder="email"
                onChange={e => setEmail(e.target.value)} /> <br/>
            <input
                type="text"
                value={password}
                placeholder="password"
                onChange={e => setPassword(e.target.value)} /> <br/>
            <button>
                Sign in
            </button>
        </form>
    )
}

export default Signin
