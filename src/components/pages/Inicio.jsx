import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersManager = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ email: "", nombre: "" });

  // Obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://redesproyec.myvnc.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    }
  };

  // Manejar la selección de un usuario para edición
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFormData({ email: user.correo, nombre: user.nombre });
  };

  // Actualizar usuario
  const updateUser = async (id) => {
    try {
      await axios.put(`https://redesproyec.myvnc.com/users/${id}`, formData);
      alert("Usuario actualizado con éxito");
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://redesproyec.myvnc.com/users/${id}`);
      alert("Usuario eliminado con éxito");
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={{color:'black'}}>Gestión de Usuarios</h1>
      
      <div style={styles.tableContainer}>
        <h2>Lista de Usuarios</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_usuario}>
                <td>{user.nombre}</td>
                <td>{user.correo}</td>
                <td>
                  <button
                    style={styles.button}
                    onClick={() => handleSelectUser(user)}
                  >
                    Editar
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => deleteUser(user.id_usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div style={styles.formContainer}>
          <h2>Editar Usuario</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(selectedUser.id_usuario);
            }}
          >
            <div style={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.submitBtn}>
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              style={styles.cancelBtn}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "black", // Establece color negro para todo el texto dentro del contenedor
  },
  tableContainer: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    color: "black", // Establece color negro para el texto de la tabla
  },
  button: {
    padding: "8px 12px",
    margin: "0 5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "black",
    borderRadius: "4px",
  },
  formContainer: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    color: "black", // Establece color negro para el texto dentro del formulario
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    color: "black", // Establece color negro para el texto dentro de los campos de entrada
  },
  submitBtn: {
    backgroundColor: "#4CAF50",
    color: "black",
    padding: "10px 20px",
    borderRadius: "5px",
  },
  cancelBtn: {
    backgroundColor: "#f44336",
    color: "black",
    padding: "10px 20px",
    borderRadius: "5px",
    marginLeft: "10px",
  },
};

export default UsersManager;
