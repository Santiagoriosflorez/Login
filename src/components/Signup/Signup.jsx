import styles from "./Signup.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { InputControl } from "../InputControl/InputControl";
export function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", pass: "" });
  const [error, setError] = useState([]);

  const [submitButtonDisable, setSubmitButtonDisable] = useState(false);
  const registro = () => {
    if (!values.name || !values.email || !values.pass) {
      setError("Llene todos los campos");
      return;
    }
    setError("");
    setSubmitButtonDisable(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisable(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisable(false);
        setError(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}> Registro</h1>
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
          placeholder="Ingrese un Contraseña"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <di className={styles.footer}>
          <b className={styles.error}>{error}</b>
          <button onClick={registro} disabled={submitButtonDisable}>Guardar</button>
          <p>
            Si ya tienes una cuenta iniciar sesion
            <span>
              <Link to ="/">Login</Link>
            </span>
          </p>
        </di>
      </div>
    </div>
  );
}
