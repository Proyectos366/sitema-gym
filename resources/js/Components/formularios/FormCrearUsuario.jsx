"use client";

import LabelInput from "../inputs/LabelInput";
import Formulario from "../Formulario";
import InputNombre from "../inputs/InputNombre";
import InputCorreo from "../inputs/InputCorreo";
import InputClave from "../inputs/InputClave";
import BotonAceptarCancelar from "../botones/BotonAceptarCancelar";
import MostrarMsj from "../mensaje/MostrarMensaje";
import LinkPaginas from "../Link";
import InputCedula from "../inputs/InputCedula";

export default function FormCrearUsuario({
    cedula,
    setCedula,
    nombre,
    setNombre,
    apellido,
    setApellido,
    correo,
    setCorreo,
    especialidad,
    setEspecialidad,
    claveUno,
    setClaveUno,
    claveDos,
    setClaveDos,
    validarCedula,
    setValidarCedula,
    validarNombre,
    setValidarNombre,
    validarApellido,
    setValidarApellido,
    validarCorreo,
    setValidarCorreo,
    validarEspecialidad,
    setValidarEspecialidad,
    validarClave,
    setValidarClave,
    limpiarCampos,
    mostrarModal,
    mensaje,
    setMensaje,
}) {
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
                setMensaje("Clave debe ser entre 8 y 16 caracteres");
            } else if (
                (clave.length >= 8 || claveDos.length <= 16) &&
                !validarClave
            ) {
                setMensaje("Formato de clave invalido...");
            } else {
                setMensaje("");
            }
        }
    };

    const verificarCoincidencia = (clave, clave2) => {
        if (validarClave) {
            setMensaje("");
        } else {
            setMensaje("Formato clave invalido...");
        }

        if (clave !== clave2) {
            setMensaje("Claves no coinciden...");
        } else {
            setMensaje("");
        }
    };

    return (
        <Formulario onSubmit={(e) => e.preventDefault()} className="">
            <div className="flex flex-col w-full gap-2 px-1">
                <LabelInput nombre={"Cedula"}>
                    <InputCedula
                        type="text"
                        indice={"cedula"}
                        value={cedula}
                        setValue={setCedula}
                        validarCedula={validarCedula}
                        setValidarCedula={setValidarCedula}
                    />
                </LabelInput>

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

                <LabelInput nombre={"Apellido"}>
                    <InputNombre
                        type={"text"}
                        indice={"nombre"}
                        value={apellido}
                        setValue={setApellido}
                        validarNombre={validarApellido}
                        setValidarNombre={setValidarApellido}
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

                <LabelInput nombre={"Especialidad"}>
                    <InputNombre
                        type={"text"}
                        indice={"nombre"}
                        value={especialidad}
                        setValue={setEspecialidad}
                        validarNombre={validarEspecialidad}
                        setValidarNombre={setValidarEspecialidad}
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

                <div>
                    <LinkPaginas href={"/"} nombre={"Login"} />
                </div>

                <div className="flex space-x-3">
                    <BotonAceptarCancelar
                        indice={"aceptar"}
                        aceptar={mostrarModal}
                        nombre={"Crear"}
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

                    <BotonAceptarCancelar
                        indice={"limpiar"}
                        aceptar={() => {
                            limpiarCampos({
                                setCedula,
                                setNombre,
                                setApellido,
                                setCorreo,
                                setEspecialidad,
                                setClaveUno,
                                setClaveDos,
                            });
                        }}
                        nombre={"Limpiar"}
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
                </div>
            </div>
        </Formulario>
    );
}
