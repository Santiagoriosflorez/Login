import styles from "./Login.module.css";
import {InputControl} from "../InputControl/InputControl";
import { Link,useNavigate } from "react-router-dom";
import {auth} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export function Login() {
    // Estado para almacenar el correo electrónico y contraseña ingresados por el usuario
    const [values, setValues] = useState({ email: "", pass: "" });
    // Estado para manejar los errores que puedan ocurrir durante el inicio de sesión
    const [error, setError] = useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  
    // Función que se ejecuta al hacer clic en el botón de inicio de sesión
    const Loguearse = () => {
      // Validar si se ingresó el correo electrónico y la contraseña
      if (!values.email || !values.pass) {
        setError("Datos incompletos");
        return;
      }
  
      setError(""); // Limpiar cualquier mensaje de error anterior
      setSubmitButtonDisabled(true); // Deshabilitar el botón de inicio de sesión durante el proceso de autenticación
  
      // Iniciar sesión con el correo electrónico y contraseña utilizando Firebase Auth
      signInWithEmailAndPassword(auth, values.email, values.pass)
        .then(async (res) => {
          setSubmitButtonDisabled(false); // Habilitar nuevamente el botón de inicio de sesión
          alert("Bienvenido"); // Mostrar un mensaje de bienvenida 
          navigate("/mapview"); // Redirigir al usuario a la vista de mapa 
        })
        .catch((err) => {
          setSubmitButtonDisabled(false); // Habilitar nuevamente el botón de inicio de sesión
          setError(err.message); // Almacenar el mensaje de error en el estado para mostrarlo al usuario
        });
    };
  
    // Renderizado del componente
    return (
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h1 className={styles.heading}>LOGIN</h1>
          {/* Componente personalizado "InputControl" para el correo electrónico */}
          <InputControl
            label="Correo"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Ingrese su correo"
          />
          {/* Componente personalizado "InputControl" para la contraseña */}
          <InputControl
            label="Contraseña"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Ingrese su Contraseña"
          />
          <div className={styles.footer}>
            <b className={styles.error}>{error}</b>
            {/* Botón para iniciar sesión, que ejecuta la función Loguearse */}
            <button onClick={Loguearse} disabled={submitButtonDisabled}>
              Iniciar Sesión
            </button>
  
            <p>
              ¿No tienes cuenta? Regístrate{" "}
              <span>
                <Link to="/Signup">aquí</Link>
              </span>
            </p>
            <p>
              ¿Olvidaste la contraseña? Haz clic{" "}
              <span>
                <Link to="/password">aquí</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }