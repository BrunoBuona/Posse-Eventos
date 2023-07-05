import React, { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import { Button, Spinner } from "react-bootstrap";
import { BASE_URL } from "../../api/url";
import axios from "axios";
import "./EditConcert.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function EditConcert() {
  const { id } = useParams();
  const { token } = useSelector(store => store.user);
  const [concert, setConcert] = useState(null);
  const [success, setSuccess] = useState(false);
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState([]);
  let [checked, setChecked] = useState([])
  useEffect(() => {
    const getConcert = () => axios.get(`${BASE_URL}/api/concerts/${id}`);
    const getVenues = () => axios.get(`${BASE_URL}/api/venues`);
    const getArtists = () => axios.get(`${BASE_URL}/api/artists`);
    const getDrinks = () => axios.get(`${BASE_URL}/api/drink`);
    Promise.all([getConcert(), getVenues(), getArtists(), getDrinks()])
      .then(results => {
        let [concertRes, venuesRes, artistsRes, drinksRes] = results;
        let { date, venue, artists } = concertRes.data.response;
        const offset = new Date(concertRes.data.response.date).getTimezoneOffset();
        date = new Date(concertRes.data.response.date).getTime() - offset * 1000 * 60;
        concertRes.data.response.date = new Date(date).toISOString().slice(0, 16);
        concertRes.data.response.venue = venue._id;
        concertRes.data.response.artists = artists.map(artist => artist._id);
        setConcert(concertRes.data.response);
        setVenues(venuesRes.data.response);
        setArtists(artistsRes.data.data);
        setDrinks(drinksRes.data.data);
        setLoading(false);
        setSuccess(true);
      })
      .catch(error => {
        setLoading(false);
        setSuccess(false);
        setMessage(error.response ? error.response.data.message || error.response.data : error.message);
      });
  }, [id]);

 
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
      let res = await axios.patch(`${BASE_URL}/api/concerts/${id}`, updatedValues, headers);
      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
      navigate("/admin/concerts");
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error.response.data.message)) {
          Swal.fire({
            title: "error",
            text: error.response.data.message.join("\n"),
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
      <h1>Editar Evento</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner className="text-center" />
        </div>
      ) : success ? (
        <Formik
          initialValues={concert}
          onSubmit={(values, { resetForm }) => {
            sendData(values, resetForm);
          }}
        >
          {({ values }) => (
            <Form>
              <div>
                <label htmlFor="name">Nombre:</label>
                <Field name="name" placeholder="Name" value={values.name} />
              </div>
              <div>
                <label htmlFor="photo">URL de Imagen de la Tarjeta:</label>
                <Field name="photo" placeholder="Photo" value={values.photo} />
              </div>
              <div>
                <label htmlFor="banner">URL de Banner para Detalles:</label>
                <Field name="banner" placeholder="Banner" value={values.banner} />
              </div>
              <div>
                <label htmlFor="date">Fecha:</label>
                <Field name="date" type="datetime-local" value={values.date} />
              </div>
              <div>
                <label htmlFor="type">Tipo:</label>
                <br />
                <Field as="select" name="type" value={values.type}>
                  <option value="">-- Seleccionar --</option>
                  <option value="Previa">Previa</option>
                  <option value="Evento">Evento</option>
                  <option value="After">After</option>
                </Field>
              </div>

              <div>
                <label htmlFor="venue">Localización:</label>
                <br />
                <Field as="select" name="venue" value={values.venue}>
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
                          <Field as="select" name={`artists.${index}`} value={artistValue}>
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
                  <Field name="category.name" id="categoryName" type="text" value={values.category.name} />
                </div>
                <div>
                  <label htmlFor="categoryPrice">Precio de la Entrada:</label>
                  <Field name="category.price" id="categoryPrice" type="number" value={values.category.price} />
                </div>
                <div>
                  <label htmlFor="categoryArea">Categoría de la Entrada:</label>
                  <Field name="category.area" id="categoryArea" type="text" value={values.category.area} />
                </div>
              </div>
              <div>
                <label htmlFor="description">Descripcion de la Entrada:</label>
                <Field as="textarea" name="description" value={values.description} />
              </div>
              <Button type="submit" variant="success">
                Enviar Modificación
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
