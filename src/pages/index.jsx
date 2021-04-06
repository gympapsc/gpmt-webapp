import React from "react"
import Image from "next/image"


export default function Index() {
    return (
        <div>
            <h1>Hello World</h1>
            <Image src="/clouds.jpeg" width="200" height="120" layout="responsive"/>
        </div>
    )
}
