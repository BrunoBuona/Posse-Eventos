
import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import artistsActions from '../../redux/actions/artistsactions';
import AdminTable from '../../utils/AdminTable/AdminTable';
import "./AdminArtists.css";

export default function AdminArtists() {
  const {artists} = useSelector(state => state.artistsReducer)
  const dispatch = useDispatch()
  const {getArtists, deleteArtist} = artistsActions
  let {token} = useSelector(state => state.user)
  
  useEffect(() => {
    dispatch(getArtists()); //eslint-disable-next-line
  }, [])

  let removeArtist = (id, name) => {
      Swal.fire({
            title: "¿Eliminar artista?",
            text: "Una vez eliminado. No podrás deshacer esta acción",
            icon: "warning",
            showCloseButton: true,
            showConfirmButton: true,
            showDenyButton: true,
      })
      .then(result => {
        if(result.isConfirmed){
          dispatch(deleteArtist({id, token}))
            .then(res => {
              Swal.fire({
                title: "Operación completada.",
                text: "Artista eliminado exitosamente.",
                icon: "success"
              })
            })
            .catch(err => {
              Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error",
              })
            })
        }
      })
  }

  return (
    <div>
      <Link to="/admin/artists/new">
        <Button variant="success" className="mb-4">Nuevo Artista</Button>
      </Link>
      <AdminTable title="Artistas" collection={artists} editRoute="/admin/artists/edit/" deleteOnClick={removeArtist} />
    </div>
  )
}
