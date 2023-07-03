// Imports
import Card from 'react-bootstrap/Card';
import React from 'react'
import { BASE_URL } from '../../../api/url';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//Styles
import '../Module2/TopArtist.css'
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function ComingSoonEvents() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        getConcerts()
    }, [])
    async function getConcerts() {
        try {
            const response = await axios.get(`${BASE_URL}/api/concerts?limit=6`)
            const artists = response.data.response;
            setData(artists)
        } catch {}
    }
    return (
        <>
            <div className='module2-artist-container pb-5'>
                <h2 className='module2-h2'>{t('Proximos Eventos')}</h2>
                <div className='module2-cards-artist'>
                    {data.map((concerts) => {
                        return (
                            <Card key={concerts._id} className="bg-dark text-white module2-cards">
                                <Link to={`/concerts/${concerts._id}`} className="stretched-link">
                                    <Card.Img className='module2-cards-image' src={concerts.photo} alt="Card image" />
                                    <Card.ImgOverlay className='module2-cards-overlay'>
                                        <Card.Text className='module2-cards-text'>{concerts.name}</Card.Text>
                                    </Card.ImgOverlay>
                                </Link>
                            </Card>
                        )
                    }
                    )}
                </div>
                <button className='module2-btn-artist-text' onClick={e => navigate('/concerts')}>{t('see_m')}</button>
            </div>
        </>
    )
}