import { useState, useEffect } from 'react';
import Cliente from "../components/Cliente";

const Inicio = () => {

  const [clientes, setClientes] = useState([])

  //El use effect se llama cada vez que existe un cambio en el componente
  useEffect(() => {
    console.log("Se ejecuto el use effect")

    //Las llamadas a la API son asincronas, por eso se pone la instruccion async
    const obtenerClientesAPI = async () => {
      try {

        const url = "http://localhost:4000/clientes"

        const respuesta = await fetch(url) //el metodo por defecto de una peticion fetch es GET
        //if (resultado == 200)

        const resultado = await respuesta.json()
        console.log(resultado)

        setClientes(resultado)

      } catch (error) {
        console.log(error)
      }

    }

    obtenerClientesAPI()
    console.log("que pasion")

  }, [])

  
const handleEliminar = async id => {

  const confirmar = confirm('¿Deseas eliminar este cliente?')

  if (confirmar){
    try {
      const url = `http://localhost:4000/clientes/${id}`
      const respuesta = await fetch(url, {
        method : 'DELETE'
      })
      await respuesta.json()

      //En lugar de recargar toda la pagina
      //Recargarmos filtramos el objeto clientes
      //y modificamos el estado
      const arrayClientes = clientes.filter(cliente => cliente.id !== id)
      setClientes(arrayClientes)

    } catch (error) {
      console.log(error)
    }
  }

}  

  return (
    <div>
      <h1 className=' font-black text-4xl text-blue-600'>Clientes</h1>
      <p className=' mt-3'>Administra a tus Clientes</p>
      <table className=' w-full mt-5 table-auto shadow bg-white'>
        <thead className=' bg-blue-900 text-white'>
          <tr>
          <th className=' p-2'>ID</th>
            <th className=' p-2'>Nombre</th>
            <th className=' p-2'>Empresa</th>
            <th className=' p-2'>Contacto</th>
            <th className=' p-2'>Acciones</th>

          </tr>
        </thead>

        <tbody>
          
          {
            //Recordemos que para iterar en un json se hace con un metodo map
          clientes.map ( cliente => (
            <Cliente 
            key = {cliente.id}
            cliente = {cliente}
            handleEliminar = {handleEliminar}
            />
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Inicio