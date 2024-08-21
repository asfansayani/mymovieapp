import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
export default function Banner() {
    const [input, setInput] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(input); 
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
                                <button type="submit" className=''>Search</button>
                            </form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}
