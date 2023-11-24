// App.js
import { useState, useEffect } from "react";
import { AlertMessage } from "./components/Alert/Alert"; // Importamos el nuevo componente

const App = () => {
  const [codigoGenerado, setCodigoGenerado] = useState("");
  const [formulario, setFormulario] = useState({
    nombre: "",
    dni: "",
    fechaNacimiento: "",
    usuarioInstagram: "",
  });

  const [registros, setRegistros] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    // Cargar registros desde localStorage al iniciar
    const storedRegistros = JSON.parse(localStorage.getItem("registros")) || [];
    setRegistros(storedRegistros);
  }, []);

  // Función para mostrar mensajes de alerta
  const showAlertMessage = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000); // Ocultar después de 5 segundos
  };

  // Función para calcular la edad
  const calcularEdad = () => {
    const fechaNacimientoDate = new Date(formulario.fechaNacimiento);
    const edadMilisegundos = Date.now() - fechaNacimientoDate.getTime();
    const edad = new Date(edadMilisegundos).getFullYear() - 1970;
    return edad;
  };

  // Función para generar el código
  const generarCodigo = () => {
    const edad = calcularEdad();

    if (edad >= 18) {
      const nuevoCodigo = Math.random().toString(36).substring(7);
      setCodigoGenerado(nuevoCodigo);

      const nuevoRegistro = {
        dni: formulario.dni,
        horaGeneracion: new Date().toLocaleTimeString(),
      };

      // Actualizar el estado y localStorage con el nuevo registro
      setRegistros([...registros, nuevoRegistro]);
      localStorage.setItem(
        "registros",
        JSON.stringify([...registros, nuevoRegistro])
      );
    } else {
      showAlertMessage(
        "Debes ser mayor de 18 años para generar un código.",
        "danger"
      );
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, dni, fechaNacimiento, usuarioInstagram } = formulario;

    if (!nombre || !dni || !fechaNacimiento || !usuarioInstagram) {
      showAlertMessage(
        "Por favor, completa todos los campos del formulario.",
        "danger"
      );
      return;
    }
    if (dni.length < 7 || dni.length > 8) {
      showAlertMessage("El DNI debe tener entre 7 y 8 números.", "danger");
      return;
    }

    const existeRegistro = registros.some((registro) => registro.dni === dni);

    if (existeRegistro) {
      showAlertMessage(
        "No puedes generar otro código con el mismo DNI en menos de 24 horas.",
        "warning"
      );
      return;
    }

    generarCodigo();
    setFormulario({
      nombre: "",
      dni: "",
      fechaNacimiento: "",
      usuarioInstagram: "",
    });
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <h1 className="title is-1 has-text-centered">Test Cupón Cervecería</h1>
        {showAlert && <AlertMessage message={alertMessage} type={alertType} />}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Nombre:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">DNI:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="dni"
                value={formulario.dni}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Fecha de Nacimiento:</label>
            <div className="control">
              <input
                className="input"
                type="date"
                name="fechaNacimiento"
                value={formulario.fechaNacimiento}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Usuario de Instagram:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="usuarioInstagram"
                value={formulario.usuarioInstagram}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Generar Código
              </button>
            </div>
          </div>
        </form>

        {codigoGenerado && (
          <div className="mt-4">
            <p className="title is-4">Código Generado:</p>
            <p className="subtitle is-6">{codigoGenerado}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { App };
