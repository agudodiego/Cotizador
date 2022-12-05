import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAppContext } from "../context/context";
import { Cotizacion } from "../model/class.cotizacion";

const Cotizador = () => {

  const { data, getData, COSTOM2, mostarAlerta, mostarAlertaHistorial } = useAppContext();
  const [datosFormulario, setDatosFormulario] = useState({
    idPropiedad: '...',
    idUbicacion: '...',
    m2: 20
  });
  const [mostrarAnimacion, setMostrarAnimacion] = useState(false);
  const [poliza, setPoliza] = useState(0);
  const [ultimaCotizacion, setUltimaCotizacion] = useState({});
  const [btnGrabarVisible, setBtnGrabarVisible] = useState(false);

  const buscarItem = (array, id) => {
    const aux = array.filter((item) => item.id == id);
    return aux[0];
  }

  const armarFecha = ()=> {
    let fecha = new Date();
    return `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}, ${fecha.getHours()}:${fecha.getMinutes()}`;
  }

  const armarCotizacion = () => {
    setMostrarAnimacion(true);
    setTimeout(() => {
      
      const datosPropiedad = buscarItem(data, datosFormulario.idPropiedad);
      const datosUbicacion = buscarItem(data, datosFormulario.idUbicacion);
      
      armarFecha();
      const cotizacionActual = new Cotizacion(armarFecha(),
      COSTOM2,
      datosPropiedad.tipo,
      datosPropiedad.factor,
      datosUbicacion.tipo,
      datosUbicacion.factor,
      datosFormulario.m2);
      
      setPoliza(cotizacionActual.cotizarPoliza());
      setUltimaCotizacion(cotizacionActual);
      
      setMostrarAnimacion(false);
      mostarAlerta('', 'Cotización realizada con éxito', 'success');
    }, 2500);
  }

  const guardarHistorial = ()=> {
    const historialCotizaciones = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    historialCotizaciones.push(ultimaCotizacion);
    localStorage.setItem("historialCotizaciones", JSON.stringify(historialCotizaciones));
    mostarAlertaHistorial('top-end','success','Cotización guardada');
  }

  const grabarCotizacion = () => {
    setBtnGrabarVisible(false);
    setDatosFormulario({idPropiedad: '...', idUbicacion: '...', m2: 20 });
    setPoliza(0);
    guardarHistorial();    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (datosFormulario.idPropiedad == '...' || datosFormulario.idUbicacion == '...') {
      mostarAlerta('', 'Debes completar todos los datos en pantalla..', 'warning');
      return
    }

    armarCotizacion();
    setBtnGrabarVisible(true);
  }

  const recopilarData = (e)=> {
    setDatosFormulario((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
          <select value={datosFormulario.idPropiedad} name="idPropiedad" onChange={recopilarData} id="propiedad">
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
          <select value={datosFormulario.idUbicacion} name="idUbicacion" onChange={recopilarData} id="ubicacion">
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
          <input type="number" id="metros2" value={datosFormulario.m2} name="m2" onChange={recopilarData} min="20" max="500" required />

          <div className="center separador">
            <button type='submit' className=" button-outline"> { mostrarAnimacion ? <img src={require("../images/Ellipsis-1.1s-44px.gif")} width="40px"/> : 'Cotizar'}</button>
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
