import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAppContext } from "../context/context";
import { Cotizacion } from "../model/class.cotizacion";

const Cotizador = () => {

  const { data, getData, COSTOM2, mostarAlerta } = useAppContext();
  const [idPropiedad, setIdPropiedad] = useState('...');
  const [idUbicacion, setIdUbicacion] = useState('...');
  const [m2, setM2] = useState(20);
  const [poliza, setPoliza] = useState(0);
  const [btnGrabarVisible, setBtnGrabarVisible] = useState(false);

  const buscarItem = (array, id) => {
    const aux = array.filter((item) => item.id == id);
    return aux[0];
  }

  const armarCotizacion = () => {
    const datosPropiedad = buscarItem(data, idPropiedad);
    const datosUbicacion = buscarItem(data, idUbicacion);

    const cotizacionActual = new Cotizacion(COSTOM2,
      datosPropiedad.tipo,
      datosPropiedad.factor,
      datosUbicacion.tipo,
      datosUbicacion.factor,
      m2);

    setPoliza(cotizacionActual.cotizarPoliza());
  }

  const grabarCotizacion = () => {
    setBtnGrabarVisible(false);
    setIdPropiedad('...');
    setIdUbicacion('...');
    setPoliza(0);
    // TODO armar funcion para grabar en localStorage a traves del icono del diskette
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (idPropiedad === '...' || idUbicacion === '...') {
      mostarAlerta('', 'Debes completar todos los datos en pantalla..', 'warning');
      return
    }

    armarCotizacion();
    setBtnGrabarVisible(true);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="historial">
        <Link to={'/historial'}><span title="Ver Historial">📋</span></Link>
      </div>

      <h1 className="center separador">Seguros del hogar 🏡</h1>

      <div className=" center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
          <select value={idPropiedad} onChange={(e) => setIdPropiedad(e.target.value)} id="propiedad">
            <option defaultValue disabled>...</option>
            {data.map((item, index) => {
              return (
                item.categoria === 'propiedad'
                  ? <option key={index} value={item.id}>{item.tipo}</option>
                  : null
              )
            })}
          </select>

          <label htmlFor="ubicacion">Selecciona su ubicación</label>
          <select value={idUbicacion} onChange={(e) => setIdUbicacion(e.target.value)} id="ubicacion">
            <option defaultValue disabled>...</option>
            {data.map((item, index) => {
              return (
                item.categoria === 'ubicacion'
                  ? <option key={index} value={item.id}>{item.tipo}</option>
                  : null
              )
            })}
          </select>

          <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
          <input type="number" id="metros2" value={m2} onChange={(e) => setM2(e.target.value)} min="20" max="500" required />

          <div className="center separador">
            <button type='submit' className="button button-outline">Cotizar</button>
          </div>
        </form>

        <div className="center separador">
          <p className="importe">
            Precio estimado: $ <span id="valorPoliza">{poliza}</span>
            {btnGrabarVisible ? <span onClick={grabarCotizacion} className="guardar">💾</span> : null}
          </p>
        </div>
      </div>

    </>
  );
}

export default Cotizador;
