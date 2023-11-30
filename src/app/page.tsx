"use client"
import { useEffect, useState } from "react"
import "./styles.css";

function PlayerList(){
  const [players, setPlayers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchPlayers() {
      const response = await fetch('/api/playerlist', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const playerData = await response.json();
      setPlayers(playerData);
    }

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(player =>
    `${player.f_name} ${player.l_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return(
    <div>
      <input
        type="text"
        placeholder="Search by player name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredPlayers.map(player =>
          <li key={player.pdga_no}>
            <a href={"/player-data/" + player.pdga_no} target="_blank">
              {player.f_name} {player.l_name}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
    <div className="header">
      <title>AnalyDisc</title>
      <h1>AnalyDisc</h1>
      <p>
        This is a tool designed to analyze <br/>
        tournament results of professional disc <br/>
        golfers and predict their future results.
      </p>
    </div>

    <div className="container">
      <div className="player-list">
        <PlayerList />
      </div>
      <div className="main-content">
        <p>
          content
        </p>
      </div>
      
    </div>
    </>
  );
}
