import React from 'react';
import SingleMovie from './components/SingleMovie';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;
const apitoken = import.meta.env.VITE_API_TOKEN;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const imageBaseUrl2 = 'https://image.tmdb.org/t/p/original';
import placeholderimg from "./assets/images/placeholder.jpg";

export default function Movie() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [directorName, setDirectorName] = useState(null);
  const location = useLocation();
  const isMovie = location.pathname.includes('/movie/');
  const endpoint = isMovie ? 'movie' : 'tv';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}${endpoint}/${id}`, {
          headers: {
            'Authorization': `Bearer ${apitoken}`,
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setData(data);
        console.log(data)
        
        if (!isMovie && data.created_by && Array.isArray(data.created_by)) {
          setDirectorName(data.created_by[0]?.name || 'Unknown');
        } else if (isMovie) {
          const creditRes = await fetch(`${apiUrl}${endpoint}/${id}/credits`, {
            headers: {
              'Authorization': `Bearer ${apitoken}`,
              'Content-Type': 'application/json'
            }
          });
          if (!creditRes.ok) {
            throw new Error('Network response was not ok');
          }
          const creditData = await creditRes.json();
          const director = creditData.crew.find(role => role.known_for_department === 'Directing');
          setDirectorName(director?.name || 'Unknown');
          setCredit(creditData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, endpoint]);

  return (
    <>
      {data ? (
        <div className='movie-banner py-5' style={{ backgroundImage: `url(${imageBaseUrl2}${data.backdrop_path})` }}>
          <SingleMovie
            name={data.original_title || data.name}
            img={data.poster_path ? `${imageBaseUrl}${data.poster_path}` : placeholderimg}
            date={data.release_date || data.first_air_date}
            desc={data.overview}
            directorname={directorName}
            role={isMovie ? "Director" : "Creator"}
            media={isMovie ? 'movie' : 'tv'}
          />
        </div>
      ) : (
        <p>no data</p>
      )}
    </>
  );
}
