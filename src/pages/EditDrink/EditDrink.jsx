import axios from 'axios'
import React, {useRef, useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../api/url'
import Swal from'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'


const EditArtist = () => {
    let {id} = useParams()
    let navigate = useNavigate()
    let {token} = useSelector(state => state.user)
    const formRef = useRef()
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [price, setPrice] = useState('')

    useEffect(() => {
        axios.get(`${BASE_URL}/api/drink/${id}`)
        .then(res => {
            let {name, description, price} = res.data.data
            setName(name)
            setDescription(description)
            setPrice(price)
        })
        .catch(err => console.log(err.message))//eslint-disable-next-line
    }, [])

    let submit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "¿Editar Bebida?",
            text: "Puedes volver a modificarla luego.",
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
                        price: values.price
                    }
                    let headers = {headers: {'Authorization': `Bearer ${token}`}}
                    axios.patch(`${BASE_URL}/api/drink/${id}`, newDrink, headers)
                        .then(res => {
                            if(res.data.success){
                                Swal.fire({
                                    title: "Success",
                                    text: res.data.message,
                                    icon: "success"
                                })
                                navigate(`/drinks/${id}`)
                            }
                        })
                        .catch(err => {
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
        <h1 className='text-center'>Editar Bebida</h1>
        <form ref={formRef} className='d-flex flex-column p-1' onSubmit={submit}>
            <label className='d-flex flex-column fs-6 m-1'>Nombre: 
                <input className='ms-1' type="text" name="name" onChange={(e) => setName(e.target.value)
    } value={name} required/>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>Descripcion: 
                <textarea className='ms-1 w-100' name="description" rows="10" onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>Price
                <input className='ms-1' type="number" name="price" onChange={(e) => setPrice(e.target.value)} value={price}/>
            </label>
            <div className='d-flex justify-content-evenly align-items-center'>
                <input className='btn btn-outline-danger' type="reset" value={'Limpiar'}/>
                <input className='btn btn-outline-success' type="submit" value={'Enviar'}/>
            </div>
        </form>
    </div>
  )
}

export default EditArtist