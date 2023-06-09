import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import './Profile.css'


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
    //JSON.stringify(user)
    console.log('User : ',user)

    return (
        isAuthenticated && (
            <div>
                <Link to="/">
                    <h2 id='homeIcon'>Game <span>Lab</span> </h2>
                </Link>
                <div id='profile'>
                    <div id='profileIcon'>
                        <div id='profilePic'></div>
                    </div>
                    <div id='profileInfo'>
                        <div id='profileName'><span>User name:</span> {user.nickname}</div>
                        <div id='profileEmail'><span>Email: </span> {user.email}</div>
                        <div id='profileEmail'><span>Verified:</span> {user.email_verified?'True':'False'}</div>
                        <div id='profileEmail'><span>Joined:</span>  {user.updated_at.split(':')[0]}</div>
                    </div>
                </div>
                <form action="submit" id='profileForm'>
                    <input type="text" name="name" placeholder="Change UserName" required />
                    <button type="submit" name="Change">Change</button>
                </form>
                {/* <h1>Welcome {user.name}</h1>
                <p>Your email is {user.email}</p>
                {JSON.stringify(user)}
                {user?.picture&&<img src={user.picture} alt={user.name} />} */}
            </div>
        )
    )
}
