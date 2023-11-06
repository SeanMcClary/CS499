"use client"

import { useEffect, useState } from "react"

    
//Look into conditional rendering                                                                      LOOOK HERE


function Coeffecients(){
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
        //console.log(out)
        setIntercept(out['(Intercept)'])
        setRoundRating(out.round_rating)
    }
    fetchco()
  }, ) 

  return(
    <div>
      <p>{intercept}</p>
      <p>{roundRating}</p>
    </div>
  )
}


export default function Home() {
  return (
    <>
      {Coeffecients()}
    </>
  )
}

