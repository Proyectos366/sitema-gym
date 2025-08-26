// import BotonAceptarCancelar from "@/Components/botones/BotonAceptarCancelar";
// import Formulario from "@/Components/Formulario";
// import InputClave from "@/Components/inputs/InputClave";
// import InputCorreo from "@/Components/inputs/InputCorreo";
// import InputNombre from "@/Components/inputs/InputNombre";
// import LabelInput from "@/Components/inputs/LabelInput";
// import MostrarMsj from "@/Components/mensaje/MostrarMensaje";

// export default function Registro() {
//     /**
//     const leyendoClave1 = (e) => {
//         const claveUnoUno = e.target.value;
//         setClaveUno(claveUnoUno);
//         verificarCoincidencia(claveUnoUno, claveDos);
//         limiteSizeClave(claveUnoUno, claveDos);
//     };

//     const leyendoClave2 = (e) => {
//         const claveDosDos = e.target.value;
//         setClaveDos(claveDosDos);
//         verificarCoincidencia(claveUno, claveDosDos);
//         limiteSizeClave(claveUno, claveDosDos);
//     };

//     const limiteSizeClave = (clave, claveDos) => {
//         if (clave && claveDos && clave === claveDos) {
//             if (clave.length < 8 || claveDos.length > 16) {
//                 setMensaje("Clave debe ser entre 8 y 16 caracteres");
//             } else if (
//                 (clave.length >= 8 || claveDos.length <= 16) &&
//                 !validarClave
//             ) {
//                 setMensaje("Formato de clave invalido...");
//             } else {
//                 setMensaje("");
//             }
//         }
//     };

//     const verificarCoincidencia = (clave, clave2) => {
//         if (validarClave) {
//             setMensaje("");
//         } else {
//             setMensaje("Formato clave invalido...");
//         }

//         if (clave !== clave2) {
//             setMensaje("Claves no coinciden...");
//         } else {
//             setMensaje("");
//         }
//     };
//     */

//     return (
//         <section>
//             <Formulario onSubmit={(e) => e.preventDefault()} className="">
//                 <div className="flex flex-col w-full gap-2 px-1">
//                     <LabelInput nombre={"Nombre"}>
//                         <InputNombre
//                             type="text"
//                             indice="nombre"
//                             value={nombre}
//                             setValue={setNombre}
//                             validarNombre={validarNombre}
//                             setValidarNombre={setValidarNombre}
//                         />
//                     </LabelInput>

//                     <LabelInput nombre={"Correo"}>
//                         <InputCorreo
//                             type="text"
//                             indice="email"
//                             value={correo}
//                             setValue={setCorreo}
//                             validarCorreo={validarCorreo}
//                             setValidarCorreo={setValidarCorreo}
//                         />
//                     </LabelInput>

//                     <LabelInput nombre={"Clave"}>
//                         <InputClave
//                             type={"password"}
//                             value={claveUno}
//                             onChange={leyendoClave1}
//                             indice={"clave"}
//                             validarClave={validarClave}
//                             setValidarClave={setValidarClave}
//                         />
//                     </LabelInput>

//                     <LabelInput nombre={"Clave confirmar"}>
//                         <InputClave
//                             type={"password"}
//                             value={claveDos}
//                             onChange={leyendoClave2}
//                             indice={"clave2"}
//                         />
//                     </LabelInput>

//                     {mensaje && (
//                         <div className="w-full">
//                             <MostrarMsj mensaje={mensaje} />
//                         </div>
//                     )}

//                     <div className="flex space-x-4">
//                         <BotonAceptarCancelar
//                             indice={"aceptar"}
//                             aceptar={mostrarModal}
//                             nombre={"Crear"}
//                             campos={{
//                                 nombre,
//                                 correo,
//                                 claveUno,
//                                 claveDos,
//                             }}
//                         />

//                         <BotonAceptarCancelar
//                             indice={"limpiar"}
//                             aceptar={() => {
//                                 limpiarCampos({
//                                     setNombre,
//                                     setCorreo,
//                                     setClaveUno,
//                                     setClaveDos,
//                                 });
//                             }}
//                             nombre={"Limpiar"}
//                             campos={{
//                                 nombre,
//                                 correo,
//                                 claveUno,
//                                 claveDos,
//                             }}
//                         />
//                     </div>
//                 </div>
//             </Formulario>
//         </section>
//     );
// }

import { useState } from "react";
import { useUser } from "@/contexts/UserContext";

import BotonAceptarCancelar from "@/Components/botones/BotonAceptarCancelar";
import Formulario from "@/Components/Formulario";
import InputClave from "@/Components/inputs/InputClave";
import InputCorreo from "@/Components/inputs/InputCorreo";
import InputNombre from "@/Components/inputs/InputNombre";
import LabelInput from "@/Components/inputs/LabelInput";
import MostrarMsj from "@/Components/mensaje/MostrarMensaje";
import Modal from "@/Components/modales/Modal";
import ModalDatosContenedor from "@/Components/modales/ModalDatosContenedor";
import MostarMsjEnModal from "@/Components/mensaje/MostrarMsjEnModal";
import BotonesModal from "@/Components/botones/BotonesModal";
import ModalDatos from "@/Components/modales/ModalDatos";

export default function Registro() {
    // 👇 Estados locales
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [claveUno, setClaveUno] = useState("");
    const [claveDos, setClaveDos] = useState("");
    const [validarNombre, setValidarNombre] = useState(false);
    const [validarCorreo, setValidarCorreo] = useState(false);
    const [validarClave, setValidarClave] = useState(false);

    const [mostrarMensaje, setMostrarMensaje] = useState("")

    // 👇 Funciones del contexto
    const { mensaje, mostrar, cerrarModal, mostrarModal, abrirMensaje, limpiarCampos } = useUser();

    // 👇 Funciones de validación
    const leyendoClave1 = (e) => {
        const claveUnoUno = e.target.value;
        setClaveUno(claveUnoUno);
        verificarCoincidencia(claveUnoUno, claveDos);
        limiteSizeClave(claveUnoUno, claveDos);
    };

    const leyendoClave2 = (e) => {
        const claveDosDos = e.target.value;
        setClaveDos(claveDosDos);
        verificarCoincidencia(claveUno, claveDosDos);
        limiteSizeClave(claveUno, claveDosDos);
    };

    const limiteSizeClave = (clave, claveDos) => {
        if (clave && claveDos && clave === claveDos) {
            if (clave.length < 8 || claveDos.length > 16) {
                abrirMensaje("Clave debe ser entre 8 y 16 caracteres");
            } else if (
                (clave.length >= 8 || claveDos.length <= 16) &&
                !validarClave
            ) {
                abrirMensaje("Formato de clave inválido...");
            }
        }
    };

    const verificarCoincidencia = (clave, clave2) => {
        if (!validarClave) {
            abrirMensaje("Formato clave inválido...");
        } else if (clave !== clave2) {
            abrirMensaje("Claves no coinciden...");
        }
    };


    const crearUsuario = async () => {
    if (nombre.trim()) {
      try {
        const response = await axios.post("/api/registro", {
          nombre: nombre,
          correo: correo,
          claveUno: claveUno,
          claveDos: claveDos
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
                isVisible={mostrar}
                onClose={cerrarModal}
                titulo={"¿Crear este usuario?"}
            >
                <ModalDatosContenedor>
                    <ModalDatos titulo={"Nombre"} descripcion={nombre} />
                    <ModalDatos
                        titulo={"Correo"}
                        descripcion={correo}
                    />
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
            <section>
                <Formulario onSubmit={(e) => e.preventDefault()} className="">
                    <div className="flex flex-col w-full gap-2 px-1">
                        <LabelInput nombre={"Nombre"}>
                            <InputNombre
                                type="text"
                                indice="nombre"
                                value={nombre}
                                setValue={setNombre}
                                validarNombre={validarNombre}
                                setValidarNombre={setValidarNombre}
                            />
                        </LabelInput>

                        <LabelInput nombre={"Correo"}>
                            <InputCorreo
                                type="text"
                                indice="email"
                                value={correo}
                                setValue={setCorreo}
                                validarCorreo={validarCorreo}
                                setValidarCorreo={setValidarCorreo}
                            />
                        </LabelInput>

                        <LabelInput nombre={"Clave"}>
                            <InputClave
                                type={"password"}
                                value={claveUno}
                                onChange={leyendoClave1}
                                indice={"clave"}
                                validarClave={validarClave}
                                setValidarClave={setValidarClave}
                            />
                        </LabelInput>

                        <LabelInput nombre={"Clave confirmar"}>
                            <InputClave
                                type={"password"}
                                value={claveDos}
                                onChange={leyendoClave2}
                                indice={"clave2"}
                            />
                        </LabelInput>

                        {mensaje && (
                            <div className="w-full">
                                <MostrarMsj mensaje={mensaje} />
                            </div>
                        )}

                        <div className="flex space-x-4">
                            <BotonAceptarCancelar
                                indice={"aceptar"}
                                aceptar={mostrarModal}
                                nombre={"Crear"}
                                campos={{
                                    nombre,
                                    correo,
                                    claveUno,
                                    claveDos,
                                }}
                            />

                            <BotonAceptarCancelar
                                indice={"limpiar"}
                                aceptar={() => {
                                    limpiarCampos({
                                        setNombre,
                                        setCorreo,
                                        setClaveUno,
                                        setClaveDos,
                                    });
                                }}
                                nombre={"Limpiar"}
                                campos={{
                                    nombre,
                                    correo,
                                    claveUno,
                                    claveDos,
                                }}
                            />
                        </div>
                    </div>
                </Formulario>
            </section>
        </>
    );
}
