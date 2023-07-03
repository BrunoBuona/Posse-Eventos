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

  useEffect(() => {
    const getVenues = () => axios.get(`${BASE_URL}/api/venues`);
    const getArtists = () => axios.get(`${BASE_URL}/api/artists`);
    Promise.all([getVenues(), getArtists()])
      .then(results => {
        let [venuesRes, artistsRes] = results;
        setVenues(venuesRes.data.response);
        setArtists(artistsRes.data.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setMessage(error.message);
      });
  }, []);

  const sendData = async (values, resetForm) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.post(`${BASE_URL}/api/concerts`, values, headers);
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

  return (
    <div>
      <h1>New Concert</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner className="text-center" />
        </div>
      ) : venues.length > 0 && artists.length > 0 ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            sendData(values, resetForm);
          }}
        >
          {({ values }) => (
            <Form>
              <div>
                <label htmlFor="name">Name:</label>
                <Field name="name" placeholder="Name" />
              </div>
              <div>
                <label htmlFor="photo">Photo:</label>
                <Field name="photo" placeholder="Photo" />
              </div>
              <div>
                <label htmlFor="banner">Banner:</label>
                <Field name="banner" placeholder="Banner" />
              </div>
              <div>
                <label htmlFor="date">Date:</label>
                <Field name="date" type="datetime-local" />
              </div>
              <div>
                <label htmlFor="type">Type:</label>
                <br />
                <Field as="select" name="type">
                  <option value="">-- Select Type --</option>
                  <option value="concert">Concert</option>
                  <option value="festival">Festival</option>
                </Field>
              </div>

              <div>
                <label htmlFor="venue">Venue:</label>
                <br />
                <Field as="select" name="venue">
                  <option value="">-- Select Venue --</option>
                  {venues.map(venue => (
                    <option key={venue._id} value={venue._id}>
                      {venue.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="ms-3">
                <FieldArray
                  name="artists"
                  render={arrayHelpers => (
                    <div>
                      <h3 className="fs-4 mt-2">Artists</h3>
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
                            <option value="">-- Select Artist --</option>
                            {artists.map(artist => (
                              <option key={artist._id} value={artist._id}>
                                {artist.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      ))}
                      <Button type="button" onClick={() => arrayHelpers.push("")}>
                        Add Artist
                      </Button>
                    </div>
                  )}
                />
              </div>

              <div className="ms-3">
                <h3 className="fs-4 mt-2">Category</h3>
                <div>
                  <label htmlFor="categoryName">Category Name:</label>
                  <Field name="category.name" id="categoryName" type="text" />
                </div>
                <div>
                  <label htmlFor="categoryPrice">Category Price:</label>
                  <Field name="category.price" id="categoryPrice" type="number" />
                </div>
                <div>
                  <label htmlFor="categoryArea">Category Area:</label>
                  <Field name="category.area" id="categoryArea" type="text" />
                </div>
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <Field as="textarea" name="description"></Field>
              </div>
              <Button type="submit" variant="success">
                Submit
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
