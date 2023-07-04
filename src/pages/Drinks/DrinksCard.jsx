import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../api/url'
import { Button, Spinner } from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons';
import './DrinksCard.css'
import { useTranslation } from 'react-i18next'

const DrinksCard = () => {
   let { id } = useParams()
   let [drink, setDrink] = useState({})
   let [load, setLoad] = useState(true)
   let [error, setError] = useState('')
   let navigate = useNavigate()
   const { t } = useTranslation()
   useEffect(() => {
      axios.get(`${BASE_URL}/api/drink/${id}`)
         .then(res => {
            setDrink(res.data.data)
            setLoad(false)
         })
         .catch(err => {
            setLoad(false)
            err.response ?
               setError(err.response.data.message) :
               setError(err.message)
         })
   }, [id])
   return (
      <>
         <div className='w-100 mb-2 d-flex flex-column justify-content-center align-items-center' >
               {
                  load ?
                     <Spinner /> :
                     drink.name ?
                        <div className='w-100 pb-4'>
                    <div className='detail__image--container' style={{ backgroundImage: `url(https://25.media.tumblr.com/8269399d1728cb0b1b46edd017b83601/tumblr_mrwfkyOQ191sfc0pbo1_500.gif)` }}>
                           
                              <h2 className='text-light text-detail text-center'>{drink.name}</h2>
                           </div>
                           <div className='d-flex flex-column align-items-center'>
                              <div className='pt-5 d-flex container-details'>
                                 <div className='d-flex flex-column px-4 ' style={{textAlign:'center', justifyContent:'center',alignItems:'center'}}>
                                    <p>Descripción: {drink.description}</p>
                                    <p>Precio: {drink.price}   AR$</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        :
                        <h2 className='text-center'>{error}</h2>
               }
               <Button variant='outline-danger' onClick={() => navigate('/admin/drinks')}>Volver a Bebidas</Button>

            </div>
      </>
   )
}

export default DrinksCard