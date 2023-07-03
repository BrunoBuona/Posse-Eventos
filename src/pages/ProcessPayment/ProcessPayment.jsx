import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../api/url";

export default function ProcessPayment() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState(false);
  const [searchParams] = useSearchParams();
  const { token } = useSelector(store => store.user);

  useEffect(() => {
    processPayment(); //eslint-disable-next-line
  }, []);

  const processPayment = async () => {
    let payment_id = searchParams.get("payment_id");
    let status = searchParams.get("status");
    if (payment_id && status === "approved") {
      try {
        let headers = {
          headers: {
            Authorization: `Bearer ${
              'TEST-605692797055000-062809-8d89f1aa1278d8f90f6cc4f52f171c18-116244102'
            }`,
          },
        };
        let resPayment = await axios.get(`https://api.mercadopago.com/v1/payments/${payment_id}`, headers);
        if (resPayment.data.status === "approved") {
          console.log(resPayment);
          let userHeaders = { headers: { Authorization: `Bearer ${token}` } };
          let res = await axios.post(
            `${BASE_URL}/api/orders/`,
            {
              payment_id,
              status: resPayment.data.status,
              date: resPayment.data.date_approved,
              orderId: resPayment.data.order.id,
              transaction_amount: resPayment.data.transaction_amount,
            },
            userHeaders
          );
          setMessage("Tu pago fue aprobado. ¡Gracias por tu compra!");
          setMessage2(true)
        } else {
          console.log("not approved");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage("Hubo un error al procesar el pago. Contacta a un administrador.");
        setMessage2(false)
      }
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <>
        <h1 className="text-center mt-5 ">Estamos procesando tu pago...</h1>
          <div className="d-flex justify-content-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" alt="Loading" />
          </div>
        </>
      ) : (
        <div className="mt-5">
          {message2 ? (
            <>
              <div className="d-flex justify-content-center" style={{flexDirection:"column", justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
              <img style={{width:'100px'}} className="mb-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Check_green_circle.svg/2048px-Check_green_circle.svg.png" alt="" />
              <h3 className="text-center">{message}</h3>
              </div>
            </>
            ) : (
              <>
              <div className="d-flex justify-content-center" style={{flexDirection:"column", justifyContent:'center',alignItems:'center',marginTop:'20px'}}>
              <img style={{width:'100px'}} className="mb-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eo_circle_red_letter-x.svg/2048px-Eo_circle_red_letter-x.svg.png" alt="" />
              <h3 className="text-center">{message}</h3>
              </div>
              </>)}
        </div>
      )}
    </div>
  );
}
