// This module is the first module of the home page, it contains only the initial carrousel.


// Imports
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../../api/url';
import { Link } from 'react-router-dom';
// Styles
import './Carrousel.css';

// Export the module
export default function M1Carrousel() {
  const [data, setData] = useState([])
  useEffect(() => {
    getConcerts()
  }, [])
  async function getConcerts() {
    const response = await fetch(`${BASE_URL}/api/concerts`)
    const data = await response.json()
    // Here you can manage the total of artists you want to show - BB
    const concerts = data.response.slice(0, 10)
    // Avoid promise setting a state after component unmount - BB
    setData(concerts)
  }
  return (
    <Carousel fade >
      {data.map((concerts) => {
        return (
          <Carousel.Item key={concerts._id} className='carrousel-container'>
            <img
              className="home-module-carrousel img-fluid"
              src={concerts.photo}
              alt={concerts.name}
            />
            <Link to={`/concerts/${concerts._id}`} className="stretched-link"></Link>

          </Carousel.Item>
        )
      }
      )}
    </Carousel>
  )
}
