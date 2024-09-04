import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SecHd from './components/SecHd';
import MediaCard from './components/MediaCard';
import { Container, Row, Col } from "react-bootstrap";
import placeholderimg from "./assets/images/placeholder.jpg"
const apiUrl = import.meta.env.VITE_API_URL;
const apitoken = import.meta.env.VITE_API_TOKEN;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const Search = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const [filter, setFilter] = useState("movie")
    const handleFilter = (e) => {
        setFilter(e.target.name)
        document.querySelectorAll('.primarybtn').forEach(button => {
            button.classList.remove('active');
        });
        e.target.classList.add("active")
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query') || '';
        console.log(query)
        if (query) {
            fetch(`${apiUrl}search/${filter}?query=${query}`, {
                headers: {
                    'Authorization': `Bearer ${apitoken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setData(data.results);
                })
        }
    }, [location.search, filter]);
    return (
        <section className="sec-pad">
            <Container>
                <div className="mb-5">
                <button onClick={handleFilter} name='movie' className='primarybtn px-5 me-2 active'>Movie</button>
                <button onClick={handleFilter} name='tv' className='primarybtn px-5 me-2'>Tv</button>
                <button onClick={handleFilter} name='person' className='primarybtn px-5 me-2'>person</button>
                <button onClick={handleFilter} name='collection' className='primarybtn px-5'>collection</button>
                </div>
                <SecHd sechd={filter} />
                <div className="search-results">
                    {data.length > 0 ? (
                        <Row>
                            {data.map((data) => (
                                <Col lg={2} key={data.id}>
                                    {filter !== "person" ? (
                                        <MediaCard
                                        img={data.poster_path ? `${imageBaseUrl}${data.poster_path}` : placeholderimg}
                                        name={data.title || data.name}
                                        date={data.release_date || data.first_air_date}
                                        percent={Math.round(data.vote_average * 10)}
                                        link={data.id}
                                        media={data.media_type || filter}
                                        classname={filter == "collection" ? "collection" : ""}
                                    /> 
                                    ) : (
                                        <div>
                                            <img src={data.profile_path ? `${imageBaseUrl}${data.profile_path}` : placeholderimg } alt={data.name} />
                                            <h5>{data.name}</h5>
                                        </div>
                                    )}
                                    
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default Search;
