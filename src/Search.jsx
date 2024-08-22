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

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query') || '';
        console.log(query)
        if (query) {
            fetch(`${apiUrl}search/multi?query=${encodeURIComponent(query)}`, {
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
    }, [location.search]);
    return (
        <section className="sec-pad">
            <Container>
                <SecHd sechd="search" />
                <div className="search-results">
                    {data.length > 0 ? (
                        <Row>
                            {data.map((data) => (
                                <Col lg={2} key={data.id}>
                                    <MediaCard
                                        img={data.poster_path ? `${imageBaseUrl}${data.poster_path}` : placeholderimg}
                                        name={data.title || data.name}
                                        date={data.release_date || data.first_air_date}
                                        percent={Math.round(data.vote_average * 10)}
                                        link={data.id}
                                        media={"movie"}
                                    />
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
