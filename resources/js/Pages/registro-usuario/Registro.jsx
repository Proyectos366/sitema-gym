import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { router } from '@inertiajs/react';
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
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [claveUno, setClaveUno] = useState("");
    const [claveDos, setClaveDos] = useState("");

    const [validarCedula, setValidarCedula] = useState(false);
    const [validarNombre, setValidarNombre] = useState(false);
    const [validarApellido, setValidarApellido] = useState(false);
    const [validarCorreo, setValidarCorreo] = useState(false);
    const [validarEspecialidad, setValidarEspecialidad] = useState(false);
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
                console.log(
                    cedula,
                    nombre,
                    apellido,
                    correo,
                    especialidad,
                    claveUno,
                    claveDos
                );

                const response = await axios.post("/api/registro", {
                    cedula: cedula,
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    especialidad: especialidad,
                    claveUno: claveUno,
                    claveDos: claveDos,
                });

                console.log(response.data);
                

                setTodosUsuarios([...todosUsuarios, response.data.usuarios]); // Suponiendo que la API devuelve el nombre guardado
                abrirMensaje(response.data.message);

                ejecutarAccionesConRetraso([
                    { accion: cerrarModal, tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setCedula(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setNombre(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setApellido(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setCorreo(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setEspecialidad(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setClaveUno(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                    { accion: () => setClaveDos(""), tiempo: 3000 }, // Se ejecutará en 3 segundos
                ]);

                
                

router.visit(response.data.redirect);
                
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
                    <ModalDatos titulo={"Cedula"} descripcion={cedula} />
                    <ModalDatos titulo={"Nombre"} descripcion={nombre} />
                    <ModalDatos titulo={"Apellido"} descripcion={apellido} />
                    <ModalDatos titulo={"Correo"} descripcion={correo} />
                    <ModalDatos
                        titulo={"Especialidad"}
                        descripcion={especialidad}
                    />
                    <ModalDatos
                        titulo={"Clave uno"}
                        descripcion={claveUno}
                        indice={1}
                    />
                    <ModalDatos
                        titulo={"Clave dos"}
                        descripcion={claveDos}
                        indice={1}
                    />
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
                        cedula,
                        nombre,
                        apellido,
                        correo,
                        especialidad,
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
                            cedula={cedula}
                            setCedula={setCedula}
                            nombre={nombre}
                            setNombre={setNombre}
                            apellido={apellido}
                            setApellido={setApellido}
                            correo={correo}
                            setCorreo={setCorreo}
                            especialidad={especialidad}
                            setEspecialidad={setEspecialidad}
                            claveUno={claveUno}
                            setClaveUno={setClaveUno}
                            claveDos={claveDos}
                            setClaveDos={setClaveDos}
                            validarCedula={validarCedula}
                            setValidarCedula={setValidarCedula}
                            validarNombre={validarNombre}
                            setValidarNombre={setValidarNombre}
                            validarApellido={validarApellido}
                            setValidarApellido={setValidarApellido}
                            validarCorreo={validarCorreo}
                            setValidarCorreo={setValidarCorreo}
                            validarEspecialidad={validarEspecialidad}
                            setValidarEspecialidad={setValidarEspecialidad}
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
