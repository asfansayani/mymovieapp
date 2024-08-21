import React from 'react'
import SingleMovie from './components/SingleMovie';
import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;
const apitoken = import.meta.env.VITE_API_TOKEN;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const imageBaseUrl2 = 'https://image.tmdb.org/t/p/original';
  let directorname ;
export default function Movie() {
  const { id } = useParams();
  const [data, setData] = useState(null)
  const [credit, setCredit] = useState(null)
  const location = useLocation();
  const isMovie = location.pathname.includes('/movie/');
  const endpoint = isMovie ? 'movie' : 'tv';
  useEffect(() => {
    fetch(`${apiUrl}${endpoint}/${id}`, {
      headers: {
        'Authorization': `Bearer ${apitoken}`,
        'Content-Type': 'application/json'
      }      
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return res.json();
    }).then((data) => {
      console.log(data)
      setData(data)
    });
    fetch(`${apiUrl}${endpoint}/${id}/credits`, {
      headers: {
        'Authorization': `Bearer ${apitoken}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return res.json();
    }).then((data) => {
      console.log(data)
       directorname = data.crew.find(role => role.department === 'Directing');
       console.log(directorname)
      setCredit(data)
    })
  }, [id,endpoint])

  return (
    <>
      {data ? (
        <>
          <div className='movie-banner py-5' style={{backgroundImage: `url(${imageBaseUrl2}${data.backdrop_path})` }}>
            <SingleMovie
              name={data.original_title}
              img={`${imageBaseUrl}${data.poster_path}`}
              date={data.release_date}
              desc={data.overview}
              director={directorname.name}
              media={isMovie ? 'movie' : 'tv'}
            />
          </div>
        </>

      ) :
        <p>no data</p>}

    </>
  )
}
