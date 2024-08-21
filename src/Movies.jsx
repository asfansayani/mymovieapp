import MediaCard from "./components/MediaCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
const apitoken = import.meta.env.VITE_API_TOKEN;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const Movies = () => {
  const [data, setData] = useState({ results: [] });
  const [loaddata, setLoadData] = useState(1)
  useEffect(() => {
    fetch(`${apiUrl}movie/now_playing`, {
      headers: {
        'Authorization': `Bearer ${apitoken}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok")
      }
      return res.json();
    }).then((data) => {
      console.log(data);
      setData(data)
    })
  }, [])
  const handleupdate = ()=> {
    setLoadData((prev) => prev + 1);
}

  useEffect(() => {
    if(loaddata > 1) {
      fetch(`${apiUrl}movie/now_playing?page=${loaddata}`, {
        headers: {
          'Authorization': `Bearer ${apitoken}`,
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok")
        }
        return res.json();
      }).then((data) => {
        console.log(data);
        setData((prevData) => ({
          results: [...prevData.results, ...data.results]
        }));
      })
    }
  }, [loaddata])
  return (
    <>
      <section className="sec-pad">
        <Container>
          <Row>
            {data.results && data.results.length > 0 ? (
              data.results.map((data) => (
                <Col lg={2} key={data.id}>
                  <MediaCard
                    img={`${imageBaseUrl}${data.poster_path}`}
                    name={data.title || data.name}
                    date={data.release_date || data.first_air_date}
                    percent={Math.round(data.vote_average * 10)}
                    link={data.id}
                  />
                </Col>
              ))
            ) : (
              <p>sdsdsdsdssds</p>
            )}
            <Col lg={12}>
              <Button variant="primary" className="pt-2 text-center fw-bold fs-3 w-100" onClick={handleupdate}>Load More</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Movies;