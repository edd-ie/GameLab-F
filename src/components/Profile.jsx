import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';


export default function Profile() {
  const{user, isAuthenticated} = useAuth0()
    
    return (
        isAuthenticated && (
            <div>
                <h1>Welcome {user.name}</h1>
                <p>Your email is {user.email}</p>
                {JSON.stringify(user)}
                {user?.picture&&<img src={user.picture} alt={user.name} />}
            </div>
        )
    )
}
