import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';

export default function Editar({ onClose, id }) {

  const [user, setUser] = useState({
    "nombre": "Miguel Pérez",
    "edad": "38",
    "ciudad": "Quito",
    "intereses": ["Montañismo", "Fotografía", "Jardinería"],
    "trabajo": {
      "puesto": "Fotógrafo",
      "empresa": "Imagen Natural",
      "experiencia": "10 años"
    },
    "foto64": "l"
  });

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertFileToBase64(file);

    if (file) {
        setUser((prevFormData) => ({
            ...prevFormData,
            foto64: base64,
        }));
        // Se usa la función de devolución de llamada opcional para acceder al estado actualizado
        setUser((prevFormData) => {
            console.log(prevFormData);
            return prevFormData;
        });
    }
};

  const handleFormSubmit = async () => {
    try {
      console.log(user);
      console.log('A ver que onda');
      const data = await api.updateUserById(id, user);
      console.log(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    onClose('');
  };

  const handleInputChange = (e, field, extrafield) => {
    const value = e.target.value;

    if (['nombre', 'edad', 'ciudad', 'intereses'].includes(field)) {
      if (field == 'intereses') {
        setUser((prevFormData) => ({
          ...prevFormData,
          [field]: value.split(", "),
        }))

      }
      else {
        setUser((prevFormData) => ({
          ...prevFormData,
          [field]: value,
        }));
      }
    } else {
      setUser((prevFormData) => ({
        ...prevFormData,
        trabajo: {
          ...prevFormData.trabajo,
          [extrafield]: value,
        }
      }));
    }
    console.log(user)
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  // Funciones específicas para cada campo
  const handleNameChange = (e) => handleInputChange(e, 'nombre');
  const handleEdadChange = (e) => handleInputChange(e, 'edad');
  const handleCiudadChange = (e) => handleInputChange(e, 'ciudad');
  const handleInteresesChange = (e) => handleInputChange(e, 'intereses');
  const handleTrabajoChange = (e) => handleInputChange(e, 'trabajo', 'puesto');
  const handleEmpresaChange = (e) => handleInputChange(e, 'trabajo', 'empresa');
  const handleExperienciaChange = (e) => handleInputChange(e, 'trabajo', 'experiencia');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await api.getUserById(id);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
        <div className={`w-3/4 h-3/4 rounded-xl flex items-center justify-center mt-36 p-4 fixed w-full top-0`}>
          <div className={`flex bg-gray-100 h-full rounded-xl m-1.5 text-black border items-center overflow-hidden justify-center`}>
            <div className={`h-full w-auto aspect-square flex items-center align-center`} >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {user.foto64 ?
                <img src={user.foto64} onClick={handleButtonClick} className={'h-full aspect-square flex object-cover'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} />
                :
                <button onClick={handleButtonClick} className={'h-full w-full items-center flex align-center text-center'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>Agrega una foto tuya, en formato cuadrado</button>
              }
            </div>
            <div className={`flex w-full flex-col ml-16 mr-16`}>
              <div className={`flex w-full mb-8 text-4xl text-gray-400`}>
                <input className={`w-full h-full`} onChange={handleNameChange} value={user.nombre} />
              </div>
              <div className={`flex w-full mb-8 text-4xl text-gray-400`}>
                <input className={`w-full h-full`} onChange={handleEdadChange} value={user.edad} />
              </div>
              <div className={`flex w-full mb-8 text-4xl text-gray-400`}>
                <input className={`w-full h-full`} onChange={handleCiudadChange} value={user.ciudad} />
              </div>
              <div className={`flex w-full mb-4 text-xl text-gray-400`}>
                <input className={`w-full h-full`} onChange={handleInteresesChange} value={user.intereses.join(', ')} />
              </div>
              <div className={`flex w-full mb-4 text-3xl text-gray-400`}>
                <input className={`w-full h-full`} onChange={handleTrabajoChange} value={user.trabajo.puesto} />
              </div>
              <div className={`flex w-full mb-4 text-3xl text-gray-400`}>
                <input className={`w-full h-full`} onChange={handleEmpresaChange} value={user.trabajo.empresa} />
              </div>
              <div className={`flex w-full mb-4 text-2xl text-gray-400`}>
                <input className={`w-full h-full`} onChange={handleExperienciaChange} value={user.trabajo.experiencia} />
              </div>
              <div className={`flex w-full mb-4 place-items-end`}>
                <button onClick={handleFormSubmit} className="flex bg-blue-500 text-white mr-3 px-4 py-2 rounded-md">Subir</button>
                <button onClick={() => { onClose('') }} className="flex bg-red-500 text-white mr-3 px-4 py-2 rounded-md">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
