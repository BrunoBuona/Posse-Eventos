import React, { useRef } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ConcertCard.css";

export default function ConcertCard({ concert }) {

  let imgRef = useRef(null)
  let textRef = useRef(null)
  return (
    <Card
      className="Concert-card border-0 h-100"
      style={{textAlign:'center'}}
      onMouseOver={() => { imgRef.current.classList.add('opacity-25'); textRef.current.classList.remove('hidden') }}
      onMouseLeave={() => { imgRef.current.classList.remove('opacity-25'); textRef.current.classList.add('hidden') }}
    >
      <Link to={`/concerts/${concert._id}`} className="stretched-link">
        <div className="Concert-card-imageContainer d-flex justify-content-center align-items-center">
          <Card.Text ref={textRef} className='card__text hidden'>Ver detalles +</Card.Text>
          <Card.Img ref={imgRef} style={{maxWidth:'100%',maxHeight:'100%'}} className='Concert-card-image fluid' variant="top" src={concert.photo} />
        </div>
      </Link>
      <Card.Body>
        <Card.Text className="text-capitalize">
          {concert.venue.name} / <span className="text-main fw-bold">{concert.type}</span>
        </Card.Text>
        <Card.Title className="text-capitalize mb-0">{concert.name}</Card.Title>

      </Card.Body>
      <Card.Footer className="bg-white">
        <Card.Text className="text-muted mt-auto">{concert.date.split("T")[0].split("-").reverse().join("-")}</Card.Text>
      </Card.Footer>
    </Card>
  );
}
