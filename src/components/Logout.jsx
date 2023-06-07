import React from 'react'
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';

export default function Logout() {
    const{logout, isAuthenticated} = useAuth0()
    
    return (
        isAuthenticated && (
            <button onClick={logout} className="btnLogin">
                Log out
            </button>
        )
    )
}
