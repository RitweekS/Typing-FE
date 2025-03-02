'use client'
import React from 'react'
import { signIn, signOut } from 'next-auth/react'
const page = () => {
    return (
        <div>
            <button onClick={() => signIn()}>Signin</button>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}

export default page