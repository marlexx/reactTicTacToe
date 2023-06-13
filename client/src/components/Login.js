import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';

function Login({setIsAuth}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    var cookies = new Cookies();
    const login = () =>{
      Axios.post("http://localhost:3001/login",{
        username,
        password
      }).then((res)=>{
        const {token, firstName, lastName, username, userId} = res.data;

            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("userName", username);
            setIsAuth(true);
      })
    };
  return (
    <div className='signUp'>
        <label>Log in</label>
        <input placeholder='User Name' onChange={(event) =>{
            setUsername(event.target.value);
        }} />
        <input placeholder='Password' onChange={(event) =>{
            setPassword(event.target.value);
        }} />
        <button onClick={login}>Login</button>
        </div>
  )
}

export default Login