import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { Form } from "./components/Form/Form";
import { Coupon } from "./components/Cupon/Cupon";
import { NotificacionDisponibilidad } from "./components/NotificacionDisponibilidad/NotificacionDisponibilidad";
import { AlertMessage } from "./components/Alert/Alert";
import "./App.css";
import { LOCAL_STORAGE_KEYS } from "./utils/constans";
import { handleFetch } from "./utils/handleFetch";

const FormApp = () => {
  const isFormAvailableNow = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hourOfDay = now.getHours();
    const minutes = now.getMinutes();

    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    const isWithinValidHours =
      (hourOfDay === 19 && minutes >= 0) ||
      (hourOfDay > 19 && hourOfDay < 21) ||
      (hourOfDay === 21 && minutes <= 30);

    return isWeekday && isWithinValidHours;
  };

  const getInitialState = () => {
    const storedUltimoRegistro =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ULTIMO_REGISTRO)) ||
      {};

    return {
      ultimoRegistro: storedUltimoRegistro,
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
      isFormAvailable: isFormAvailableNow(),
    };
  };

  const [estado, setEstado] = useState(getInitialState());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

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

        // Verificar si es después de las 21:30 para limpiar el localStorage
        const now = new Date();
        const horaLimiteLimpieza = new Date(now);
        horaLimiteLimpieza.setHours(21, 40, 0, 0);

        if (now > horaLimiteLimpieza) {
          // Limpiar localStorage si es después de las 21:30
          localStorage.removeItem(LOCAL_STORAGE_KEYS.ULTIMO_REGISTRO);
        }
      }
    };

    updateLocalStorageAndState();
  }, []);

  const showAlertMessage = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDownload = async () => {
    const target = document.getElementById("cupon");
    const canvas = await html2canvas(target);
    canvas.toBlob((blob) => {
      saveAs(blob, "CUPÓN-LISO.jpg");
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
        horaGeneracion: fechaGeneracion.toLocaleString(),
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
      await handleFetch(nuevoRegistro);
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
    <div className="column is-half is-flex is-justify-content-center">
      <div className="box has-background-white-bis has-shadow p-5">
        {showAlert && <AlertMessage message={alertMessage} type={alertType} />}
        <Form
          estado={estado}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export { FormApp };
