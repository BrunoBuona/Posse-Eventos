import React from "react";

export default function Product(props) {
  let { item } = props;

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
        1
      </td>
      <td className="text-center" style={{ width: "200px" }}>
        {(item.price * item.quantity).toLocaleString()}
      </td>
    </tr>
  );
}
