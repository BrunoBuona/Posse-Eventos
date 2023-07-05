import React, { useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ConcertCard from "../../components/Concerts/ConcertCard/ConcertCard";
import concertsActions from "../../redux/actions/concertsActions";
import Search from "../../utils/search/Search";
import "./Concerts.css";
import { useTranslation } from "react-i18next";

export default function Concerts() {
    const dispatch = useDispatch();
    const { getInitialData, getQuery } = concertsActions;
    const { concerts, name,type, initial, loading, message } = useSelector(store => store.concerts);
    const {t} = useTranslation()

  useState(() => {
    if (initial) {
      dispatch(getInitialData());
    }
  }, []);

const onSearch = e => {
    let query = { params: { name: e.target.value, type } };
    dispatch(getQuery({ query }));
  };

  const changeType = e => {
    let query = { params: { name, type: e.target.value } };
    dispatch(getQuery({ query }));
  };
  return (
    <>
      <div className="pt-4 container">
        <h1 className="text-center">Eventos</h1>
        <div className="d-flex justify-content-between flex-wrap-reverse mb-5">
          <div>
            <select className="Concerts-select border me-5" defaultValue={type} onChange={changeType}>
              <option value="">— Todos los Tipos —</option>
              <option value="Previa">Previa</option>
              <option value="Evento">Evento</option>
              <option value="After">After</option>
            </select>
          </div>

          <div className="mb-4 d-flex justify-content-end">
            <Search placeholder={t('search_c')} onChange={onSearch} defaultValue={name} />
          </div>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner className="text-center" />
          </div>
        ) : concerts?.length > 0 ? (
          <Row xs={1} md={2} xl={3}>
            {concerts?.map(concert => (
              <Col key={concert._id} className="mb-5">
                <ConcertCard concert={concert} />
              </Col>
            ))}
          </Row>
        ) : (
          <h2 className="text-center text-main">No se encontraron resultados</h2>
        )}
      </div>
    </>
  );
}
