import { useContext, createContext, useMemo, useState } from "react";
import Swal from "sweetalert2";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const COSTOM2 = 35.86;
  const [data, setData] = useState([]);

  /**
   * Funcion que dispara una alerta de SweetAlert
   * @param {String} titulo personalizado
   * @param {String} mensaje personalizado
   * @param {Stirng} icono de SweeyAlert
   */
  const mostarAlerta = (titulo, mensaje, icono) => {
    Swal.fire({
      icon: icono || '',
      title: titulo || '',
      text: mensaje,
      showConfirmButton: false,
      timer: 3500,
      width: '240px'
    })
  }

  const mostarAlertaHistorial = (posicion, icono, titulo)=> {
    Swal.fire({
      position: posicion,
      icon: icono,
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    })
  }

  /**
   * Funcion asincrona para el fetch de datos
   */
  const getData = async () => {
    const response = await fetch('./data.json');
    const data = await response.json();
    setData(data);
  }

  // ********** VALUE *****************
  const value = useMemo(() => ({
    COSTOM2,
    data,
    getData,
    mostarAlerta,
    mostarAlertaHistorial
  }), [data])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}