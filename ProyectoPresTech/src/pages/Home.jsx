import NavBar from "../components/navbar"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate();

  return (
    <>
    <div className="bg-linear-to-tl from-gray-200 to-gray-100 to-50% ">
    <NavBar></NavBar>
       {/* Este es el Hero*/}
     <section className="hero min-h-screen bg-linear-to-br from-blue-500  to-blue-900 to-55%">
        <div className="hero-content text-center">
          <div className="max-w-prose">
            <h1 className="lg:text-7xl font-bold text-5xl text-shadow-gray-500/70 text-white">BIENVENIDO A PRESTECH</h1>
            <p className="py-7 lg:text-base text-sm text-white">PresTech es la plataforma digital que automatiza y organiza el proceso de gestión de préstamos, ofreciendo control total para prestamistas y transparencia para prestatarios.</p>
            <button className="btn btn-active btn-primary bg-cyan-600 hover:bg-cyan-300 hover:text-black" onClick={() => navigate("/Login")}>Comenzar Ahora</button>
          </div>
        </div>
      </section>

      {/*Esta seria las Cards de las caracteristicas */}
      <section className="py-10 text-black" id="caracteristicas">
         <h2 className="text-center text-5xl font-bold p-5">Características Principales</h2>
        <p className="text-center mb-10">
          Todo lo que necesitas para gestionar préstamos de manera profesional
        </p>
        <div className="flex flex-wrap justify-center">  

          <div className="card w-50 mb-2 bg-white shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl ">
          <div className="card-body">
            <div className="bg-gray-400 w-9 h-9 text-2xl xl rounded-lg text-center">👥</div>
            <h3 className="card-title">Gestión de Clientes</h3>
            <p>
              Registra y administra la información de tus prestatarios de forma
              segura y organizada.
            </p>
          </div>
          </div>

          <div className="card w-50 mb-2 bg-white shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="card-body">
            <div className="bg-gray-400 w-9 h-9 text-2xl xl rounded-lg text-center">💰</div>
            <h3 className="card-title">Control de Préstamos</h3>
            <p>
              Crea y gestiona préstamos con cálculo automático de intereses y
              fechas de vencimiento.
            </p>
          </div>
          </div>

          <div className="card w-80 mb-2 bg-white shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="card-body">
            <div className="bg-gray-400 w-9 h-9 text-2xl xl rounded-lg text-center">📈</div>
            <h3 className="card-title">Reportes Financieros</h3>
            <p>
              Poder consultar de manera exacta todas las transferencia de sus pagos ademas de poder ver en detalle los prestamos creados
            </p>
          </div>
          </div>


          <div className="card w-80 mb-2 bg-white shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="card-body">
            <div className="bg-gray-400 w-9 h-9 text-2xl xl rounded-lg text-center">🔒</div>
            <h3 className="card-title">Seguridad Garantizada</h3>
            <p>
              Toda tu información protegida con cifrado y acceso controlado por
              roles.
            </p>
          </div>
          </div>


          <div className="card w-80 mb-2 bg-white shadow-md mx-1 transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="card-body">
            <div className="bg-gray-400 w-9 h-9 text-2xl xl rounded-lg text-center">📜</div>
            <h3 className="card-title">Historial Completo</h3>
            <p>
              Accede al historial detallado de todos los pagos y transacciones
              realizadas.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/*Este es el de rol */}
      <section className="py-10 text-black" id="rol">
        <h2 className="text-center font-bold text-5xl pb-8">Roles</h2>
        <div className="flex flex-wrap justify-center">
        <div className="w-150 mb-2 bg-white shadow-md mx-1 rounded-xl lg:h-90 h-130" >
          <h3 className="text-2xl text-center font-bold pt-2">Prestamista</h3>
          <p className="text-base font-stretch-90% m-3 pb-2">El usuario con rol de prestamista tiene a su disposición un conjunto de herramientas clave para administrar su cartera de préstamos:</p>
          <ul className="m-3 font-stretch-90% text-base">
            <li><strong>Crear ofertas de préstamo:</strong> Definir montos, intereses, plazos y condiciones de pago para que los prestatarios puedan solicitarlos.</li>
            <li><strong>Gestión de clientes:</strong> Registrar y consultar los datos de los prestatarios, asegurando la trazabilidad de cada relación financiera.</li>
            <li><strong>Control de pagos:</strong> Verificación de comprobantes de pagos realizados por los prestatarios, validando la consistencia y puntualidad.</li>
            <li><strong>Consulta de préstamos:</strong> Acceso a un historial completo de todos los préstamos gestionados, con sus respectivos estados financieros.</li>
          </ul>
        </div>

        <div className="w-150 mb-2 bg-white shadow-md mx-1 rounded-xl lg:h-90 h-130">
          <h3 className="text-2xl text-center font-bold pt-2">Prestatario</h3>
          <p className="text-base font-stretch-90% m-3 pb-2">El prestatario, por su parte, cuenta con un entorno donde puede consultar, decidir y cumplir con sus compromisos de forma práctica:</p>
          <ul className="m-3 font-stretch-90% text-base">
            <li><strong>Ver ofertas disponibles:</strong> Examinar los préstamos disponibles y tomar decisiones informadas sobre cuál solicitar.</li>
            <li><strong>Préstamos activos:</strong> Visualización clara de todos los préstamos en curso, sus fechas de vencimiento, estado actual y condiciones pactadas.</li>
            <li><strong>Seleccionar préstamo a pagar:</strong> Escoger el préstamo al que desea abonar en ese momento, facilitando el control y planificación de pagos.</li>
            <li><strong>Historial de pagos:</strong> Consulta detallada de todos los pagos realizados anteriormente, con sus fechas y montos.</li>
          </ul>
        </div>
        </div>
      </section>
    
      <section className="py-10 lg:px-60 text-black" id="beneficios">
        <h3 className="text-center text-5xl font-bold pt-2 text-shadow-xs">¿POR QUÉ ELEGIR PRESTECH?</h3>
        <p className="text-base font-stretch-90% m-3 pb-2 pt-6 text-shadow-xs">Elegir PresTech es optar por una solución moderna, segura y eficiente para la gestión de préstamos. Este sistema facilita el control total del proceso financiero 
          al permitir registrar prestatarios, administrar préstamos, generar alertas automáticas y mantener un historial detallado de pagos. Su interfaz intuitiva y accesible está diseñada para prestamistas y 
          prestatarios, garantizando organización, transparencia y rapidez en cada transacción. En lugar de depender de registros manuales o confusos, PresTech ofrece una plataforma confiable que optimiza el tiempo, 
          reduce errores y mejora la comunicación entre las partes involucradas.</p>
      </section>
 
      <section className="py-10 lg:px-60 bg-linear-to-tl from-cyan-200 to-blue-900 to-50% lg:mx-60 mb-7 text-white">
        <h2 className='text-center text-2xl font-bold pt-2'>Comienza a gestionar tus préstamos hoy</h2>
        <p  className="text-base font-stretch-90% m-3 pb-2 pt-3 text-center">Únete a PresTech y transforma la manera en que administras préstamos</p>
        <div className="flex justify-center">
        <button onClick={() => navigate("/Login")} className='btn btn-active btn-primary m-5 bg-cyan-600 hover:bg-cyan-300 hover:text-black item'>Acceder a la plataforma</button>
        </div>
      </section>

      <footer className="footer sm:footer-horizontal  p-10 bg-blue-950 text-white">
  <nav>
    <h6 className="footer-title">PresTech</h6>
    <a className="link link-hover">Plataforma digital para la gestión eficiente de préstamos personales y empresariales.</a>
  </nav>
  <nav>
    <h6 className="footer-title">Enlaces</h6>
    <a className="link link-hover">Características</a>
    <a className="link link-hover">Roles</a>
    <a className="link link-hover">Inicio Sesion</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terminos de uso</a>
    <a className="link link-hover">Politica de privacidad</a>
    <a className="link link-hover">Politica de Cookies</a>
  </nav>
    <p className='footer-text'>© {new Date().getFullYear()} PresTech. Todos los derechos reservados.</p>
  </footer>
  </div>
    </>


  )  
} 

export default Home