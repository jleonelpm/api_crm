import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Spinner from "../components/Spinner";

const VerCliente = () => {

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

        cargando ? <Spinner/> : (

            Object.keys(cliente).length === 0 ? <p>No existe cliente ...</p> : (

                <div className=" p-5">
                    <h1 className=" text-2xl uppercase text-center font-bold text-blue-900">Datos del Cliente</h1>
                    <p className=" pt-2">
                        <span className=" text-gray-700 uppercase font-bold">Nombre: </span>
                        {cliente.nombre}
                    </p>
                    <p className=" pt-2">
                        <span className=" text-gray-700 uppercase font-bold">Email: </span>
                        {cliente.email}
                    </p>
                    <p className=" pt-2">
                        <span className=" text-gray-700 uppercase font-bold">Teléfono: </span>
                        {cliente.telefono}
                    </p>
                    <p className=" pt-2">
                        <span className=" text-gray-700 uppercase font-bold">Empresa: </span>
                        {cliente.empresa}
                    </p>
                    <p className=" pt-2">
                        <span className=" text-gray-700 uppercase font-bold">Notas: </span>
                        {cliente.notas}
                    </p>                    
                </div>
            )
        )
    )
}

export default VerCliente