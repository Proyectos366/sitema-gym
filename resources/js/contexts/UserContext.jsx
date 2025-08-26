"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  // Actualiza el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // Ejecuta al montar
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Funciones para controlar el modal
  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  // Funciones para mostrar mensajes
  const abrirMensaje = (nuevoMensaje, tiempo = 3000) => {
    setMensaje(nuevoMensaje);
    setMostrarMensaje(true);

    setTimeout(() => {
      cerrarMensaje();
    }, tiempo);
  };

  const cerrarMensaje = () => {
    setMensaje("");
    setMostrarMensaje(false);
  };

  // Función para limpiar campos dinámicos
  const limpiarCampos = (objetoEstados) => {
    Object.keys(objetoEstados).forEach((key) => {
      objetoEstados[key]("");
    });
  };

  // Ejecutar acciones con retraso
  const ejecutarAccionesConRetraso = (acciones) => {
    acciones.forEach(({ accion, tiempo }) => {
      setTimeout(() => {
        accion();
      }, tiempo);
    });
  };

  return (
    <UserContext.Provider
      value={{
        screenSize,
        mostrarModal,
        abrirModal,
        cerrarModal,
        mensaje,
        mostrarMensaje,
        abrirMensaje,
        cerrarMensaje,
        limpiarCampos,
        ejecutarAccionesConRetraso,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);