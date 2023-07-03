import axios from 'axios'
import React, {useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../api/url'
import Swal from'sweetalert2'
import { useNavigate } from 'react-router-dom'

const NewArtist = () => {

    let navigate = useNavigate()
    let {token} = useSelector(state => state.user)
    const formRef = useRef()
    let [checked, setChecked] = useState([])
    const genres = ['Ambient', 'Blues', 'Country', 'Electronic', 'Funk', 'Hip-hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'R&B and Soul', 'Rap', 'Reggae', 'Reggaeton', 'Rock', 'Ska', 'Trap']

    let submit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Confirm new Artist?",
            text: "you can edit or remove the artist later from the admin panel",
            icon: "warning",
            showCloseButton: true,
            showConfirmButton: true,
            showDenyButton: true,
        })
        .then((result) => {
            if (result.isConfirmed) {
                    const formData = new FormData(formRef.current)
                    const values = Object.fromEntries(formData)
                    let newArtist = {
                        name: values.name,
                        photo: values.photo,
                        genre: checked,
                        description: values.description,
                        youtubeVideo: values.youtubeVideo,
                        youtubeChannel: values.youtubeChannel,
                        spotifyPlaylist: values.spotifyPlaylist
                    }
                    let headers = {headers: {'Authorization': `Bearer ${token}`}}
                    axios.post(`${BASE_URL}/api/artists`, newArtist, headers)
                        .then(res => {
                            if(res.data.success){
                                let id = res.data.data
                                Swal.fire({
                                    title: "Success",
                                    text: res.data.message,
                                    icon: "success"
                                })
                                navigate(`/artists/${id}`)
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

    let checkHandler = (e) => {
        let auxArray = [...checked]
        if(e.target.checked){
            auxArray.push(e.target.value)
        } else{
            auxArray = auxArray.filter(el => el !== e.target.value)
        }
        setChecked(auxArray)
    }

  return (
    <div className='container'>
        <h1 className='text-center'>New Artist</h1>
        <form ref={formRef} className='d-flex flex-column p-1' onSubmit={submit}>
            <label className='d-flex flex-column fs-6 m-1'>Name: 
                <input className='ms-1' type="text" name="name" required/>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>Photo url: 
                <input className='ms-1' type="url" name="photo" required/>
            </label>
            <fieldset>
                <legend className='fs-6'>Genres:</legend>
                <div className='d-flex align-items-center justify-content-center flex-wrap gap-3'>
                    {genres.map(el => 
                    <label key={el} className='m-1'>
                        <input className='me-1' type="checkbox" onChange={checkHandler} value={el}/>{el}
                    </label>)}
                </div>
            </fieldset>
            <label className='d-flex flex-column fs-6 m-1'>Description: 
                <textarea className='ms-1 w-100' name="description" rows="10" required></textarea>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>YouTube Video: 
                <input className='ms-1' type="url" name="youtubeVideo"/>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>YouTube Channel: 
                <input className='ms-1' type="url" name="youtubeChannel"/>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>Spotify playlist: 
                <input className='ms-1' type="url" name="spotifyPlaylist"/>
            </label>
            <div className='d-flex justify-content-evenly align-items-center'>
                <input className='btn btn-outline-danger' type="reset" value={'Clear'}/>
                <input className='btn btn-outline-success' type="submit" value={'Submit'}/>
            </div>
        </form>
    </div>
  )
}

export default NewArtist