import React from "react";
import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../../api/url";
import axios from "axios";
import "./NewVenue.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useRef } from "react";
const initialValues = {
  name: "",
  address: "",
  capacity: 0,
  type: "",
  country: "",
  city: "",
  urlLocation: "",
};

export default function NewVenue() {
  const { token } = useSelector(store => store.user);

  const sendData = async (values, resetForm) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.post(`${BASE_URL}/api/venues`, values, headers);
      Swal.fire({
        title: "Localización Creada",
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

  const inputRef = useRef(null);

  const pasteClipboardContent = (event) => {
    event.preventDefault();
    navigator.clipboard.readText().then((text) => {
      inputRef.current.value = text;
    });
  };
  
  return (
    <div>
      <h1>Nueva Localización</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          sendData(values, resetForm);
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <label htmlFor="name">Nombre:</label>
              <Field name="name" placeholder="Ranchito de la V" />
            </div>
            <div>
              <label htmlFor="address">Dirección:</label>
              <Field name="address" placeholder="Ruta 11 - KM 2" />
            </div>
            <div>
              <label htmlFor="urlLocation">URL de Dirección:</label>
              <input type="text" id="urlLocation" placeholder="Lo que esta entre comillas en href=''" ref={inputRef} />
              <button  type="button"  onClick={pasteClipboardContent}>Pegar</button>
            </div>
            <div>
              <label htmlFor="capacity">Capacidad del Lugar:</label>
              <Field name="capacity" placeholder="280" type="number" />
            </div>
            <div>
              <label htmlFor="type">Tipo de Lugar:</label>
              <Field name="type" placeholder="Campo, Club Techno, etc." />
            </div>
            <div>
              <label htmlFor="country">Pais:</label>
              <Field name="country" placeholder="Argentina" />
            </div>
            <div>
              <label htmlFor="city">Ciudad:</label>
              <Field name="city" placeholder="Pinamar" />
            </div>
            <Button type="submit" variant="success">
              Crear Localización
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
