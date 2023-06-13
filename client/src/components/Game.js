import React, { useState } from 'react'

function Game({channel}) {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

    channel.on("user.watching.start", (event) =>{
        setPlayersJoined(event.watcher_count === 2)
    })
    if(!playersJoined){
  return (
    <div>Waiting or the other player</div>
  )
    }
    else{
return <div className='gameContainer'>
    <board />
     {/* CHAT */}
     {/* EXIT GAME */}
</div>
    }
}

export default Game