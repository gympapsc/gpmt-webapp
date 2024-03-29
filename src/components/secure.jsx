import React, { useState, useEffect } from "react"
import { useUser } from "../hooks"

import { ActivityIndicator } from "./progressIndicator"


const Secure = ({children}) => {    
    let user = useUser()
    return (
        <>
            {
                user ?
                children :
                <div className="absolute top-0 bottom-0 w-full flex flex-row justify-around items-center">
                    <div className="">
                        <ActivityIndicator />
                    </div>
                </div>
            }
        </>
    )
}

export default Secure
