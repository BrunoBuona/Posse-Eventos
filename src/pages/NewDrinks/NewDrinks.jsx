import axios from 'axios'
import React, {useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../api/url'
import Swal from'sweetalert2'
import { useNavigate } from 'react-router-dom'

const NewDrinks = () => {

    let navigate = useNavigate()
    let {token} = useSelector(state => state.user)
    const formRef = useRef()

    let submit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Confirmas la nueva Bebida?",
            text: "Podrás editarla luego en el panel de administrador.",
            icon: "warning",
            showCloseButton: true,
            showConfirmButton: true,
            showDenyButton: true,
        })
        .then((result) => {
            if (result.isConfirmed) {
                    const formData = new FormData(formRef.current)
                    const values = Object.fromEntries(formData)
                    let newDrink = {
                        name: values.name,
                        description: values.description,
                        price: values.price,
                    }
                    let headers = {headers: {'Authorization': `Bearer ${token}`}}
                    axios.post(`${BASE_URL}/api/drink`, newDrink, headers)
                        .then(res => {
                            if(res.data.success){
                                let id = res.data.data
                                Swal.fire({
                                    title: "Creado con éxito!",
                                    text: res.data.message,
                                    icon: "success"
                                })
                                navigate(`/drinks/${id}`)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            if(err.response.data.message){
                                Swal.fire({
                                    title: "error",
                                    html: `<span>${err.response.data.message.join('<br>')}</span>`,
                                    icon: "error"
                                })
                            } else if(err.response.data){
                                Swal.fire({
                                    title: "error",
                                    text: err.response.data,
                                    icon: "error"
                                })
                            } else{
                                Swal.fire({
                                    title: "error",
                                    text: err.message,
                                    icon: "error"
                                })
                            }
                        })
            } else {
                Swal.fire("Form not sent!");
            }
        })
    }

  return (
    <div className='container'>
        <h1 className='text-center'>Nueva Bebida</h1>
        <form ref={formRef} className='d-flex flex-column p-1' onSubmit={submit}>
            <label className='d-flex flex-column fs-6 m-1'>Nombre: 
                <input className='ms-1' type="text" name="name" required/>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>Description: 
                <textarea className='ms-1 w-100' name="description" rows="10" required></textarea>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>Precio 
                <input className='ms-1' type="number" name="price" required/>
            </label>
            <div className='d-flex justify-content-evenly align-items-center'>
                <input className='btn btn-outline-danger' type="reset" value={'Reiniciar'}/>
                <input className='btn btn-outline-success' type="submit" value={'Enviar'}/>
            </div>
        </form>
    </div>
  )
}

export default NewDrinks