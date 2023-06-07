import React from 'react'
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';


export default function Login() {
    const{loginWithRedirect, isAuthenticated} = useAuth0()
    
    return (
        !isAuthenticated && (
            <button onClick={loginWithRedirect} className="btnLogin">
                Sign In
            </button>
        )
    )
}
