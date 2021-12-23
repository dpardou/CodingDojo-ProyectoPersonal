import { Cancel } from "@material-ui/icons";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import logo from './miEspacioApp.png'

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("http://localhost:8000/api/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <PersonAddIcon className="logoIcon" />
        <span>Registro Usuario</span>
      </div>
      <img className="logoME" src={logo} alt="logo"></img>
      <form onSubmit={handleSubmit}>
        <input type="text" autoFocus placeholder="username" required ref={usernameRef} />
        <input type="email" placeholder="email" required ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          required
          ref={passwordRef}
        />
        <button className="registerBtn" type="submit">
          Registrar
        </button>
        {success && (
          <span className="success">Registro completado. Se puede logear ahora!</span>
        )}
        {error && <span className="failure">Ocurrió un problema!, intente nuevamente</span>}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
