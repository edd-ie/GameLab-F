import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";


export default function Profile() {
  const{user, isAuthenticated} = useAuth0()

  const userData = {
    name: user.nickname,
    email: user.email
  }
  

    useEffect(() => {
        fetch('http://127.0.0.1:9292/user',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => console.log('User responser: ',data))
    },[])
    
    return (
        isAuthenticated && (
            <div>
                <Link to="/">
                    <h2 id='homeIcon'>Game <span>Lab</span> </h2>
                </Link>
                <h1>Welcome {user.name}</h1>
                <p>Your email is {user.email}</p>
                {JSON.stringify(user)}
                {user?.picture&&<img src={user.picture} alt={user.name} />}
            </div>
        )
    )
}
