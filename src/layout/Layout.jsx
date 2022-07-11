//El componente Outlet permite cargar de manera dinamica contenido permitiendo separar la plantilla del contenido
//El componente Link sustituye a la etiqueta "a" permitiendo que la pagina no se recaargue toda
//El Hook useLocation permite obtener la ubicacíon de la página actual
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {

  const location = useLocation();
  const urlActual = location.pathname;


      return (
        <div className="md:flex md:min-h-screen">
          <div className="md:w-1/4 bg-gray-800 px-5 py-10 rounded-md m-1">
            <h2 className=" text-4xl text-white text-center font-bold">CRM Clientes</h2>
            <nav className="mt-10">
              <Link
                className={` ${urlActual === '/clientes' ? 'text-yellow-400' : 'text-white'} text-xl block mt-2 hover:text-yellow-200 hover:text-2xl `}
                to="/clientes"
              >
                Clientes
              </Link>
              <Link
                className={` ${urlActual === '/clientes/nuevo' ? 'text-yellow-400' : 'text-white'} text-xl block mt-2 hover:text-yellow-200 hover:text-2xl `}
                to="/clientes/nuevo"
              >Nuevo Cliente
              </Link>
            </nav>
          </div>

          <div className="md:w-3/4 p-10 md:h-screen overflow-scroll bg-slate-100 ">            
            <Outlet />
          </div>
          
        </div>
      )
  }

  export default Layout