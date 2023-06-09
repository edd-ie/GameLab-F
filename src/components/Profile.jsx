import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import './Profile.css'
import save from '../assets/save.png'


export default function Profile() {
  const{user, isAuthenticated} = useAuth0()
  const [userDetails, setUserDetails] = useState({})
  console.log("file: Profile.jsx:11 -> Profile -> userDetails:", userDetails);

  const userData = {
    name: user.nickname,
    email: user.email
  }
  

    function handleSubmit(e){
        e.preventDefault()
        let form = e.target
        let input = form[0].value

        let rename = {
            name: input,
            email: user.email
        }

        fetch('http://localhost:9292/rename_user',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rename)
        }).then(res => res.json())
        .then(data => setUserDetails(data))

        form.reset()
    }

    useEffect(() => {
        fetch('http://127.0.0.1:9292/user',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => setUserDetails(data))
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
                        <div id='profilePic'>
                            <img id='profPic' src={user.picture} alt={user.name} />
                        </div>
                    </div>
                    <div id='profileInfo'>
                        <div id='profileName'><span>User name:</span> {userDetails.name}</div>
                        <div id='profileEmail'><span>Email: </span> {user.email}</div>
                        <div id='profileEmail'><span>Verified:</span> {user.email_verified?'True':'False'}</div>
                        <div id='profileEmail'><span>Joined:</span>  {user.updated_at.split(':')[0]}</div>
                    </div>
                </div>
                <form action="submit" id='profileForm' onSubmit={handleSubmit}>
                    <input id='profInput' type="text" name="name" placeholder="Change UserName" required />
                    <button id='profButton' type="submit" name="Change"></button>
                </form>
            </div>
        )
    )
}
