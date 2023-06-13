import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {StreamChat} from "stream-chat";
import Cookies from "universal-cookie";
import React, { useState } from 'react';

function App() {
const api_key = "4cdtyedubbv8";
const cookies = new Cookies();
const token = cookies.get("token");
const api_secret = "57vvartb5css5ndznmt2pwvyjkcgmfwprqq6nngbjyxrfnncsu69c4pedvzjvab7";

const client = StreamChat.getInstance(api_key);
const [isAuth, setIsAuth] = useState(false);

const logOut = () =>{
            cookies.remove("token");
            cookies.remove("userId");
            cookies.remove("firstName");
            cookies.remove("lastName");
            cookies.remove("userName");
            client.disconnectUser();
            setIsAuth(false);
};

if(token){
  client.connectUser({
    id: cookies.get("userId"),
    name: cookies.get("userName"),
    firstName: cookies.get("firstName"),
    lastName: cookies.get("lastName"),
    hashedPassword: cookies.get("hashedPassword")
  }, 
  token
  ).then((user)=>{
    setIsAuth(true);
  })
}

  return (
    <div className="App">
      {isAuth ? (
        <>
      <h1>Game</h1>
      <button onClick={logOut}>Log Out</button>
      </>
      ) : (
      <>
      <SignUp setIsAuth={setIsAuth}/>
      <Login setIsAuth={setIsAuth}/>
      </>
      )}
    </div>
  );
}

export default App;
