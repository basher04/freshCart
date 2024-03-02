import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoutes({children}) {

    
    let token = localStorage.getItem('token')
    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
    } catch (error) {
        console.log ('err')
        localStorage.clear()
        return <Navigate to="/signIn"/>
    }
    if(token) return children

  return <Navigate to="/signIn"/>
}
