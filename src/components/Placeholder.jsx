import React from 'react'
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Placeholderimg from '../assets/images/placeholder.svg';
export default function CardPlaceholder() {
    return (
        <>
            <Card border="0">
                <Card.Img variant="top" src={Placeholderimg} className='placeholder-wave' />
                <Card.Body style={{ paddingLeft: "0" }}>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={9} size="sm" />
                    </Placeholder>
                    <Placeholder as="p" animation="wave">
                        <Placeholder xs={7} size="xs" />
                    </Placeholder>
                </Card.Body>
            </Card>
        </>
    )
}
