import React, {useRef} from 'react'
import {Card} from 'react-bootstrap'
import './ArtistsCard.css'
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ArtistsCard = ({id, name, photo}) => {
    let navigate = useNavigate()
    let imgRef = useRef(null)
    let textRef = useRef(null)
    const {t} = useTranslation()
  return (
    <Card 
        className='artist__card'
        onMouseOver={() => {imgRef.current.classList.add('opacity'); textRef.current.classList.remove('hidden')}} 
        onMouseLeave={() => {imgRef.current.classList.remove('opacity'); textRef.current.classList.add('hidden')}}
        onClick={() => navigate(`/artists/${id}`)}
        style={{ width: '18rem' }}
        >
        <div className='image__container d-flex justify-content-center align-items-center'>
            <Card.Text ref={textRef} className='card__text hidden'>{t('view_d')} +</Card.Text>
            <Card.Img ref={imgRef} className='card__image' variant="top" src={photo} />
        </div>
        <Card.Body>
            <Card.Title className='text-center'>{name}</Card.Title>
        </Card.Body>
    </Card>
  )
}

export default ArtistsCard