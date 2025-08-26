import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Modal from "@/Components/modales/Modal";
import ModalDatosContenedor from "@/Components/modales/ModalDatosContenedor";
import MostarMsjEnModal from "@/Components/mensaje/MostrarMsjEnModal";
import BotonesModal from "@/Components/botones/BotonesModal";
import ModalDatos from "@/Components/modales/ModalDatos";
import FormCrearUsuario from "@/Components/formularios/FormCrearUsuario";
import Titulos from "@/Components/Titulos";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function Registro() {
    // 👇 Estados locales
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [claveUno, setClaveUno] = useState("");
    const [claveDos, setClaveDos] = useState("");
    const [validarNombre, setValidarNombre] = useState(false);
    const [validarCorreo, setValidarCorreo] = useState(false);
    const [validarClave, setValidarClave] = useState(false);
    const [todosUsuarios, setTodosUsuarios] = useState("");

    const [mensajeFont, setMensajeFront] = useState("");

    // 👇 Funciones del contexto
    const {
        screenSize,
        mostrarModal,
        abrirModal,
        cerrarModal,
        mensaje,
        mostrarMensaje,
        abrirMensaje,
        limpiarCampos,
        ejecutarAccionesConRetraso,
    } = useUser();

    const crearUsuario = async () => {
        if (nombre.trim()) {
            try {
                const response = await axios.post("/api/registro", {
                    nombre: nombre,
                    correo: correo,
                    claveUno: claveUno,
                    claveDos: claveDos,
                });

                console.log(response.data);

                setTodosUsuarios([...todosUsuarios, response.data.usuarios]); // Suponiendo que la API devuelve el nombre guardado
                abrirMensaje(response.data.message);

                ejecutarAccionesConRetraso([
                    { accion: cerrarModal, tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setNombre(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setCorreo(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setClaveUno(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setClaveDos(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                ]);
            } catch (error) {
                console.log("Error, al crear el usuario: " + error);
                console.log(error?.response?.data);

                abrirMensaje(error?.response?.data?.message);
                ejecutarAccionesConRetraso([
                    { accion: cerrarModal, tiempo: 3000 }, // Se ejecutará en 3 segundos
                ]);
            }
        }
    };

    return (
        <>
            <Modal
                isVisible={mostrarModal}
                onClose={cerrarModal}
                titulo={"¿Crear este usuario?"}
            >
                <ModalDatosContenedor>
                    <ModalDatos titulo={"Nombre"} descripcion={nombre} />
                    <ModalDatos titulo={"Correo"} descripcion={correo} />
                    <ModalDatos titulo={"Clave uno"} descripcion={claveUno} />
                    <ModalDatos titulo={"Clave dos"} descripcion={claveDos} />
                </ModalDatosContenedor>

                <MostarMsjEnModal
                    mostrarMensaje={mostrarMensaje}
                    mensaje={mensaje}
                />

                <BotonesModal
                    aceptar={crearUsuario}
                    cancelar={cerrarModal}
                    indiceUno={"crear"}
                    indiceDos={"cancelar"}
                    nombreUno={"Aceptar"}
                    nombreDos={"Cancelar"}
                    campos={{
                        nombre,
                        correo,
                        claveUno,
                        claveDos,
                    }}
                />
            </Modal>

            <div className={`bg-purple-200`}>
                <div
                    className={`container mx-auto pt-2 px-2 sm:px-0 grid min-h-dvh grid-rows-[auto_1fr_auto] gap-4 transition-all duration-500 ease-in-out`}
                >
                    <Header></Header>

                    <main className="flex flex-col justify-center bg-[#faf5f8] rounded-md p-4">
                        <Titulos indice={2} titulo={"Crear usuario"} />
                        <FormCrearUsuario
                            correo={correo}
                            setCorreo={setCorreo}
                            nombre={nombre}
                            setNombre={setNombre}
                            claveUno={claveUno}
                            setClaveUno={setClaveUno}
                            claveDos={claveDos}
                            setClaveDos={setClaveDos}
                            validarCorreo={validarCorreo}
                            setValidarCorreo={setValidarCorreo}
                            validarNombre={validarNombre}
                            setValidarNombre={setValidarNombre}
                            validarClave={validarClave}
                            setValidarClave={setValidarClave}
                            limpiarCampos={limpiarCampos}
                            mostrarModal={abrirModal}
                            mensaje={mensajeFont}
                            setMensaje={setMensajeFront}
                        />
                    </main>

                    <Footer></Footer>
                </div>
            </div>
        </>
    );
}
