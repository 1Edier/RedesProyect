  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";


  function SignInForm() {
    const [state, setState] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (evt) => {
      const value = evt.target.value;
      setState({
        ...state,
        [evt.target.name]: value,
      });
    };

    const handleOnSubmit = async (evt) => {
      evt.preventDefault();

      const { email, password } = state;

      if (!email || !password) {
        setError("Por favor, ingresa tu correo y contraseña.");
        return;
      }

      try {
        const response = await fetch("https://redesproyec.myvnc.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        

        const data = await response.json();

        if (response.ok) {
          navigate("/Home");

          
        } else {
          setError(data.message || "Inicio de sesión fallido. Intenta de nuevo.");
        }
      } catch (error) {
        setError("Ocurrió un error: " + error.message);
      }

      setState({
        email: "",
        password: "",
      });
    };

    return (
      <div className="form-container sign-in-container">
        <form onSubmit={handleOnSubmit}>
          <h1>Iniciar sesión</h1>
          <input
            placeholder="Correo"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={state.password}
            onChange={handleChange}
          />
          <button>Iniciar sesión</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  export default SignInForm;
