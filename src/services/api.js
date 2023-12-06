// Definición de la URL base para las solicitudes a la API
const BASE_URL = 'http://localhost:3000/users';

// Objeto que contiene funciones para interactuar con la API
const api = {
  // Obtiene todos los usuarios
  getAllUsers: async () => {
    try {
      const response = await fetch(`${BASE_URL}/`);
      return response.json(); // Devuelve los datos en formato JSON
    } catch (error) {
      console.error('Error fetching users:', error); // Registra el error en la consola
      throw error; // Lanza una excepción para manejar el error
    }
  },

  // Obtiene un usuario por nombre
  getUserByName: async (name) => {
    try {
      const response = await fetch(`${BASE_URL}/${name}`);
      return response.json(); // Devuelve los datos en formato JSON
    } catch (error) {
      console.error('Error fetching user by name:', error); // Registra el error en la consola
      throw error; // Lanza una excepción para manejar el error
    }
  },

  // Obtiene un usuario por ID
  getUserById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/id/${id}`);
      return response.json(); // Devuelve los datos en formato JSON
    } catch (error) {
      console.error('Error fetching user by id:', error); // Registra el error en la consola
      throw error; // Lanza una excepción para manejar el error
    }
  },

  // Crea un nuevo usuario
  createUser: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return response.json(); // Devuelve los datos en formato JSON
    } catch (error) {
      console.error('Error creating user:', error); // Registra el error en la consola
      throw error; // Lanza una excepción para manejar el error
    }
  },

  // Actualiza un usuario por ID
  updateUserById: async (id, userData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return response.json(); // Devuelve los datos en formato JSON
    } catch (error) {
      console.error('Error updating user by ID:', error); // Registra el error en la consola
      throw error; // Lanza una excepción para manejar el error
    }
  },

  // Elimina un usuario por ID
  deleteUserById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      return response.json(); // Devuelve los datos en formato JSON
    } catch (error) {
      console.error('Error deleting user by ID:', error); // Registra el error en la consola
      throw error; // Lanza una excepción para manejar el error
    }
  },
};

// Exporta el objeto api para su uso en otros archivos
export default api;