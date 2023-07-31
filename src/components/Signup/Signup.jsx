import styles from "./Signup.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { InputControl } from "../InputControl/InputControl";

export function Signup() {
  // Obtiene la función "navigate" de react-router-dom para poder redirigir a otras rutas
  const navigate = useNavigate();

  // Estado local que almacena los valores del formulario (nombre, email, contraseña)
  const [values, setValues] = useState({ name: "", email: "", pass: "" });

  // Estado local para almacenar un mensaje de error si el formulario no está completo
  const [error, setError] = useState("");

  // Estado local para controlar si el botón de envío del formulario está deshabilitado o no
  const [submitButtonDisable, setSubmitButtonDisable] = useState(false);

  // Función para realizar el registro de usuario
  const registro = () => {
    // Verifica que todos los campos del formulario estén completos, de lo contrario, muestra un mensaje de error
    if (!values.name || !values.email || !values.pass) {
      setError("Llene todos los campos");
      return;
    }

    // Si todos los campos están completos, se borra el mensaje de error
    setError("");

    // Se deshabilita el botón de envío para evitar múltiples envíos mientras se realiza el registro
    setSubmitButtonDisable(true);

    // Se crea un nuevo usuario utilizando la función "createUserWithEmailAndPassword" de Firebase Auth
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        // Si el registro es exitoso, se habilita nuevamente el botón de envío
        setSubmitButtonDisable(false);

        // Se actualiza el perfil del usuario recién creado con el nombre ingresado en el formulario
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });

        // Se redirige al usuario a la página de inicio ("/") después del registro exitoso
        navigate("/");
      })
      .catch((err) => {
        // Si hay un error durante el registro, se habilita nuevamente el botón de envío y se muestra el mensaje de error
        setSubmitButtonDisable(false);
        setError(err.message);
      });
  };

  // Renderizado del componente
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}> Registro</h1>
        {/* Componente personalizado "InputControl" para el formulario */}
        <InputControl
          label="Nombre"
          placeholder="Ingrese un nombre"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Ingrese un correo"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Contraseña"
          placeholder="Ingrese una contraseña"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <div className={styles.footer}>
          {/* Muestra el mensaje de error en caso de que haya uno */}
          <b className={styles.error}>{error}</b>

          {/* Botón de envío del formulario */}
          <button onClick={registro} disabled={submitButtonDisable}>
            Guardar
          </button>

          {/* Enlace para dirigirse a la página de inicio de sesión */}
          <p>
            Si ya tienes una cuenta inicia sesión
            <span>
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
