
import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import artistsActions from '../../redux/actions/artistsactions';
import AdminTable from '../../utils/AdminTable/AdminTable';
import "./AdminValidations.css";
import { BASE_URL } from '../../api/url';
import axios from 'axios';
import { useState } from 'react';

export default function AdminValidations() {
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false)
    const [data, setData] = useState([])
  axios.get(`${BASE_URL}/api/tickets`)
  .then(res => setData(res))
  .catch(err => {
    setMessage(err.response.data.message)
    setError(true) 
  })

  let validateTicket = (id, name) => {
      Swal.fire({
            title: "¿Validar Ticket?",
            text: "Una vez validado, no podrás deshacer esta acción",
            icon: "warning",
            showCloseButton: true,
            showConfirmButton: true,
            showDenyButton: true,
      })
              Swal.fire({
                title: "Operación completada.",
                text: "Ticket validado exitosamente.",
                icon: "success"
              })
      }
  return (
    isError 
    ? 
    message 
    : 
    <>
    </>
  )
}