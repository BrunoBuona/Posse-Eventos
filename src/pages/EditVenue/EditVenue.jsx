import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button, Spinner } from "react-bootstrap";
import { BASE_URL } from "../../api/url";
import axios from "axios";
import "./EditVenue.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

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

  return (
    <div>
      <h1>Edit Venue</h1>
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
                <label htmlFor="name">Name:</label>
                <Field name="name" placeholder="Name" value={values.name} />
              </div>
              <div>
                <label htmlFor="address">Address:</label>
                <Field name="address" placeholder="Address" value={values.address} />
              </div>
              <div>
                <label htmlFor="capacity">Capacity:</label>
                <Field name="capacity" placeholder="Capacity" type="number" value={values.capacity} />
              </div>
              <div>
                <label htmlFor="type">Type:</label>
                <Field name="type" placeholder="Type" value={values.type} />
              </div>
              <div>
                <label htmlFor="country">Country:</label>
                <Field name="country" placeholder="Country" value={values.country} />
              </div>
              <div>
                <label htmlFor="city">City:</label>
                <Field name="city" placeholder="city" value={values.city} />
              </div>
              <Button type="submit" variant="success">
                Edit
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
