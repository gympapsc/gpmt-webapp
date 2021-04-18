import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    updateEmail,
    updateWeight,
    updateHeight,
    updateBirthDate,
    updatePassword
} from "../../actions"

import Secure from "../../components/secure"

const Settings = () => {
    let dispatch = useDispatch()
    let email = useSelector(state => state.user.email) || ""
    let weight = useSelector(state => state.user.weight) || ""
    let birthDate = useSelector(state => state.user.birthDate) || "" 
    let height = useSelector(state => state.user.height) || ""
    let [password, setPassword] = useState("")

    console.log(new Date(birthDate))

    const changePassword = e => {
        setPassword(e.target.value)
        dispatch(updatePassword(e.target.value))
    }

    return (
        <Secure>
            <h1>Settings</h1>
            <form>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={e => dispatch(updateEmail(e.target.value))} /> <br/>
            <input
                type="number"
                placeholder="weight"
                value={weight}
                onChange={e => dispatch(updateWeight(e.target.value))} /> <br/>
            
            <input
                type="number"
                placeholder="height"
                value={height}
                onChange={e => dispatch(updateHeight(e.target.value))} min="20" max="300"/> <br />
            <input
                type="date"
                placeholder="birth date"
                value={birthDate}
                onChange={e => dispatch(updateBirthDate(e.target.value))} /> <br/>
            <input
                type="text"
                placeholder="password"
                value={password}
                onChange={changePassword} /> <br/>
            </form>
        </Secure>
    )
}

export default Settings