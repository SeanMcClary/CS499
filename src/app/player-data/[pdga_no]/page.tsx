"use client"
import { useEffect, useState } from "react";


function Player({ pdga_no }: { pdga_no: string }) {
  const [fName, setfName] = useState();
  const [lName, setlName] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    async function fetchPlayer() {
      const response = await fetch(`/api/player?pdga_no=${pdga_no}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);

      setfName(data['f_name']);
      setlName(data['l_name']);
      setRating(data.rating)
    }

    fetchPlayer();
  });
  return (
    <div>
      <p>Player: {fName} {lName}</p>
      <p>pdga: {pdga_no}</p>
      <p>Rating: {rating}</p> 
    </div>
  );
}


export default function Home({ params }: { params: { pdga_no: string } }) {
  const [intercept, setIntercept] = useState();
  const [roundRating, setRoundRating] = useState();
  const [playerRating, setPlayerRating] = useState();

  useEffect(() => {
    async function fetchData() {
      const responseCoeff = await fetch('/api/model', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const dataCoeff = await responseCoeff.json();
      setIntercept(dataCoeff['(Intercept)']);
      setRoundRating(dataCoeff.round_rating);

      const responsePlayer = await fetch(`/api/player?pdga_no=${params.pdga_no}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const dataPlayer = await responsePlayer.json();
      setPlayerRating(dataPlayer.rating);
    }

    fetchData();
  }, [params.pdga_no]);

  const calculatePredictedScore = () => {
    if (intercept && roundRating && playerRating) {
      const predictedScore = Math.round(parseFloat(intercept) + (roundRating * playerRating));
      return predictedScore;
    }
    return null;
  };

  const predictedScore = calculatePredictedScore();

  return (
    <div>
      <Player pdga_no={params.pdga_no} />
      <br/>
      <p>Predicted score: {predictedScore}</p>
      <br/>
      <p>Model Info:</p>
      <p>Constant: {intercept}</p>
      <p>Rating Coefficient: {roundRating}</p>
    </div>
  );
}