import React, { useState } from 'react';
import { Image, Modal, Button } from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';

const apiUrl = import.meta.env.VITE_API_URL;
const apitoken = import.meta.env.VITE_API_TOKEN;

export default function TrailerCard({ img, name, date, onhover, id, media }) {
    const [show, setShow] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    const handleShow = () => {
        console.log(id)
        fetch(`${apiUrl}${media}/${id}/videos`, {
            headers: {
                'Authorization': `Bearer ${apitoken}`,
                'Content-Type': 'application/json'
            }

        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                const trailer = data.results.find(video => video.type === 'Trailer');
                if (trailer) {
                    setVideoUrl(`https://www.youtube.com/embed/${trailer.key}`);
                    setShow(true);
                } else {
                    setShow(true);
                }
                console.log(data)
            })
            .catch(error => {
                console.error('Error fetching video data:', error);
            });
    };

    const handleClose = () => setShow(false);
    return (
        <>
            <div className='trailerCard position-relative'>
                <div className='rounded overflow-hidden'>
                    <Image src={img} rounded fluid loading='lazy' />
                </div>
                <div className="content text-center">
                    <h6>{name}</h6>
                    <p>{date}</p>
                </div>
                <Button onMouseOver={onhover} onClick={handleShow}></Button>
            </div>


            <Modal show={show} onHide={handleClose} style={{ backgroundColor: "transparent" }} >
                <Modal.Header closeButton className='p-0 pb-2 border-0'>
                </Modal.Header>
                <Modal.Body className='p-0' style={{ alignContent: "center", backgroundColor: videoUrl ? "transparent" : "white" }}>
                    {videoUrl ? (
                        <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
                    ) : (
                        <p className='text-center fs-2'>Video not found</p>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}
