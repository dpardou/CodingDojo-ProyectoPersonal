import { Cancel } from "@material-ui/icons";
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";
import logo from './miEspacioApp.png'

export default function Login({ setShowLogin, setCurrentUsername,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("http://localhost:8000/api/login", user);
      setCurrentUsername(res.data.username);
      console.log(setCurrentUsername)
      myStorage.setItem('user', res.data.username);
      console.log(user)
      setShowLogin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <AccessibleForwardIcon className="logoIcon" />
        <span>Login</span>
        
      </div>
      <img className="logoME" src={logo} alt="logo"></img>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Ocurrió algún problema!, intente nuevamente...</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
