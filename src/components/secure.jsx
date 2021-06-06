import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import io from "../api/io"

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
