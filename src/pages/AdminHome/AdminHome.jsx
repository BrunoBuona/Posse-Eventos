import React from "react";
import './AdminHome.css'

export default function AdminHome() {
  return (
    <div>
      <h1>Bienvenida al panel de Administración.</h1>
      <table className="table2">
        <thead className="thead2">
          <tr className="tr2">
            <th className="td2">Sección</th>
            <th className="td2">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tr2">
            <td className="td2">Inicio</td>
            <td className="td2">
              En esta sección podrás ver la información sobre el panel de administración.
            </td>
          </tr>
          <tr className="tr2">
            <td className="td2">Eventos</td>
            <td className="td2">
              En esta sección podrás ver, crear, editar y eliminar eventos.
            </td>
          </tr>
          <tr className="tr2">
            <td className="td2">Artistas</td>
            <td className="td2">
              En esta sección podrás ver, crear, editar y eliminar artistas.
            </td>
          </tr>
          <tr className="tr2">
            <td className="td2">Bebidas</td>
            <td className="td2">
              En esta sección podrás ver, crear, editar y eliminar bebidas.
            </td>
          </tr>
          <tr className="tr2">
            <td className="td2">Localizaciones</td>
            <td className="td2">
              En esta sección podrás ver, crear, editar y eliminar
              localizaciones.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
