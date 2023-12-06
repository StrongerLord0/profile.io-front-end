import React, { useState, useRef } from 'react';
import api from '../services/api';

export default function Subir({ onClose }) {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    ciudad: '',
    intereses: '',
    trabajo: {
      puesto: '',
      empresa: '',
      experiencia: '',
    },
    foto64: '',
  });

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (file) {
        const base64 = await convertFileToBase64(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          foto64: base64,
        }));
      }
  };

  const handleFormSubmit = async () => {
    try {
      const data = await api.createUser(formData);
      console.log(data);
    } catch (error) {
      console.error('Error creating users:', error);
    }
    onClose('');
  };

  const handleInputChange = (e, field, extrafield) => {
    const value = e.target.value;

    if(['nombre', 'edad', 'ciudad', 'intereses'].includes(field)){
        if(field == 'intereses'){
            setFormData((prevFormData) => ({
                ...prevFormData,
                [field]: value.split(", "),
            }))

        }
        else {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
          }));
        }
    } else {
        setFormData((prevFormData) => ({
            ...prevFormData,
            trabajo:{
                ...prevFormData.trabajo,
                [extrafield]: value,
            }
        }));
    }
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

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
        <div className={`w-3/4 h-3/4 rounded-xl flex items-center justify-center mt-36 p-4 fixed w-full top-0`}>
          <div className={`flex bg-gray-100 h-full rounded-xl m-1.5 text-black border items-center overflow-hidden justify-center`}>
            <div className={`h-full w-auto aspect-square flex items-center align-center`} style={{backgroundImage: `url(${formData.foto64})`, backgroundSize:'cover',backgroundPosition:'center'}} >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {formData.foto64 ?
              <img onClick={handleButtonClick} className={'h-full w-full items-center flex align-center text-center'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}/>
              :
              <button onClick={handleButtonClick} className={'h-full w-full items-center flex align-center text-center'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>Agrega una foto tuya, en formato cuadrado</button>
              }
              </div>
            <div className={`flex w-full flex-col ml-16 mr-16`}>
              <div className={`flex w-full mb-8 text-4xl text-gray-400`}>
                <input placeholder='Nombre... "Israel Chacón Rojo"' className={`w-full h-full`} onChange={handleNameChange} />
              </div>
              <div className={`flex w-full mb-8 text-4xl text-gray-400`}>
                <input placeholder='Edad... "21 años"' className={`w-full h-full`} onChange={handleEdadChange} />
              </div>
              <div className={`flex w-full mb-8 text-4xl text-gray-400`}>
                <input placeholder='Ciudad... "Chihuahua, Chihuahua, México"' className={`w-full h-full`} onChange={handleCiudadChange} />
              </div>
              <div className={`flex w-full mb-4 text-xl text-gray-400`}>
                <input placeholder='Intereses... "Jugar, Comer, Ciclismo"' className={`w-full h-full`} onChange={handleInteresesChange} />
              </div>
              <div className={`flex w-full mb-4 text-3xl text-gray-400`}>
                <input placeholder='Puesto de trabajo... "Ingeniero en Sistemas Computacionales"' className={`w-full h-full`} onChange={handleTrabajoChange} />
              </div>
              <div className={`flex w-full mb-4 text-3xl text-gray-400`}>
                <input placeholder='Empresa... "Chimex"' className={`w-full h-full`} onChange={handleEmpresaChange} />
              </div>
              <div className={`flex w-full mb-4 text-2xl text-gray-400`}>
                <input placeholder='Experiencia... "21 años"' className={`w-full h-full`} onChange={handleExperienciaChange} />
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
