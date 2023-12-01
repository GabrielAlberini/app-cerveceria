import { API_ENDPOINT } from "./constans";

const handleFetch = async (nuevoRegistro) => {
  const registro = {
    Nombre: nuevoRegistro.nombre,
    DNI: nuevoRegistro.dni,
    Email: nuevoRegistro.correoElectronico,
    Hora: nuevoRegistro.horaGeneracion,
    "Fecha de nacimiento": `${nuevoRegistro.diaNacimiento}/${nuevoRegistro.mesNacimiento}/${nuevoRegistro.anoNacimiento}`,
    Bar: nuevoRegistro.seleccionBar,
    Cupon: nuevoRegistro.codigoGenerado,
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(registro),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud fetch");
    }
  } catch (error) {
    console.error("Error en la solicitud fetch:", error.message);
  }
};

export { handleFetch };
