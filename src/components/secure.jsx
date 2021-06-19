import React, { useState, useEffect } from 'react'
import { useUser } from '../hooks'


const Secure = ({children}) => {    
    let user = useUser()
    return (
        <>
            {user ? children: 'Loading ...'}
        </>
    )
}

export default Secure
