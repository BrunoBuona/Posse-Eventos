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
  const { getDrinks, deleteDrink } = drinksActions;
  let { token } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getDrinks());
  }, []);

  let removeDrink = (id, name) => {
    Swal.fire({
      title: "¿Eliminar Bebida?",
      text: "Esta acción es permanente.",
      icon: "warning",
      showCloseButton: false,
      showConfirmButton: true,
      showDenyButton: true,
    })
      .then(result => {
        if (result.isConfirmed) {
          dispatch(deleteDrink({ id, token }))
            .then(res => {
              Swal.fire({
                title: "Success",
                text: res.payload.message,
                icon: "success"
              });
            })
            .catch(err => {
              Swal.fire({
                title: "Error",
                text: err.message,
                icon: "error",
              });
            });
        }
      });
  };

  return (
    <div>
      <Link to="/admin/drinks/new">
        <Button variant="success" className="mb-4">Nueva Bebida</Button>
      </Link>
      <AdminTable title="Bebidas" collection={drinks} editRoute="/admin/drink/edit/" deleteOnClick={removeDrink} />
    </div>
  );
}