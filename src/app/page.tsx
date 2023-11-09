"use client"

import { useEffect, useState } from "react"

    
//Look into conditional rendering                                                                      LOOOK HERE


function PlayerList(){
  const [players, setPlayers] = useState<any[]>([])
  useEffect(() => {
    async function fetchco() {
      const response = await fetch('/api/playerlist', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const out =  await response.json()
        //console.log(out)
        setPlayers(out)//this is where add out.map and you can display only certain things
    }
    fetchco()
  },[] ) 

  return(
    <div>
      <ul>{players?.map(player =>
        <li>
          <a href={"/player-data/" + player.pdga_no} target="_blank">{player.f_name} {player.l_name}</a>
        </li>
        )}
      </ul>
    </div>
  )
}


export default function Home() {
  return (
    <>
      <title>Disc Golf Analysis Tool</title>
      <h1>
        Disc Golf Analysis Tool
      </h1>
      <p>This is a tool designed to analyse tournament results 
        of professional disc golfers and predict their future 
        results
      </p>
      <div>
      <a href="localhost:3000"><button className="tab"> Home</button></a>
      <button className="tab" onClick={PlayerList}> Player List</button>
      </div>
      
      {PlayerList()}
    </>
  )
}

