import React from "react";
import axios from "axios"; // Usamos axios para enviar la solicitud HTTP

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();

    const { name, email, password } = state;
    
    try {
      // Enviar la solicitud POST al backend para crear un nuevo usuario
      const response = await axios.post('https://redesproyec.myvnc.com/users', {
        nombre: name,
        email: email,
        password: password
      });

      alert(response.data.message);  // Mostrar mensaje de éxito
      setState({ name: "", email: "", password: "" });  // Limpiar los campos del formulario
    } catch (error) {
      alert('Error al crear el usuario: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
