import { Routes, Route, Navigate, NavLink, Outlet } from "react-router-dom";

import ListaCancionesPreferidas from "../components/ListaCancionesPreferidas/ListaCancionesPreferidas";
import Analitica from "../components/Analitica/Analitica";
import ContactForm from "../components/ContactForm/ContactForm";
import SobreMi from "../components/SobreMi/SobreMi";
import Home from "../components/Home/Home";

function Layout() {
  return (
    <>
      <header style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink
            to="/home"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#1d4ed8" : "#111827",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/listacancionespreferidas"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#1d4ed8" : "#111827",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Lista canciones
          </NavLink>
        
          <NavLink
            to="/ContactForm"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#1d4ed8" : "#111827",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Form
          </NavLink>
          <NavLink
            to="/Analitica"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#1d4ed8" : "#111827",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Analytics
          </NavLink>
          <NavLink
            to="/SobreMi"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#1d4ed8" : "#111827",
              fontWeight: isActive ? 700 : 500,
            })}
          >
            Sobre Mi
          </NavLink>
        </nav>
      </header>

      {/* Punto donde se pintará la ruta hija activa */}
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </>
  );
}

function NotFound() {
  return (
    <>
      <p className="error404">404 · Ruta no encontrada</p>
      <img src=".public/404.png" alt="Not Found" className="error404-image" />
    </>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Ruta padre sin path explícito: sólo sirve el Layout */}
      <Route element={<Layout />}>
        {/* index: cuando visites exactamente "/" redirige a /home */}
        <Route index element={<Navigate to="/Home" replace />} />
        {/* Rutas hijas */}
      
        <Route path="/ListaCancionesPreferidas" element={<ListaCancionesPreferidas />} />
        <Route path="/Analitica" element={<Analitica />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/SobreMi" element={<SobreMi />} /> 
        <Route path="/Home" element={<Home /> } /> 

        {/* comodín: 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}