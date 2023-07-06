import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { faCartShopping, faCalendar, faMapSigns, faMusic, faGlassMartini } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "../../api/url";
import "./Concert.css";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import cartActions from "../../redux/actions/cartActions";

export default function Concert() {
  const { id } = useParams();
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { online, token } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cart } = useSelector(store => store.cart);
  const dispatch = useDispatch();
  const { addToCart: addToCartAction } = cartActions;

  useEffect(() => {
    getData(id);
    // eslint-disable-next-line
  }, []);

  const getData = async concertId => {
    try {
      const res = await axios.get(`${BASE_URL}/api/concerts/${concertId}`);
      setConcert(res.data.response);
    } catch (error) {
      setMessage(error.response ? error.response.data.message || error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(concert)
  const addToCart = async data => {
    if (online) {
      let headers = { headers: { Authorization: `Bearer ${token}` } };
      let body = { concertId: data._id, quantity: 1 };
      let res = await dispatch(addToCartAction({ body, headers })).unwrap();
      if (!res.success) {
        Swal.fire({
          title: "Error",
          text: res.message,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: t("alert_redir_log"),
        text: t("alert_ticket_cart"),
        icon: "warning",
        showCloseButton: true,
        showConfirmButton: true,
        showDenyButton: true,
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/signin");
        }
      });
    }
  };

  return loading ? (
    <div className="d-flex justify-content-center">
      <Spinner className="text-center mt-5" />
    </div>
  ) : !!concert ? (
    <>
      <div className="w-100 pb-4">
        <div className="Concert-banner" style={{ backgroundImage: `url(${concert.banner})` }}>
          <h2 className="text-light text-detail text-center text-capitalize">{concert.name}</h2>
        </div>
        <div className="row ps-5 pe-5 pt-5 pb-5 w-100">
          <div className="col-md col-lg-8 pe-5 d-flex flex-column gap-4 pb-5">
            <p className="Concert-description">{`${concert.description}`}</p>
            <div className="align-items-center">
              <p className="text-capitalize text-black mb-2">
                <FontAwesomeIcon icon={faMapSigns} /> {concert.venue.name} {concert.venue.address}, {concert.venue.city}
                , {concert.venue.country}
              </p>
              <p className="text-black">
                <FontAwesomeIcon icon={faCalendar} /> {concert.date.split("T")[0]}{" "}
                {concert.date.split("T")[1].slice(0, 8)} hrs.
              </p>
            </div>

            <div className="d-flex flex-column flex-lg-column justify-content-between">
              <div className="d-flex gap-2 align-items-center flex-wrap">
                <h4 className="text-main fw-bold">Artistas:</h4>
                {concert.artists.map(artist => (
                  <Link to={`/artists/${artist._id}`} key={artist._id} style={{ color: 'black', marginBottom: '0px' }} className="fs-6 mb-0">
                    <FontAwesomeIcon icon={faMusic} /> {artist.name}
                  </Link>
                ))}
              </div>
              <div className="d-flex gap-2 align-items-center flex-wrap">
                <h4 className="text-main fw-bold">Bebidas:</h4>
                {concert?.drinks?.map(drinks => (
                  <p style={{ color: 'black', marginBottom: '0px' }}> <FontAwesomeIcon icon={faGlassMartini} /> {drinks} </p>
                ))}
              </div>

              <Button className="mt-2" style={{ width: '40%' }} variant="outline-danger" onClick={() => navigate("/concerts")}>
                Volver a Eventos
              </Button>
            </div>
          </div>
          <div className="col-md col-lg-4">
            <div className="border mb-3 p-2">
              <h3 className="text-center text-main fw-bold">{t("ticket")}</h3>
              <div className="d-flex justify-content-between">
                <p className="text-decoration-underline">{concert.category.name}</p>
                <p className="fw-semibold">${concert.category.price.toLocaleString()} ARS</p>
              </div>
              <Button
                variant="main"
                onClick={() => addToCart(concert)}
                disabled={cart?.items.some(
                  product => product.categoryName === concert.category.name && product.concertId === concert._id
                )}
              >
                <FontAwesomeIcon icon={faCartShopping} />{" "}
                {cart?.items.some(
                  product => product.categoryName === concert.category.name && product.concertId === concert._id
                )
                  ? t("added")
                  : t("add")}
              </Button>
            </div>
            <div className="d-flex gap-2 align-items-center flex-wrap">
              <iframe
                title="Google Map"
                width="100%"
                height="300"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.5997581272795!2d-56.9700542234357!3d-37.25720261050369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959b6060010c6253%3A0xc7fbbf619cb0030!2sP.%C2%BA%20104%20105%2C%20Villa%20Gesell%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1688602047411!5m2!1ses!2sar"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div >
    </>
  ) : (
    <h2 className="text-center text-main mt-5">{message}</h2>
  );
}
