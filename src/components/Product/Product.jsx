import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import cartActions from "../../redux/actions/cartActions";

export default function Product(props) {
  let { token } = useSelector(store => store.user);
  let { item } = props;
  const dispatch = useDispatch();
  const { addToCart, removeFromCart } = cartActions;

  const add = async () => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    let body = { concertId: item.concertId, quantity: item.quantity + 1 };
    let res = await dispatch(addToCart({ body, headers })).unwrap();
    if (!res.success) {
      Swal.fire("Error", res.message, "error");
    }
  };

  const remove = async () => {
    let headers = { headers: { Authorization: `Bearer ${token}` } };
    if (item.quantity > 1) {
      let body = { concertId: item.concertId, quantity: item.quantity - 1 };
      let res = await dispatch(addToCart({ body, headers })).unwrap();
      if (!res.success) {
        Swal.fire(
          "Error",
          res.message,
          "error"
        );
      }
    } else {
      let confirmation = await Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to remove this item from the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirmation.isConfirmed) {
        let res = await dispatch(removeFromCart({ concertId: item.concertId, headers })).unwrap();
        if (res.success) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } else {
          Swal.fire("Error", res.message, "error");
        }
      }
    }
  };

  return (
    <tr className="align-middle">
      <td className="text-center" style={{ width: "200px" }}>
        <img src={item.photo} alt="concert" width="100px" />
      </td>
      <td className="text-center" style={{ width: "200px" }}>
        {item.concertName} - {item.categoryName}
      </td>
      <td className="text-center" style={{ width: "200px" }}>
        {item.price.toLocaleString()}
      </td>
      <td className="text-center" style={{ width: "200px" }}>
        <div className="d-flex align-items-center justify-content-center h-100">
          <button className="btn btn-primary mx-2 " onClick={remove}>
            -
          </button>
          {item.quantity}
          <button className="btn btn-primary mx-2" onClick={add}>
            +
          </button>
        </div>
      </td>
      <td className="text-center" style={{ width: "200px" }}>
        {(item.price * item.quantity).toLocaleString()}
      </td>
    </tr>
  );
}
