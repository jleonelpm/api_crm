import { useNavigate } from "react-router-dom";

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()

    //asignamos a un nuevo objeto el objeto que viene del props
    const {nombre, empresa, email, telefono, notas, id} = cliente

  return (
    <tr>
        <td className=' p-3'>{id}</td>
        <td className=' p-3'>{nombre}</td>
        <td className=' p-3'>{empresa}</td>
        <td className=' p-3'>
            <p><span className=' text-gray-800 uppercase font-bold'> Email: </span>{email}</p>
            <p><span className=' text-gray-800 uppercase font-bold'> Tel: </span>{telefono}</p>            
        </td>      

        <td className=' p-3'>
        <button
        type='button'
        className='bg-green-500 hover:bg-green-300 block w-full text-white uppercase p-1 font-bold text-xs rounded-md'
        onClick={() => navigate (`/clientes/${id}`)} //Usar backtick en lugar de comillas
        >
            Ver
        </button>
    
        <button
        type='button'
        className='bg-blue-500 hover:bg-blue-300 block w-full text-white uppercase p-1 font-bold text-xs rounded-md mt-1'
        onClick={() => navigate (`/clientes/editar/${id}`)} //Usar backtick en lugar de comillas

        >
            Editar
        </button>
        <button
        type='button'
        className='bg-red-500 hover:bg-red-300 block w-full text-white uppercase p-1 font-bold text-xs rounded-md mt-1'
        onClick={() => handleEliminar(id) }        
        >
            Borrar
        </button>        
            
        </td>
    </tr>
  )
}

export default Cliente