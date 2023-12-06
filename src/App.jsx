import { useState, useEffect } from 'react'
import NavBar from './Navbar'
import api from './services/api'
import Card from './Card'
import Editar from './extraComponents/Editar'
import Subir from './extraComponents/Subir'


function App() {
  const [ventana, setVentana] = useState('');
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [tempId, setTempId] = useState('');

  const handleInputChange = (filter) => {
    setFilter(filter);
  }

  const handleNavbarClick = (ventana) => {
    setVentana(ventana);
    const fetchUsers = async () => {
      try {
        const usersData = await api.getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  };

  const handleDeleteUser = (deletedUserId) => {
    // Actualiza el estado eliminando el usuario correspondiente
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deletedUserId));
  };

  const handleUpdatedUser = (updatedUserId) => {
    setVentana('editar');
    setTempId(updatedUserId);
  }

  useEffect(() => {
    const fetchFilteredUsers = async () => {
      try {
        const usersData = await api.getUserByName(filter);
        setUsers(usersData);
      } catch (error) {
        console.log('Error fetching filtered users: ', error);
      }
    };

    fetchFilteredUsers();
  }, [filter]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await api.getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);

  return (
    <>
      <div className={`flex flex-wrap flex-grow bg-white h-screen content-start overflow-auto items-center justify-center`}>
      <NavBar onNavBarClick={handleNavbarClick} onNavBarChange={handleInputChange} inputValue={filter}/>
        {
          users.map((data, index) => {
            return <Card key={index} props={data} onDelete={handleDeleteUser} onEdit={handleUpdatedUser}/>;
          })
        }
        <div className={`flex bg-white h-20 w-full content-start overflow-auto items-center justify-center`}></div>
      </div>
      {ventana === 'subir' && <Subir onClose={handleNavbarClick}/>}
      {ventana === 'editar' && <Editar onClose={handleNavbarClick} id={tempId}/>}
    </>
  )
}

export default App
