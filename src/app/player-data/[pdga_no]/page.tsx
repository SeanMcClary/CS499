"use client"
import { useEffect, useState } from "react";
import "./styles.css";

function EventList({ pdga_no }: { pdga_no: number }){
  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch(`/api/events?pdga_no=${pdga_no}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const eventData = await response.json();
      setEvents(eventData);
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    `${event.event_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return(
    <div>
      <input
        type="text"
        placeholder="Search by event name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredEvents.map(event =>
          <li key={event.event_name}>
            <a className="link">
              {event.event_name}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Home({ params }: { params: { pdga_no: number } }) {
  const [intercept, setIntercept] = useState();
  const [roundRating, setRoundRating] = useState();
  const [playerData, setPlayerData] = useState({
    fName: '',
    lName: '',
    rating: ''
  });

  useEffect(() => {
    async function fetchData() {
      // Fetch round rating and intercept
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

      // Fetch player data
      const responsePlayer = await fetch(`/api/player?pdga_no=${params.pdga_no}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const dataPlayer = await responsePlayer.json();
      setPlayerData({
        fName: dataPlayer['f_name'],
        lName: dataPlayer['l_name'],
        rating: dataPlayer.rating
      });

    }

    fetchData();
  }, [params.pdga_no]);

  const calculatePredictedScore = () => {
    if (intercept && roundRating && playerData.rating) {
      const predictedScore = Math.round(parseFloat(intercept) + (roundRating * parseFloat(playerData.rating)));
      return predictedScore;
    }
    return null;
  };

  const predictedScore = calculatePredictedScore();

  return (
    <>
      <div className="header">
        <p>Player: {playerData.fName} {playerData.lName}</p>
        <p>pdga: {params.pdga_no}</p>
        <p>Rating: {playerData.rating}</p>
      </div>
        <div className="container">
        <div className="event-list">
          <EventList pdga_no={params.pdga_no } />
        </div>
        <div className="content">
          <p>Predicted score: {predictedScore}</p>
          <br/>
          <p>Model Info:</p>
          <p>Constant: {intercept}</p>
          <p>Rating Coefficient: {roundRating}</p>
        </div>
      </div>
    </>
  );
}
