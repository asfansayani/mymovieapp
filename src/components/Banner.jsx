import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
const apitoken = import.meta.env.VITE_API_TOKEN;
export default function Banner() {
    const navigate = useNavigate()

  const gotToNewPage=()=>{
    navigate(`/mymovieapp/search/?query=${encodeURIComponent(input)}`);
  }
    const [input, setInput] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Container>
                <div className='banner'>
                    <Row>
                        <Col>
                            <h1 className='mb-0'><b>Welcome.</b></h1>
                            <p className='fw-semibold mb-5'>Millions of movies, TV shows and people to discover. Explore now.</p>
                            <form onSubmit={handleSubmit} className='d-flex inputWrap'>
                                <input type="search" value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder='Search for a movie, tv show, person......' />
                                <button onClick={() => gotToNewPage()} type="submit" className=''>Search</button>
                            </form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}
