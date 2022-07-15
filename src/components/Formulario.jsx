import React from 'react';
//Este Hook permite la navegacion en el Sitio
import { useNavigate } from "react-router-dom";
//Libreria formik para trabajar con los formularios
import { Formik, Form, Field } from 'formik';
//Libreria para validacion
import * as Yup from 'yup';

const Formulario = ({ cliente }) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .required("Por favor, escribe el nombre del cliente"),
    empresa: Yup.string().required("Por favor, escribe el nombre de la empresa"),
    email: Yup.string()
      .email("Ingresa un email valido")
      .required("Por favor, escribe un email correcto"),
    telefono: Yup.number()
      .integer("Numero no valido")
      .positive("Numero no valido")
      .typeError("El numero no es valido")

  })

  const handleSubmit = async (valores) => {
    try {

      let respuesta

      if (cliente.id) {
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`

        respuesta = await fetch(url, {
          method: 'PUT',  //El metodo put es para actualizar
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
  
        })

      }else{
        const url = import.meta.env.VITE_API_URL

        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json'
          }
  
        })        
      }

      //console.log(respuesta)
      await respuesta.json()
      //console.log(resultado)

      //OJO: para que esta instruccion pueda funcionar no puede haber previos
      navigate('/clientes') //Esta funcion retorna a la pagina clientes

    } catch (error) {
      console.log(error)

    }
  }

  return (
    <div className=' bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className=' text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? "Editando Cliente" : "Nuevo Cliente"}</h1>
      <Formik

        //En los initial values se pueden emplear valores ternarios
        //de diferentes maneras
        //con la sintaxis como se muestra en cada atributo
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente.empresa ? cliente.empresa : "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? ""

        }}

        //Reinicia el formulario cuando los valores cambian
        enableReinitialize={true}

        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values)
          resetForm()
        }}

        validationSchema={nuevoClienteSchema}

      >

        {({ errors, touched }) => {
          //console.log(data)
          return (

            <Form >
              <div className=' mb-4'>
                <label
                  className=' text-gray-700 uppercase font-semibold'
                  htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className=" mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />

                {errors.nombre && touched.nombre ? <div className=' text-red-600'>{errors.nombre}</div> : null}

              </div>
              <div className=' mb-4'>
                <label
                  className=' text-gray-700 uppercase font-semibold'
                  htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className=" mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa"
                  name="empresa"
                />

                {errors.empresa && touched.empresa ? <div className=' text-red-600'>{errors.empresa}</div> : null}


              </div>
              <div className=' mb-4'>
                <label
                  className=' text-gray-700 uppercase font-semibold'
                  htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className=" mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email"
                  name="email"
                />

                {errors.email && touched.email ? <div className=' text-red-600'>{errors.email}</div> : null}

              </div>
              <div className=' mb-4'>
                <label
                  className=' text-gray-700 uppercase font-semibold'
                  htmlFor="telefono">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className=" mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Teléfono"
                  name="telefono"
                />

                {errors.telefono && touched.telefono ? <div className=' text-red-600'>{errors.telefono}</div> : null}

              </div>
              <div className=' mb-4'>
                <label
                  className=' text-gray-700 uppercase font-semibold'
                  htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className=" mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Notas"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Modificar Cliente" : "Guardar Cliente"}
                className=' mt-5 w-full bg-blue-600 p-3 rounded-md font-bold text-white '
              />
            </Form>

          )
        }}

      </Formik>
    </div>
  )
}


Formulario.defaultProps = {
  //Este default props lo que hace es que en caso
  //de que no traiga ningun props tomara por defecto este  
  cliente: {}
}

export default Formulario