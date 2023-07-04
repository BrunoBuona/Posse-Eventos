import React from "react";
import './AdminHome.css'

export default function AdminHome() {
  return (
    <div>
      <h1>Bienvenida al panel de Administración.</h1>
      <table >
        <thead>
          <tr>
            <th>Sección</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inicio</td>
            <td>
              En esta sección podrás ver la información sobre el panel de administración.
            </td>
          </tr>
          <tr>
            <td>Eventos</td>
            <td>
              En esta sección podrás ver, crear, editar y eliminar eventos.
            </td>
          </tr>
          <tr>
            <td>Artistas</td>
            <td>
              En esta sección podrás ver, crear, editar y eliminar artistas.
            </td>
          </tr>
          <tr>
            <td>Bebidas</td>
            <td>
              En esta sección podrás ver, crear, editar y eliminar bebidas.
            </td>
          </tr>
          <tr>
            <td>Localizaciones</td>
            <td>
              En esta sección podrás ver, crear, editar y eliminar
              localizaciones.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
