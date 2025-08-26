import BotonAceptarCancelar from "../BotonAceptarCancelar";
import Formulario from "../Formulario";
import InputNombre from "../inputs/InputNombre";
import LabelInput from "../inputs/LabelInput";

export default function FormCrearPais({
  nombre,
  setNombre,
  capital,
  setCapital,
  descripcion,
  setDescripcion,
  serial,
  setSerial,
  validarNombre,
  setValidarNombre,
  validarCapital,
  setValidarCapital,
  abrirModal,
  limpiarCampos,
}) {
  return (
    <Formulario
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
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
        <InputNombre
          type="text"
          value={descripcion}
          setValue={setDescripcion}
        />
      </LabelInput>

      <LabelInput nombre={"Serial"}>
        <InputNombre type="text" value={serial} setValue={setSerial} />
      </LabelInput>

      <div className="flex space-x-3">
        <BotonAceptarCancelar
          indice={"aceptar"}
          aceptar={abrirModal}
          nombre={"Crear"}
          campos={{
            nombre,
            capital,
            descripcion,
            serial,
          }}
        />

        <BotonAceptarCancelar
          indice={"limpiar"}
          aceptar={() => {
            limpiarCampos({ setNombre, setCapital, setDescripcion, setSerial });
          }}
          nombre={"Limpiar"}
          campos={{
            nombre,
            capital,
            descripcion,
            serial,
          }}
        />
      </div>
    </Formulario>
  );
}
