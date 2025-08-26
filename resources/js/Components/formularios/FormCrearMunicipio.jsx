import BotonAceptarCancelar from "../BotonAceptarCancelar";
import Formulario from "../Formulario";
import InputNombre from "../inputs/InputNombre";
import LabelInput from "../inputs/LabelInput";
import SelectOpcion from "../SelectOpcion";

export default function FormCrearMunicipio({
  idPais,
  idEstado,
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  validarNombre,
  setValidarNombre,
  abrirModal,
  limpiarCampos,
  paises,
  estados,
  cambiarSeleccionPais,
  cambiarSeleccionEstado,
  setNombrePais,
  setNombreEstado,
}) {
  return (
    <Formulario
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <SelectOpcion
        idOpcion={idPais}
        nombre={"Paises"}
        handleChange={cambiarSeleccionPais}
        opciones={paises}
        seleccione={"Seleccione"}
        setNombre={setNombrePais}
        indice={1}
      />

      {idPais && (
        <SelectOpcion
          idOpcion={idEstado}
          nombre={"Estados"}
          handleChange={cambiarSeleccionEstado}
          opciones={estados}
          seleccione={"Seleccione"}
          setNombre={setNombreEstado}
          indice={1}
        />
      )}

      {idEstado && (
        <>
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

          <LabelInput nombre={"Descripción"}>
            <InputNombre
              type="text"
              value={descripcion}
              setValue={setDescripcion}
            />
          </LabelInput>
        </>
      )}

      <div className="flex space-x-3">
        <BotonAceptarCancelar
          indice={"aceptar"}
          aceptar={abrirModal}
          nombre={"Crear"}
          campos={{
            nombre,
            descripcion,
            idPais,
            idEstado,
          }}
        />

        <BotonAceptarCancelar
          indice={"limpiar"}
          aceptar={() => {
            limpiarCampos({
              setNombre,
              setDescripcion,
            });
          }}
          nombre={"Limpiar"}
          campos={{
            nombre,
            descripcion,
          }}
        />
      </div>
    </Formulario>
  );
}
