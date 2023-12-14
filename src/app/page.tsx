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
            <a className="link" href={"/player-data/" + player.pdga_no} target="_blank">
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
    </div>

    <div className="container">
      <div className="player-list">
        <PlayerList />
      </div>
      <div className="main-content">
      <p>
        This website, designed by Sean McClary and Noah Swartzentruber, is designed
        to show you a predictive model of placement for disc golfers based on prior 
        rounds at the same course. It accomplishes this by accessing a database holding
        the rounds of disc golfers who finished top 100 in the pro tour over the last 7
        years. Their event and round specific data was scraped off of their statmando.com
        profile and the events were associated by course and year. An R-script using
        linear regression was used to find each players model such that the model differs
        by player by event to provide the most accurate information.
        <br />
        <br /> How to Use:
        <ol>
          <li>Visit the main page where you'll find a list of disc golf players.</li>
          <li>Click on a player's name to view their detailed information in a new tab.</li>
          <li>Within the player’s page, explore the list of events they’ve participated in.</li>
          <li>Select a specific event to access detailed data.</li>
          <li>View the linear regression model data, displaying the player's estimated score for that event.</li>
          <li>Note: The estimation is based on the player’s past performance in that tournament or on all players' performances if not even data is available</li>
        </ol>
      </p>
      </div>
      
    </div>
    </>
  );
}
