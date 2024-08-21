import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default function MediaCard({ img, name, date, percent, link , media}) {
    let bgcolor;
    if (percent < 40) {
        bgcolor = "red"
    } else if (percent < 60) {
        bgcolor = "#d2d531"
    } else {
        bgcolor = "#21c875"
    }
    const radius = 15;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
        <>
            <Link to={`http://localhost:5173/${media}/${link}`} className='text-decoration-none'>
                <Image src={img} rounded fluid loading='lazy' />
                <div className="content text-dark">
                    <div className='canvas'>{percent}<sup>%</sup></div>
                    <svg height="35" width="35" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: "-19px", left: "6px", transform: "rotate(-90deg)" }}>
                        <circle
                            r={radius}
                            cx="17"
                            cy="17"
                            fill="transparent"
                            stroke={bgcolor}
                            strokeWidth="2"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            style={{ transition: 'stroke-dashoffset 6s linear' }}
                        />
                    </svg>
                    <h6>{name}</h6>
                    <p>{date}</p>
                </div>
            </Link>
        </>
    )
}
