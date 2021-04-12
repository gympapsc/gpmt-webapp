import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { assignUser } from '../actions'


const Secure = ({role="client", children}) => {    
    let dispatch = useDispatch()
    let user = useSelector(state => state.user) 
    
    if(typeof window !== 'undefined' && !user) {  
        dispatch(assignUser())
    }
    
    return (
        <>
            {user ? children: ''}
        </>
    )
}

export default Secure
