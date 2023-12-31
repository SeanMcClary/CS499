"use client"
import { useEffect, useState } from "react";
import "./styles.css";

function EventList({ pdga_no, setEventId }: { pdga_no: number, setEventId: React.Dispatch<React.SetStateAction<number | null>> }){
  const [events, setEvents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);

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
          <li key={event.id} style={selected == event.id ? {'background-color': 'darkgray'} : {}}>
            <a className="link" onClick={() => {
              setSelected(event.id);
              setEventId(event.id);
            }}>
              {event.event_name}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default function Home({ params }: { params: { pdga_no: number} }) {
  const [eventId, setEventId] = useState<number | null>(null);
  const [intercept, setIntercept] = useState();
  const [eventRating, setEventRating] = useState();
  const [playerData, setPlayerData] = useState({
    fName: '',
    lName: '',
    rating: ''
  });

  useEffect(() => {
    async function fetchPlayerData() {
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

    fetchPlayerData();
  }, [params.pdga_no]);

  useEffect(() => {
    async function fetchEventData() {
      if (eventId) {
        // Fetch round rating and intercept
        const responseCoeff = await fetch(`/api/${params.pdga_no}?event_id=${eventId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const dataCoeff = await responseCoeff.json();
        setIntercept(dataCoeff['(Intercept)']);
        setEventRating(dataCoeff.event_rating);
      }
    }

    fetchEventData();
  }, [eventId]);

  const calculatePredictedScore = () => {
    if (intercept && eventRating && playerData.rating) {
      const predictedScore = Math.round(parseFloat(intercept) + (eventRating * parseFloat(playerData.rating)));
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
          <EventList pdga_no={params.pdga_no } setEventId={setEventId} />
        </div>
        <div className="content">
          {predictedScore && intercept && eventRating && (
            <>
              <p>Predicted score: {predictedScore}</p>
              <br />
              <p>Model Info:</p>
              <p>Constant: {intercept}</p>
              <p>Rating Coefficient: {eventRating}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
