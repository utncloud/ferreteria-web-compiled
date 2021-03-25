import React from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,  Route,
  Link, useLocation
} from "react-router-dom";
import './App.css';
import Login from './componentes/Login/Login';
import AddRoom from './componentes/AddRoom/AddRoom';
import RoomReservation from './componentes/reservation/RoomReservation';
import RutaPrivada from './componentes/Comunes/RutaPrivada';

function App() {
  return (
    <Router>
      <div>
        <Login/>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/registrosalas">Registro de Salas</Link>
              </li>
              <li>
                <Link to="/reservasala">Reservación de Salas</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <RutaPrivada path="/registrosalas">
            <AddRoom />
          </RutaPrivada>
          <RutaPrivada path="/reservasala">
            <RoomReservation/>
          </RutaPrivada>
          <Route exact path="/">
            <Inicio />
          </Route>
          <Route path="*">
            <PaginaNoEncontrada />
          </Route>
        </Switch>
      </div>
    </Router>
    // <div></div>
  );
}

function Inicio() {
  return <div><h2>Inicio</h2><p>Página de Inicio.</p></div>;
}

function PaginaNoEncontrada() {
  let direccion = useLocation();
  return <div><h2>Página No Encontrada</h2><p>No se encontró la página indicada 
    <code>{direccion.pathname}</code></p></div>;
}



export default App;
