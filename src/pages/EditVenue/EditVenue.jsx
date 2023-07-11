import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Spinner } from "react-bootstrap";
import { BASE_URL } from "../../api/url";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useRef } from "react";

export default function EditVenue() {
  const { id } = useParams();
  const { token } = useSelector(store => store.user);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/venues/${id}`)
      .then(res => {
        setVenue(res.data.response);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setMessage(error.response ? error.response.data.message || error.response.data : error.message);
      });
  }, [id]);

  const sendData = async values => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.patch(`${BASE_URL}/api/venues/${id}`, values, headers);
      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
      navigate("/admin/venues");
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error.response.data.message)) {
          Swal.fire({
            title: "error",
            text: error.response.data.message.join("<br/>"),
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

  const pasteClipboardContent = () => {
    navigator.clipboard.readText().then((text) => {
      inputRef.current.value = text;
    });
  };
  return (
    <div>
      <h1>Editar Localización</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner className="text-center" />
        </div>
      ) : !!venue ? (
        <Formik
          initialValues={venue}
          onSubmit={(values, { resetForm }) => {
            sendData(values, resetForm);
          }}
        >
          {({ values }) => (
            <Form>
              <div>
                <label htmlFor="name">Nombre de la Localización:</label>
                <Field name="name" placeholder="Rancho de la V" value={values.name} />
              </div>
              <div>
                <label htmlFor="address">Dirección de la Localización:</label>
                <Field name="address" placeholder="KM 11 - 22" value={values.address} />
              </div>
              <div>
              <label htmlFor="urlLocation">URL de la Dirección:</label>
              <input name="urlLocation" placeholder="Lo que esta entre comillas en href=''" value={values.urlLocation} />
              <button onClick={pasteClipboardContent}>Pegar</button>
            </div>
              <div>
                <label htmlFor="capacity">Capacidad de la Localización:</label>
                <Field name="capacity" placeholder="258" type="number" value={values.capacity} />
              </div>
              <div>
                <label htmlFor="type">Tipo de Localización:</label>
                <Field name="type" placeholder="Campo, Club Techno, etc" value={values.type} />
              </div>
              <div>
                <label htmlFor="country">Pais de la Localización:</label>
                <Field name="country" placeholder="Pais" value={values.country} />
              </div>
              <div>
                <label htmlFor="city">Ciudad de la Localización:</label>
                <Field name="city" placeholder="Ciudad" value={values.city} />
              </div>
              <Button type="submit" variant="success">
                Enviar modificación
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
