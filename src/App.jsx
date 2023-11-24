// App.js
import { useState, useEffect } from "react";
import { AlertMessage } from "./components/Alert/Alert";
import "./App.css";

const App = () => {
  const [codigoGenerado, setCodigoGenerado] = useState("");
  const [formulario, setFormulario] = useState({
    nombre: "",
    dni: "",
    diaNacimiento: "",
    mesNacimiento: "",
    anoNacimiento: "",
    usuarioInstagram: "",
  });

  const [registros, setRegistros] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    const storedRegistros = JSON.parse(localStorage.getItem("registros")) || [];
    setRegistros(storedRegistros);
  }, []);

  const showAlertMessage = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const calcularEdad = () => {
    const { diaNacimiento, mesNacimiento, anoNacimiento } = formulario;
    const fechaNacimientoDate = new Date(
      `${anoNacimiento}-${mesNacimiento}-${diaNacimiento}`
    );
    const edadMilisegundos = Date.now() - fechaNacimientoDate.getTime();
    const edad = new Date(edadMilisegundos).getFullYear() - 1970;
    return edad;
  };

  const generarCodigo = () => {
    const edad = calcularEdad();

    if (edad >= 18) {
      const nuevoCodigo = Math.random().toString(36).substring(7);
      setCodigoGenerado(nuevoCodigo);

      const nuevoRegistro = {
        dni: formulario.dni,
        horaGeneracion: new Date().toLocaleTimeString(),
      };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      nombre,
      dni,
      diaNacimiento,
      mesNacimiento,
      anoNacimiento,
      usuarioInstagram,
    } = formulario;

    if (
      !nombre ||
      !dni ||
      !diaNacimiento ||
      !mesNacimiento ||
      !anoNacimiento ||
      !usuarioInstagram
    ) {
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
      diaNacimiento: "",
      mesNacimiento: "",
      anoNacimiento: "",
      usuarioInstagram: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  return (
    <div className="columns is-centered mt-3 p-5">
      <div className="column is-half">
        <h1 className="title is-1 has-text-centered is-size-3">
          Test Cupón Cervecería
        </h1>
        {showAlert && <AlertMessage message={alertMessage} type={alertType} />}
        <form onSubmit={handleSubmit}>
          <div className="field mb-2">
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

          <label className="label">Fecha de Nacimiento:</label>
          <div className="field is-mobile is-flex">
            <div className="column is-one-third-mobile fecha-input">
              <input
                className="input"
                type="number"
                name="diaNacimiento"
                placeholder="Día"
                value={formulario.diaNacimiento}
                onChange={handleChange}
              />
            </div>
            <div className="column is-one-third-mobile fecha-input-m">
              <input
                className="input"
                type="number"
                name="mesNacimiento"
                placeholder="Mes (número)"
                value={formulario.mesNacimiento}
                onChange={handleChange}
              />
            </div>
            <div className="column is-one-third-mobile fecha-input">
              <input
                className="input"
                type="number"
                name="anoNacimiento"
                placeholder="Año"
                value={formulario.anoNacimiento}
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
