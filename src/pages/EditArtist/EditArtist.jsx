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
    let [photo, setPhoto] = useState('')
    let [checked, setChecked] = useState([])
    let [description, setDescription] = useState('')
    let [youtubeVideo, setYoutubeVideo] = useState('')
    let [youtubeChannel, setYoutubeChannel] = useState('')
    let [spotifyPlaylist, setSpotifyPlaylist] = useState('')
    const genres = ['Ambient', 'Blues', 'Country', 'Electronic', 'Funk', 'Hip-hop', 'Jazz', 'Latin', 'Metal', 'Pop', 'Punk', 'R&B and Soul', 'Rap', 'Reggae', 'Reggaeton', 'Rock', 'Ska', 'Trap']

    useEffect(() => {
        axios.get(`${BASE_URL}/api/artists/${id}`)
        .then(res => {
            let {name, photo, genre, description, youtubeVideo, youtubeChannel, spotifyPlaylist} = res.data.data
            setName(name)
            setPhoto(photo)
            setChecked(genre)
            setDescription(description)
            setYoutubeVideo(youtubeVideo)
            setYoutubeChannel(youtubeChannel)
            setSpotifyPlaylist(spotifyPlaylist)
        })
        .catch(err => console.log(err.message))//eslint-disable-next-line
    }, [])

    let submit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Edit artist?",
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
                    axios.patch(`${BASE_URL}/api/artists/${id}`, newArtist, headers)
                        .then(res => {
                            if(res.data.success){
                                Swal.fire({
                                    title: "Success",
                                    text: res.data.message,
                                    icon: "success"
                                })
                                navigate(`/artists/${id}`)
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
        <h1 className='text-center'>Edit Artist</h1>
        <form ref={formRef} className='d-flex flex-column p-1' onSubmit={submit}>
            <label className='d-flex flex-column fs-6 m-1'>Name: 
                <input className='ms-1' type="text" name="name" onChange={(e) => setName(e.target.value)
    } value={name} required/>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>Photo url: 
                <input className='ms-1' type="url" name="photo" onChange={(e) => setPhoto(e.target.value)} value={photo} required/>
            </label>
            <fieldset>
                <legend className='fs-6'>Genres:</legend>
                <div className='d-flex align-items-center justify-content-center flex-wrap gap-3'>
                    {genres.map(el => 
                    <label key={el} className='m-1'>
                        <input className='me-1' type="checkbox" checked={checked.includes(el)} onChange={checkHandler} value={el}/>{el}
                    </label>)}
                </div>
            </fieldset>
            <label className='d-flex flex-column fs-6 m-1'>Description: 
                <textarea className='ms-1 w-100' name="description" rows="10" onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>YouTube Video: 
                <input className='ms-1' type="url" name="youtubeVideo" onChange={(e) => setYoutubeVideo(e.target.value)} value={youtubeVideo}/>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>YouTube Channel: 
                <input className='ms-1' type="url" name="youtubeChannel" onChange={(e) => setYoutubeChannel(e.target.value)} value={youtubeChannel}/>
            </label>
            <label className='d-flex flex-column fs-6 m-1'>Spotify playlist: 
                <input className='ms-1' type="url" name="spotifyPlaylist" onChange={(e) => setSpotifyPlaylist(e.target.value)} value={spotifyPlaylist}/>
            </label>
            <div className='d-flex justify-content-evenly align-items-center'>
                <input className='btn btn-outline-danger' type="reset" value={'Clear'}/>
                <input className='btn btn-outline-success' type="submit" value={'Submit'}/>
            </div>
        </form>
    </div>
  )
}

export default EditArtist