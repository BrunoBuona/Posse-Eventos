import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import drinksActions from '../../redux/actions/drinkactions';
import AdminTable from '../../utils/AdminTable/AdminTable';
import "./AdminDrinks.css";

export default function AdminDrinks() {
  const drinks = useSelector(state => state.drinksReducer.drinks); // Acceder a la lista de bebidas dentro del estado
  const dispatch = useDispatch();
  const { getDrinks, deleteDrinks } = drinksActions;
  let { token } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getDrinks());
  }, []);

  let removeDrink = (id, name) => {
    Swal.fire({
          title: "¿Eliminar Bebida?",
          text: "Una vez eliminada. No podrás deshacer esta acción",
          icon: "warning",
          showCloseButton: true,
          showConfirmButton: true,
          showDenyButton: true,
    })
    .then(result => {
      if(result.isConfirmed){
        dispatch(deleteDrinks({id, token}))
          .then(res => {
            Swal.fire({
              title: "Operación completada.",
              text: "Bebida eliminada exitosamente.",
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
      <Link to="/admin/drinks/new">
        <Button variant="success" className="mb-4">Nueva Bebida</Button>
      </Link>
      <AdminTable title="Bebidas" collection={drinks} editRoute="/admin/drinks/edit/" deleteOnClick={removeDrink} />
    </div>
  );
}