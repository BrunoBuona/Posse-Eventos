import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../api/url';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

/*Styles*/
import "./AdminValidations.css";

export default function AdminValidations() {
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [table, setTable] = useState("no-redeemed-table")
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    axios.get(`${BASE_URL}/api/tickets`)
      .then(res => {
        setData(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch(err => {
        setMessage(err.response.data.message);
        setError(true);
      });
  }, []);

  useEffect(() => {
    filterData();
  }, [searchText]);

  const filterData = () => {
    if (searchText.trim() === "") {
      setFilteredData(data);
    } else {
      const filteredData = data.filter(item =>
        item.serialNumber.includes(searchText)
      );
      setFilteredData(filteredData);
    }
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  return (
    isError ? (
      <div>{message}</div>
    ) : table == "no-redeemed-table" ? (
      <>
        <div className='btn-cover'>
          <button className='btn-up-table' onClick={() => setTable("redeemed-table")}>Ver Tickets Reclamados</button>
          <h1>Tickets Pendientes</h1>
          <input
            className='search-up-table'
            placeholder='Buscar por N° Ticket'
            type="text"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <table className="table2">
          <thead className="thead2">
            <tr className="tr2">
              <th className="td2">N° de Ticket</th>
              <th className="td2">Nombre y Apellido</th>
              <th className='td2'>DNI</th>
              <th className='td2'>Evento</th>
              <th className='td2'>Fecha de Compra</th>
              <th className='td2'>¿Reclamado?</th>
              <th className='td2'>Validar Ticket</th>
            </tr>
          </thead>
          {filteredData.map((item) => (
            item.redeemed ? null :
              <tbody key={item.serialNumber}>
                <tr className="tr2">
                  <td className="td2">{item.serialNumber}</td>
                  <td className="td2">{item.userId.name + " " + item.userId.lastName}</td>
                  <td className="td2">{item.userId.dni}</td>
                  <td className="td2">{item.concertId.name}</td>
                  <td className="td2">{moment(item.purchaseDate).utcOffset('-03:00').format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td className="td2">NO</td>
                  <td className="td2"><button className='table-btn'>🗹</button></td>
                </tr>
              </tbody>
          ))}
        </table>
      </>
    ) : (
      <>
        <div className='btn-cover'>
          <button className='btn-up-table' onClick={() => setTable("no-redeemed-table")}>Ver Tickets Pendientes</button>
          <h1>Tickets Reclamados</h1>
          <input
            className='search-up-table'
            placeholder='Buscar por N° Ticket'
            type="text"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <table className="table2">
          <thead className="thead2">
            <tr className="tr2">
              <th className="td2">N° de Ticket</th>
              <th className="td2">Nombre y Apellido</th>
              <th className='td2'>DNI</th>
              <th className='td2'>Evento</th>
              <th className='td2'>Fecha de Compra</th>
              <th className='td2'>¿Reclamado?</th>
            </tr>
          </thead>
          {filteredData.map((item) => (
            !item.redeemed ? null :
              <tbody key={item.serialNumber}>
                <tr className="tr2">
                  <td className="td2">{item.serialNumber}</td>
                  <td className="td2">{item.userId.name + " " + item.userId.lastName}</td>
                  <td className="td2">{item.userId.dni}</td>
                  <td className="td2">{item.concertId.name}</td>
                  <td className="td2">{moment(item.purchaseDate).utcOffset('-03:00').format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td className="td2">SI</td>
                </tr>
              </tbody>
          ))}
        </table>
      </>
    )
  )
}