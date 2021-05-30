import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { assignUser } from '../actions'
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
