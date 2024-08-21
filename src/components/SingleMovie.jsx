import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
export default function SingleMovie({ img, name, date, desc,director}) {
  return (
    <>
      <Container className='text-white'>
        <Row>
          <Col lg={3}>
            <Image src={img} alt={name} className='img-fluid rounded-3' />
          </Col>
          <Col lg={9} className='ps-5'>
            <h2>{name}</h2>
            <p>{date}</p>
            <h4>overview</h4>
            <p>{desc}</p>
            <div className='mt-5'>
            <h6 className='mb-0'><b>{director}</b></h6>
            <p>Director</p>
            </div>

          </Col>
        </Row>
      </Container>
    </>
  )
}
