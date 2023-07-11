import React, { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { Button, Spinner } from "react-bootstrap";
import { BASE_URL } from "../../api/url";
import axios from "axios";
import "./NewConcert.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const initialValues = {
  name: "",
  photo: "",
  banner: "",
  artists: [""],
  venue: "",
  drinks: [""],
  date: "",
  type: "",
  description: "",
  category: {
    name: "",
    price: 0,
    area: "",
  },
};

export default function NewConcert() {
  const { token } = useSelector(store => store.user);
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [drinks, setDrinks] = useState([]);
  let [checked, setChecked] = useState([])
  useEffect(() => {
    const getVenues = () => axios.get(`${BASE_URL}/api/venues`);
    const getArtists = () => axios.get(`${BASE_URL}/api/artists`);
    const getDrinks = () => axios.get(`${BASE_URL}/api/drink`);
    Promise.all([getVenues(), getArtists(), getDrinks()])
      .then(results => {
        let [venuesRes, artistsRes, drinksRes] = results;
        setVenues(venuesRes.data.response);
        setArtists(artistsRes.data.data);
        setDrinks(drinksRes.data.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setMessage(error.message);
      });
  }, []);

  const sendData = async (values, resetForm) => {
    const selectedDrinks = Object.entries(checked)
    .filter(([_, isSelected]) => isSelected)
    .map(([drinkName]) => drinkName);

    const updatedValues = {
      ...values,
      drinks: selectedDrinks,
    };
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.post(`${BASE_URL}/api/concerts`, updatedValues, headers);
      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
      resetForm(initialValues);
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error.response.data.message)) {
          Swal.fire({
            title: "error",
            html: error.response.data.message.join("<br>"),
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "error",
            text: error.response.data.message || error.response.data,
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "error",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  let checkHandler = (e) => {
    const drinkName = e.target.value;
    setChecked((prevChecked) => ({
      ...prevChecked,
      [drinkName]: e.target.checked,
    }));
  };
  return (
    <div>
      <h1>Nuevo Evento</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner className="text-center" />
        </div>
      ) : venues.length > 0 && artists.length > 0 ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(updatedValues, { resetForm }) => {
            sendData(updatedValues, resetForm);
          }}
        >
          {({ values }) => (
            <Form>
              <div>
                <label htmlFor="name">Nombre:</label>
                <Field name="name" placeholder="Name" />
              </div>
              <div>
                <label htmlFor="photo">URL de Imagen de la Tarjeta:</label>
                <Field name="photo" placeholder="Photo" />
              </div>
              <div>
                <label htmlFor="banner">URL de Imagen para Detalles:</label>
                <Field name="banner" placeholder="Banner" />
              </div>
              <div>
                <label htmlFor="date">Fecha del Evento:</label>
                <Field name="date" type="date-time" />
              </div>
              <div>
                <label htmlFor="type">Tipo de Evento:</label>
                <br />
                <Field as="select" name="type">
                  <option value="">-- Seleccionar --</option>
                  <option value="Previa">Previa</option>
                  <option value="Evento">Evento</option>
                  <option value="After">After</option>
                </Field>
              </div>

              <div>
                <label htmlFor="venue">Localización:</label>
                <br />
                <Field as="select" name="venue">
                  <option value="">-- Seleccionar --</option>
                  {venues.map(venue => (
                    <option key={venue._id} value={venue._id}>
                      {venue.name}
                    </option>
                  ))}
                </Field>
              </div>
              <fieldset>
                <legend className='fs-6'>Bebidas:</legend>
                <div className='d-flex align-items-start justify-content-start flex-wrap gap-3'>
                  {drinks.map((el) => (
                    <label key={el.name} className='m-1'>
                      <input
                        className='me-1'
                        type='checkbox'
                        onChange={checkHandler}
                        value={el.name}
                        checked={checked[el.name] || false}
                      />
                      {el.name}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="ms-3">
                <FieldArray
                  name="artists"
                  render={arrayHelpers => (
                    <div>
                      <h3 className="fs-4 mt-2">Artistas</h3>
                      {values.artists.map((artistValue, index) => (
                        <div key={index} className="mb-4">
                          <Button
                            type="button"
                            className="me-2 px-2 py-0"
                            onClick={() => arrayHelpers.remove(index)}
                            variant="danger"
                          >
                            X
                          </Button>
                          <Field as="select" name={`artists.${index}`}>
                            <option value="">-- Seleccionar --</option>
                            {artists.map(artist => (
                              <option key={artist._id} value={artist._id}>
                                {artist.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      ))}
                      <Button type="button" onClick={() => arrayHelpers.push("")}>
                        Añadir otro artista
                      </Button>
                    </div>
                  )}
                />
              </div>

              <div className="ms-3">
                <h3 className="fs-4 mt-2">Venta de Entrada</h3>
                <div>
                  <label htmlFor="categoryName">Nombre de la Entrada:</label>
                  <Field name="category.name" id="categoryName" type="text" />
                </div>
                <div>
                  <label htmlFor="categoryPrice">Precio de la Entrada:</label>
                  <Field name="category.price" id="categoryPrice" type="number" />
                </div>
                <div>
                  <label htmlFor="categoryArea">Categoría de la Entrada:</label>
                  <Field name="category.area" id="categoryArea" type="text" />
                </div>
              </div>
              <div>
                <label htmlFor="description">Descripcion del Evento:</label>
                <Field as="textarea" name="description"></Field>
              </div>
              <Button type="submit" variant="success">
                Crear nuevo Evento
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <h2 className="text-center text-main">{message}</h2>
      )}
    </div>
  );
}
