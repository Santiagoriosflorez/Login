import styles from "./Login.module.css";
import {InputControl} from "../InputControl/InputControl";
import { Link,useNavigate } from "react-router-dom";
import {auth} from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export function Login() {
  const navigate =useNavigate();
  const [values,setValues] = useState ({email:"",
pass:""})
const [error,setError] = useState([]);
const [submitButtonDisabled,setSubmitButtonDisabled] = useState(false);
const Loguearse=()=>{
   if(!values.email || !values.pass){
    setError("Datos incompletos")
    return;
   }

   setError("");
   setSubmitButtonDisabled(true);
   signInWithEmailAndPassword (auth,values.email,values.pass)
   .then(async(res)=>{
    setSubmitButtonDisabled(false);
    alert("Bienvenido");
    navigate("/mapview")
   })
   
   .catch((err)=>{
    setSubmitButtonDisabled(false);
    setError(err.message);
   });

  
};
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>LOGIN</h1>
        <InputControl label="Correo" onChange={(event)=>setValues((prev)=>({...prev,email:event.target.value}))}
        placeholder="Ingrese su correo"/>
        <InputControl label="Contraseña" onChange={(event)=>setValues((prev)=>({...prev,pass:event.target.value}))}
        placeholder="Ingrese su Contraseña"/>
        <div className={styles.footer}>
          <b className={styles.error}>{error}</b>
          <button onClick={Loguearse} disabled={submitButtonDisabled}>
                Iniciar Sesion
          </button>

          <p>
            ¿No tienes cuenta registrate?
            <span>
                <Link to="/Signup" >Registrar</Link>
            </span>
          </p>
          <p>
            ¿Olvidase contraseña?
            <span>
              <Link to ="/password">ir</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
  }
