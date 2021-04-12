import React from 'react'
import { useSelector } from 'react-redux'

import Secure from '../../components/secure'

const App = () => {
    let user = useSelector(state => state.user)
    let messages = useSelector(state => state.messages)
    console.log(user)
    return (
        <Secure>
            <h1>Hello {user?.firstname}</h1>
        </Secure>
    )
}


export default App
