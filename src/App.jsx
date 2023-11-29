import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { LOCAL_STORAGE_KEYS } from "./utils/constans";
import { handleFetch } from "./utils/handleFetch";
import html2canvas from "html2canvas";
import { Form } from "./components/Form/Form";
import { Coupon } from "./components/Cupon/Cupon";
import { NotificacionDisponibilidad } from "./components/NotificacionDisponibilidad/NotificacionDisponibilidad";
import { AlertMessage } from "./components/Alert/Alert";
import "./App.css";

const App = () => {
  const getInitialState = () => {
    const storedUltimoRegistro =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ULTIMO_REGISTRO)) ||
      {};
    const storedFechaValidez =
      localStorage.getItem(LOCAL_STORAGE_KEYS.FECHA_VALIDEZ) || null;

    const tiempoRestante = storedFechaValidez
      ? Math.floor((new Date(storedFechaValidez).getTime() - Date.now()) / 1000)
      : 0;

    return {
      ultimoRegistro: storedUltimoRegistro,
      tiempoRestante,
      codigoGenerado: storedUltimoRegistro.codigoGenerado || "",
      formulario: {
        nombre: "",
        dni: "",
        codigoValidado: false,
        diaNacimiento: "",
        mesNacimiento: "",
        anoNacimiento: "",
        correoElectronico: "",
        seleccionBar: "",
      },
    };
  };

  const [estado, setEstado] = useState(getInitialState());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isFormAvailable, setIsFormAvailable] = useState(false);

  useEffect(() => {
    const calculateFormAvailability = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const hourOfDay = now.getHours();

      const isAvailable =
        dayOfWeek >= 1 && dayOfWeek <= 4 && hourOfDay >= 19 && hourOfDay < 22;

      setIsFormAvailable(isAvailable);
    };

    calculateFormAvailability();
  }, []);

  useEffect(() => {
    const updateLocalStorageAndState = () => {
      const storedUltimoRegistro =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ULTIMO_REGISTRO)) ||
        {};
      setEstado((prevEstado) => ({
        ...prevEstado,
        ultimoRegistro: storedUltimoRegistro,
      }));

      const existingCode = storedUltimoRegistro.codigoGenerado;
      if (existingCode) {
        setEstado((prevEstado) => ({
          ...prevEstado,
          codigoGenerado: existingCode,
        }));
      }

      const storedFechaValidez = localStorage.getItem(
        LOCAL_STORAGE_KEYS.FECHA_VALIDEZ
      );
      if (storedFechaValidez) {
        const tiempoRestante = Math.floor(
          (new Date(storedFechaValidez).getTime() - Date.now()) / 1000
        );
        setEstado((prevEstado) => ({
          ...prevEstado,
          tiempoRestante,
        }));
      }
    };

    updateLocalStorageAndState();
  }, []);

  useEffect(() => {
    const startCountdown = () => {
      let intervalId;

      if (estado.tiempoRestante > 0) {
        intervalId = setInterval(() => {
          setEstado((prevEstado) => ({
            ...prevEstado,
            tiempoRestante: prevEstado.tiempoRestante - 1,
          }));
        }, 1000);
      } else {
        eliminarRegistro();
      }

      return () => clearInterval(intervalId);
    };

    startCountdown();
  }, [estado.tiempoRestante]);

  const showAlertMessage = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleDownload = async () => {
    const target = document.getElementById("cupon");
    const canvas = await html2canvas(target);
    canvas.toBlob((blob) => {
      saveAs(blob, "codigo_generado.jpg");
    });
  };

  const calcularEdad = () => {
    const { diaNacimiento, mesNacimiento, anoNacimiento } = estado.formulario;
    const fechaNacimientoDate = new Date(
      `${anoNacimiento}-${mesNacimiento}-${diaNacimiento}`
    );
    const edadMilisegundos = Date.now() - fechaNacimientoDate.getTime();
    const edad = new Date(edadMilisegundos).getFullYear() - 1970;
    return edad;
  };

  const generarCodigo = async () => {
    const edad = calcularEdad();

    if (edad >= 18) {
      const nuevoCodigo = Math.random().toString(36).substring(7);
      const fechaGeneracion = new Date();

      const nuevoRegistro = {
        dni: estado.formulario.dni,
        nombre: estado.formulario.nombre,
        correoElectronico: estado.formulario.correoElectronico,
        diaNacimiento: estado.formulario.diaNacimiento,
        mesNacimiento: estado.formulario.mesNacimiento,
        anoNacimiento: estado.formulario.anoNacimiento,
        seleccionBar: estado.formulario.seleccionBar,
        horaGeneracion: fechaGeneracion.toLocaleTimeString(),
        codigoGenerado: nuevoCodigo,
      };

      setEstado((prevEstado) => ({
        ...prevEstado,
        codigoGenerado: nuevoCodigo,
        ultimoRegistro: nuevoRegistro,
      }));

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ULTIMO_REGISTRO,
        JSON.stringify(nuevoRegistro)
      );

      const fechaValidez = new Date(fechaGeneracion);
      fechaValidez.setSeconds(fechaValidez.getSeconds() + 30);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.FECHA_VALIDEZ,
        fechaValidez.toISOString()
      );

      const tiempoRestante = Math.floor(
        (fechaValidez.getTime() - Date.now()) / 1000
      );

      setEstado((prevEstado) => ({
        ...prevEstado,
        tiempoRestante,
      }));

      await handleFetch(nuevoRegistro);
    } else {
      showAlertMessage(
        "Debes ser mayor de 18 años para generar un código.",
        "danger"
      );
    }
  };

  const eliminarRegistro = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.FECHA_VALIDEZ);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ULTIMO_REGISTRO);

    setEstado((prevEstado) => ({
      ...prevEstado,
      codigoGenerado: "",
      tiempoRestante: 0,
      ultimoRegistro: {},
    }));
  };

  const calcularFechaValidez = () => {
    const fechaValidezString = localStorage.getItem(
      LOCAL_STORAGE_KEYS.FECHA_VALIDEZ
    );
    if (!fechaValidezString) {
      return "Fecha de validez no disponible";
    }

    const fechaValidez = new Date(fechaValidezString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return fechaValidez.toLocaleDateString("es-ES", options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      nombre,
      dni,
      diaNacimiento,
      mesNacimiento,
      anoNacimiento,
      correoElectronico,
      seleccionBar,
    } = estado.formulario;

    if (
      !nombre ||
      !dni ||
      !diaNacimiento ||
      !mesNacimiento ||
      !anoNacimiento ||
      !correoElectronico ||
      !seleccionBar
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

    const existeRegistro = estado.ultimoRegistro.dni === dni;

    if (existeRegistro) {
      showAlertMessage(
        "No puedes generar otro código con el mismo DNI en menos de 24 horas.",
        "warning"
      );
      return;
    }

    generarCodigo();
    setEstado((prevEstado) => ({
      ...prevEstado,
      formulario: {
        nombre: "",
        dni: "",
        diaNacimiento: "",
        mesNacimiento: "",
        anoNacimiento: "",
        correoElectronico: "",
        seleccionBar: "",
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstado((prevEstado) => ({
      ...prevEstado,
      formulario: {
        ...prevEstado.formulario,
        [name]: value,
      },
    }));
  };

  const handleCodigoValidado = () => {
    const registroActualizado = {
      ...estado.ultimoRegistro,
      codigoValidado: true,
    };

    setEstado((prevEstado) => ({
      ...prevEstado,
      ultimoRegistro: registroActualizado,
    }));

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ULTIMO_REGISTRO,
      JSON.stringify(registroActualizado)
    );
  };

  return (
    <div
      className="columns is-centered p-5"
      style={{
        backgroundImage: 'url("bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="column is-half is-flex is-justify-content-center">
        <div className="box has-background-white-bis has-shadow p-5">
          <h1 className="title is-1 has-text-centered is-size-3 mb-4">
            Test Cupón Cervecería
          </h1>
          {showAlert && (
            <AlertMessage message={alertMessage} type={alertType} />
          )}
          {isFormAvailable ? (
            estado.codigoGenerado ? (
              <Coupon
                estado={estado}
                handleDownload={handleDownload}
                handleCodigoValidado={handleCodigoValidado}
                calcularFechaValidez={calcularFechaValidez}
              />
            ) : (
              <Form
                estado={estado}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )
          ) : (
            <NotificacionDisponibilidad />
          )}
        </div>
      </div>
    </div>
  );
};

export { App };
