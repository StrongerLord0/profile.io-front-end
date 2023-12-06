import api from './services/api'

export default function Card ({ props, onDelete, onEdit }) {
    const handleDeleteItem = async (id) => {
        try {
          await api.deleteUserById(id);
          onDelete(id); // Llama a la función onDelete para actualizar el estado
        } catch (error) {
          console.log('Error deleting user: ', error);
        }
    }

    return (
        <div className={`w-3/4 h-3/4 rounded-xl flex items-center justify-center mt-36`}>
            <div className={`flex bg-gray-100 w-full h-full rounded-xl m-1.5 text-black border items-center overflow-hidden`}>
                <img src={props.foto64} className={`h-full aspect-square flex object-cover`} />
                <div className={`flex w-full flex-col ml-16 mr-16`}>
                    <div className={`flex w-auto p-4 text-5xl`}>{props.nombre}, {props.edad}</div>
                    <div className={`flex w-auto p-4 text-4xl mb-4 text-gray-400`}>{props.ciudad}</div>
                    <div className={`flex w-auto p-4 text-xl mb-2 flex-wrap`}>
                        {props.intereses.map(element => (
                            <div key={element} className={`flex pt-2 pb-2 pl-4 pr-4 bg-gray-200 rounded-2xl m-2 text-gray-400`}>
                                {element}
                            </div>
                        ))}
                    </div>
                    <div className={`flex w-auto p-2 text-6xl text-gray-600`}>{props.trabajo.empresa}</div>
                    <div className={`flex w-auto p-2 text-3xl text-gray-400`}>{props.trabajo.puesto}</div>
                    <div className={`flex w-auto p-2 text-2xl text-gray-500`}>{props.trabajo.experiencia}</div>
                    <div className={`flex w-full mt-16 place-items-end`}>
                        <button onClick={() => {onEdit(props._id)}} className="flex bg-blue-500 text-white mr-3 px-4 py-2 rounded-md">Editar</button>
                        <button onClick={() => {handleDeleteItem(props._id)}} className="flex bg-red-500 text-white mr-3 px-4 py-2 rounded-md">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}