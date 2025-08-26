"use client";

import LabelInput from "../inputs/LabelInput";
import Formulario from "../Formulario";
import InputNombre from "../inputs/InputNombre";
import InputCorreo from "../inputs/InputCorreo";
import InputClave from "../inputs/InputClave";
import BotonAceptarCancelar from "../botones/BotonAceptarCancelar";
import MostrarMsj from "../mensaje/MostrarMensaje";
import LinkPaginas from "../Link";

export default function FormCrearUsuario({
    correo,
    setCorreo,
    nombre,
    setNombre,
    claveUno,
    setClaveUno,
    claveDos,
    setClaveDos,
    validarCorreo,
    setValidarCorreo,
    validarNombre,
    setValidarNombre,
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

                <div>
                    <LinkPaginas href={'/'} nombre={'Login'} />
                </div>

                <div className="flex space-x-3">
                    <BotonAceptarCancelar
                        indice={"aceptar"}
                        aceptar={mostrarModal}
                        nombre={"Crear"}
                        campos={{
                            nombre,
                        }}
                    />

                    <BotonAceptarCancelar
                        indice={"limpiar"}
                        aceptar={() => {
                            limpiarCampos({ setNombre });
                        }}
                        nombre={"Limpiar"}
                        campos={{
                            nombre,
                        }}
                    />
                </div>
            </div>
        </Formulario>
    );
}
