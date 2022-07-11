import Formulario from '../components/Formulario'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

function EditarCliente() {

    //Recuerde que los state actuan de manera similar a los setters
    const [cliente, setCliente] = useState({});

    //Este state nos servirá para usar un spinner de carga
    const [cargando, setCargando] = useState(true);

    const { id } = useParams()

    useEffect(() => {

        const obtenerClienteAPI = async () => {
            try {

                const url = `http://localhost:4000/clientes/${id}` //Se usa backtic no comillas
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setCliente(resultado) //Cambiamos el estado de Cliente

            } catch (error) {

                console.log(error)

            }

            //Esta instruccion es basica en react
            //Nos permite modificar el valor de un estado contrario a su valor actual
            setCargando(!cargando)

        }

        obtenerClienteAPI()

    }, []);  

  return (
    <>
        <h1 className=' font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className=' mt-3'>{cliente?.nombre ? "Realiza y Guarda tus Cambios..." : "Cliente NO EXISTE" }</p>

        {
            cliente?.nombre && (
                <Formulario 
                cliente = {cliente}
                />                
            )

        }

    </>
  )
}

export default EditarCliente