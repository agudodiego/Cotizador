import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Historial = () => {
  const navigate = useNavigate();
  const [historial, setHistorial] = useState([]);

  const borrarHistorial = () => {
    localStorage.clear();
    setHistorial([]);
  }

  const borrar = (index) => {
    historial.splice(index,1);
    localStorage.setItem("historialCotizaciones", JSON.stringify(historial));
    navigate('/historial');
  }

  useEffect(() => {
    const historialCotizaciones = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    setHistorial(historialCotizaciones);
  }, []);

  return (
    <>
      <h1 className="center separador">Ver Historial 📋</h1>

      <div className="center div-cotizador">
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {historial.length > 0 ?
              historial.map((cotizacion, index) => {
                return (
                  <tr key={index}>
                    <td>{cotizacion.fecha}</td>
                    <td>{cotizacion.propiedad}</td>
                    <td>{cotizacion.ubicacion}</td>
                    <td>{cotizacion.metros2}</td>
                    <td>{cotizacion.poliza.toFixed(2)}</td>
                    <td onClick={()=> borrar(index)} className='iconoBorrar'>&#9940;</td>
                  </tr>
                )
              }) :
              <tr>
                <td>Aquí</td>
                <td>verás</td>
                <td>las</td>
                <td>cotizaciones</td>
                <td>realizadas</td>
              </tr>}
          </tbody>
        </table>

        <div className="center separador">
          <Link to={'/'}><button className="button button-outline">VOLVER</button></Link>
          <button onClick={borrarHistorial} className="button button-outline separador">LIMPIAR</button>
        </div>
      </div>
    </>
  );
}

export default Historial;
