import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import "./AdminTable.css"

export default function AdminTable({ editRoute, deleteOnClick, title, collection = [] }) {
  return (
    <Table striped bordered responsive="md">
      <thead>
        <tr className="bg-main">
          <th className="fs-4 text-white">{title}</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {collection.map(document => {
          return (
            <tr key={document._id}>
              <td>{document.name}</td>
              <td className="AdminTable-buttonContainer">
                <Button
                  variant="danger"
                  className="MyCollection-deleteButton"
                  onClick={() => deleteOnClick(document._id, document.name)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
              <td className="AdminTable-buttonContainer">
                <Link to={editRoute + document._id}>
                  <Button className="MyCollection-editButton">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
