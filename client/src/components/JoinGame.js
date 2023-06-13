import React, { useState } from 'react';
import {useChatContext} from 'stream-chat-react';

function JoinGame() {
    const [rivalUsername, setRivalUsername] = useState("");
    const {client} = useChatContext();

    const [channel, setChannel] = useState(null);
    
    const createChannel = async () =>{
        const response = await client.queryUsers({name: {$eq: rivalUsername}});

        if (response.users.length === 0){
            alert("User not found");
            return;
        }

        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id],
        });

        await newChannel.watch();
        setChannel(newChannel);

    }
  return (
    <>
    { channel ? (<h1>Game Started</h1> ): (
    <div className='joinGame'>
        <h4>Join Game</h4>
        <input placeholder='Username of rival' onChange={(event) => {setRivalUsername(event.target.value)}} ></input>
        <button onClick={createChannel}>Join/Start Game</button>
    </div>
    )
    }
    </>
  )
}

export default JoinGame