import React from "react"
import Link from 'next/link'
import Head from "next/head"

export default function Index() {
    
    return (
        <div>
            <Head>
                <title>Sample Application</title>
            </Head>
            <h1>Hello World</h1>
            <Link href="/home">Go to Home</Link>
            <img src="/clouds.jpeg" />
        </div>
    )
}
