"use client"
import { useEffect, useState } from "react";

function Coefficients() {
  const [intercept, setIntercept] = useState();
  const [roundRating, setRoundRating] = useState();
  const [currentPlayer, setCurrentPlayer] = useState('');

  useEffect(() => {
    async function fetchData() {
      // Fetch the coefficients and other data from your API
      const response = await fetch('/api/model', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      setIntercept(data['(Intercept)']);
      setRoundRating(data.round_rating);
      
    }

    // Fetch coefficients and data when the component mounts
    fetchData();

    // Extract the player variable from the current URL
    const currentURL = window.location.href;
    const playerIndex = currentURL.indexOf('player-data/');
    if (playerIndex !== -1) {
      const playerDataStart = playerIndex + 'player-data/'.length;
      setCurrentPlayer(currentURL.substring(playerDataStart));
    }
  }, []);

    let content;
    let rating;
    if (currentPlayer === "24843") {
      content = <p>Rating: 999</p>;
      rating = 999;
    } else if (currentPlayer == "121715") {
      content = <p>Rating: 1024</p>;
      rating = 1024;
    } else {
      content = <p>Rating: 1013</p>;
      rating = 1013;
    }
    
    let score = (Number(intercept) + (Number(roundRating) * rating))
  

  return (
    <div>
      <p>Intercept: {intercept}</p>
      <p>Round coeffiecent: {roundRating}</p>
      <p>Player: {currentPlayer}</p>
      <p>{content}</p>
      <p></p>
      <p>Our model would indicate this player will score a : {score.toFixed()}</p>
      
      
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {Coefficients()}
    </div>
  );
}
