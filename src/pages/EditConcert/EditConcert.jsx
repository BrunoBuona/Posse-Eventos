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
  useEffect(() => {
    const getConcert = () => axios.get(`${BASE_URL}/api/concerts/${id}`);
    const getVenues = () => axios.get(`${BASE_URL}/api/venues`);
    const getArtists = () => axios.get(`${BASE_URL}/api/artists`);
    Promise.all([getConcert(), getVenues(), getArtists()])
      .then(results => {
        let [concertRes, venuesRes, artistsRes] = results;
        let { date, venue, artists } = concertRes.data.response;
        const offset = new Date(concertRes.data.response.date).getTimezoneOffset();
        date = new Date(concertRes.data.response.date).getTime() - offset * 1000 * 60;
        concertRes.data.response.date = new Date(date).toISOString().slice(0, 16);
        concertRes.data.response.venue = venue._id;
        concertRes.data.response.artists = artists.map(artist => artist._id);
        setConcert(concertRes.data.response);
        setVenues(venuesRes.data.response);
        setArtists(artistsRes.data.data);
        setLoading(false);
        setSuccess(true);
      })
      .catch(error => {
        setLoading(false);
        setSuccess(false);
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
      let res = await axios.patch(`${BASE_URL}/api/concerts/${id}`, values, headers);
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

  return (
    <div>
      <h1>Edit Concert</h1>
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
                <label htmlFor="name">Name:</label>
                <Field name="name" placeholder="Name" value={values.name} />
              </div>
              <div>
                <label htmlFor="photo">Photo:</label>
                <Field name="photo" placeholder="Photo" value={values.photo} />
              </div>
              <div>
                <label htmlFor="banner">Banner:</label>
                <Field name="banner" placeholder="Banner" value={values.banner} />
              </div>
              <div>
                <label htmlFor="date">Date:</label>
                <Field name="date" type="datetime-local" value={values.date} />
              </div>
              <div>
                <label htmlFor="type">Type:</label>
                <br />
                <Field as="select" name="type" value={values.type}>
                  <option value="">-- Select Type --</option>
                  <option value="concert">Concert</option>
                  <option value="festival">Festival</option>
                </Field>
              </div>

              <div>
                <label htmlFor="venue">Venue:</label>
                <br />
                <Field as="select" name="venue" value={values.venue}>
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
                          <Field as="select" name={`artists.${index}`} value={artistValue}>
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
                  <Field name="category.name" id="categoryName" type="text" value={values.category.name} />
                </div>
                <div>
                  <label htmlFor="categoryPrice">Category Price:</label>
                  <Field name="category.price" id="categoryPrice" type="number" value={values.category.price} />
                </div>
                <div>
                  <label htmlFor="categoryArea">Category Area:</label>
                  <Field name="category.area" id="categoryArea" type="text" value={values.category.area} />
                </div>
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <Field as="textarea" name="description" value={values.description} />
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
