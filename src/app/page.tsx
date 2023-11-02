"use client"
// export function player_table(){
//   const p_list = [
//     38008, "Richard", "Wysocki",
//     27523, "Paul", "McBeth",
//     37817, "Eagle", "McMahon",
//     18824, "Nathan", "Sexton",
//     27171, "Paul", "Ulibarri",
//     68286, "Nathan", "Queen",
//     17295, "James", "Conrad",
//     33705, "Jeremy", "Koling",
//     10671, "Chris", "Dickerson",
//     24341, "Cale", "Leiviska"]
//   p_list.map                                                               yeeet
//     return(
//       <tr>
//         <td><a href="localhost:3000">name</a></td>
//         <td>27523</td>
//         <td>1049</td>
//       </tr>
//       )
//   }

import { useEffect, useState } from "react"

    
//Look into conditional rendering                                                                      LOOOK HERE



export default function Home() {
  const [intercept, setIntercept] = useState()
  const [roundRating, setRoundRating] = useState()
  useEffect(() => {
    async function fetchco() {
      const response = await fetch('/api/model', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const out =  await response.json()
        console.log(out)
        setIntercept(out['(Intercept)'])
        setRoundRating(out.round_rating)
    }
    fetchco()
  }, ) 
  return (
    <>
      <title>Disc Golf Analysis Tool</title>
      <h1>
        Disc Golf Analysis Tool
      </h1>
      <p>This is a tool designed to analyse tournament results of professional disc golfers and predict their future results</p>
      <p>{intercept}</p>
      <p>{roundRating}</p>
      <table>

        <tr>
          <th>Name</th>
          <th>PDGA number</th>
          <th>Current Rating</th>
        </tr>
        <tr>
         <td><a href="localhost:3000">name</a></td>
         <td>27523</td>
         <td>1049</td>
       </tr>

      </table>
      </>
  )
}
