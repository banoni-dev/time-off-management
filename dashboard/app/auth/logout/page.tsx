"use client"
import React, { useEffect } from 'react'

export default function page() {

const redirectToLogin = () => {
    setTimeout(() => {
        window.location.href = '/auth/signin'
    }, 2000)
}

useEffect(() => {
    localStorage.removeItem('token')
    redirectToLogin()
}, [])

  return (
    <div className='flex h-[80vh] justify-center items-center'>

    <h1 className='fs-xxl'>You are logged out</h1>

    </div>
  )
}
