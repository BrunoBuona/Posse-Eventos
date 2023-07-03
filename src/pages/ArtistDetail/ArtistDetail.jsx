import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../api/url'
import { Button, Spinner } from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons';
import './ArtistDetail.css'
import { useTranslation } from 'react-i18next'

const ArtistDetail = () => {
   let { id } = useParams()
   let [artist, setArtist] = useState({})
   let [concerts, setConcerts] = useState([])
   let [load, setLoad] = useState(true)
   let [error, setError] = useState('')
   let navigate = useNavigate()
   const { t } = useTranslation()
   useEffect(() => {
      axios.get(`${BASE_URL}/api/artists/${id}`)
         .then(res => {
            setArtist(res.data.data)
            setLoad(false)
         })
         .catch(err => {
            setLoad(false)
            err.response ?
               setError(err.response.data.message) :
               setError(err.message)
         })

      axios.get(`${BASE_URL}/api/concerts?artistId=${id}`)
         .then(res => setConcerts(res.data.response))
         .catch(err => console.log(err.message))
   }, [id])
   return (
      <>
         <div className='w-100 mb-2 d-flex flex-column justify-content-center align-items-center'>
            {
               load ?
                  <Spinner /> :
                  artist.name ?
                     <div className='w-100 pb-4'>
                        <div className='detail__image--container' style={{ backgroundImage: `url(${artist.photo})` }}>
                           <h2 className='text-light text-detail text-center'>{artist.name}</h2>
                        </div>

                        <div className='d-flex flex-column align-items-center flex-lg-row'>
                           <div className='pt-5 d-flex container-details'>
                              <div className='d-flex flex-column px-4 '>
                                 <p>{artist.description}</p>
                                 <p><span className='genre__key'>{t('genre')}:</span> {artist.genre.join(", ")}</p>
                                 <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                    <h4 className='text-up'>{t('incom_c')}</h4>
                                    {concerts.length > 0 ?
                                       concerts.map(el => <div className='concert-link text-black' onClick={() => navigate(`/concerts/${el._id}`)} key={el._id} to={`/concerts/${el._id}`}>+{el.name}</div>) : <></>}
                                 </div>
                                 <span className='genre__key text-center fs-5 pt-3'>{t('social')}</span>
                                 <div className='d-flex justify-content-center gap-5 p-5'>
                                    <div className='d-flex flex-column align-items-center gap-2'>
                                       <SocialIcon label='YouTube Channel' url={artist.youtubeChannel} className="icon-social" network="youtube" fgColor="#ffffff" style={{ height: 40, width: 40 }} />
                                       <a href={artist.youtubeChannel} style={{ textDecoration: 'none' }}>
                                          Youtube Channel
                                       </a>
                                    </div>
                                    <div className='d-flex flex-column align-items-center gap-2'>
                                       <SocialIcon label='Spotify Playlist' url={artist.spotifyPlaylist} className="icon-social" network="spotify" fgColor="#ffffff" style={{ height: 40, width: 40 }} />
                                       <a href={artist.spotifyPlaylist} style={{ textDecoration: 'none' }}>
                                          Spotify Playlist
                                       </a>
                                    </div>

                                 </div>
                              </div>
                              <div className='d-flex justify-content-center w-100'>
                                 <iframe src={artist.youtubeVideo} title={artist.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                              </div>
                           </div>
                        </div>
                     </div> :
                     <h2 className='text-center'>{error}</h2>
            }
            <Button variant='outline-danger' onClick={() => navigate('/artists')}>{t('artist_back')}</Button>
         </div>
      </>
   )
}

export default ArtistDetail