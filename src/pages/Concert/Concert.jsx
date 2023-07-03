import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { faCartShopping, faCalendar, faMapSigns, faMusic } from "@fortawesome/free-solid-svg-icons";
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

            <div className="d-flex flex-column flex-lg-row justify-content-between">
              <div className="d-flex gap-2 align-items-center flex-wrap">
                <h4 className="text-main fw-bold">{concert.type === "festival" ? "Lineup:" : t("art") + ":"}</h4>
                {concert.artists.map(artist => (
                  <Link to={`/artists/${artist._id}`} key={artist._id} className="fs-6 mb-0">
                    <FontAwesomeIcon icon={faMusic} /> {artist.name}
                  </Link>
                ))}
              </div>
              <Button className="mt-2" variant="outline-danger" onClick={() => navigate("/concerts")}>
                Go back to Concerts
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
          </div>
        </div>
      </div>
    </>
  ) : (
    <h2 className="text-center text-main mt-5">{message}</h2>
  );
}
