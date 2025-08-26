"use client";

import { useEffect } from "react";
import LabelInput from "../inputs/LabelInput";
import BotonAceptarCancelar from "../BotonAceptarCancelar";
import Formulario from "../Formulario";
import MostarMsjEnModal from "../MostrarMsjEnModal";
import Input from "../inputs/Input";
import InputNombre from "../inputs/InputNombre";

export default function FormEditarPais({
  nombre,
  setNombre,
  capital,
  setCapital,
  descripcion,
  setDescripcion,
  validarNombre,
  setValidarNombre,
  validarCapital,
  setValidarCapital,
  limpiarCampos,
  mostrarMensaje,
  editar,
  mensaje,
}) {
  useEffect(() => {
    const validarYActualizar = (valor, setValidar) => {
      if (valor) {
        const limpio = String(valor).trim();
        const esValido = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/.test(limpio);
        if (typeof setValidar === "function") setValidar(esValido);
      }
    };

    validarYActualizar(nombre, setValidarNombre);
    validarYActualizar(capital, setValidarCapital);
  }, [nombre, capital]);

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

        <LabelInput nombre={"Capital"}>
          <InputNombre
            type="text"
            indice="nombre"
            value={capital}
            setValue={setCapital}
            validarNombre={validarCapital}
            setValidarNombre={setValidarCapital}
          />
        </LabelInput>

        <LabelInput nombre={"Descripción"}>
          <Input
            type={"text"}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </LabelInput>

        <div className="">
          <MostarMsjEnModal mostrarMensaje={mostrarMensaje} mensaje={mensaje} />
        </div>

        <div className="flex space-x-4">
          <BotonAceptarCancelar
            indice={"aceptar"}
            aceptar={editar}
            nombre={"Guardar cambios"}
            campos={{
              nombre,
              capital,
              descripcion,
            }}
          />

          <BotonAceptarCancelar
            indice={"limpiar"}
            aceptar={() => {
              limpiarCampos({
                setNombre,
                setCapital,
                setDescripcion,
              });
            }}
            nombre={"Limpiar"}
            campos={{
              nombre,
              capital,
              descripcion,
            }}
          />
        </div>
      </div>
    </Formulario>
  );
}
