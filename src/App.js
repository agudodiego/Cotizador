import './App.css';
import { Routes, Route } from "react-router-dom";
import Cotizador from "./pages/Cotizador";
import Historial from "./pages/Historial";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Cotizador />} />
        <Route path='/historial' element={<Historial />} />
      </Routes>
    </div>
  );
}

export default App;
