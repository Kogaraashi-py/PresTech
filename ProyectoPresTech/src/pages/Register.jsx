import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    tipoDocumentoId: "",
    identificacion: "",
    email: "",
    sexo: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    contraseña: "",
    verificarpassword: "",
    rol: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const mapTipoDocumento = (doc) => {
    if (doc === "Cédula de ciudadania") return 1;
    if (doc === "Cédula de extranjería") return 2;
    if (doc === "Pasaporte") return 3;
    return 1;
  };

  const mapSexo = (sexo) => {
    if (sexo === "Masculino") return "M";
    if (sexo === "Femenino") return "F";
    return "M";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contraseña !== formData.verificarpassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const payload = {
  nombre: formData.nombre,
  tipoDocumentoID: mapTipoDocumento(formData.tipoDocumentoId),
  identificacion: formData.identificacion,
  email: formData.email,
  sexo: mapSexo(formData.sexo),
  telefono: formData.telefono,
  direccion: formData.direccion,
  ciudad: formData.ciudad,
  contraseña: formData.contraseña,
  rol: formData.rol.toLowerCase()
};


    try {
      const res = await fetch("https://localhost:7105/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("¡Usuario registrado correctamente!");
        navigate("/login");
      } else {
         alert("Error: " + (data.mensaje || data.message || data.title || "Error desconocido"));
      }

    } catch (err) {
      console.error("Error al registrar:", err);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-blue-500 to-blue-900 to-55%">
      <form onSubmit={handleSubmit} className="bg-white/10 p-20 rounded-xl w-11/12 max-w-md backdrop-blur-md space-y-4 text-white">
        <h2 className="lg:text-4xl lg:ml-4 mb-6 font-bold ml-6 text-2xl text-center">REGISTRO</h2>

        <label> Nombre Completo:
          <input type="text" name="nombre" onChange={handleChange} className="input input-info mb-3 bg-white text-black" required />
        </label>

        <label> Tipo de documento:
          <select name="tipoDocumentoId" onChange={handleChange} className="select bg-white text-black" required>
            <option>Cédula de ciudadania</option>
            <option>Cédula de extranjería</option>
            <option>Pasaporte</option>
          </select>
        </label>

        <label> Identificación:
          <input type="number" name="identificacion" onChange={handleChange} className="input input-info mb-3 bg-white text-black" required />
        </label>

        <label> Email:
          <input type="email" name="email" onChange={handleChange} className="input input-info mb-3 bg-white text-black" required />
        </label>

        <label> Sexo:
          <select name="sexo" onChange={handleChange} className="select bg-white text-black" required>
            <option>Masculino</option>
            <option>Femenino</option>
          </select>
        </label>

        <label> Teléfono:
          <input type="text" name="telefono" onChange={handleChange} className="input input-info mb-3 bg-white text-black" required />
        </label>

        <label> Dirección:
          <input type="text" name="direccion" onChange={handleChange} className="input input-info mb-3 bg-white text-black" required />
        </label>

        <label> Ciudad:
          <input type="text" name="ciudad" onChange={handleChange} className="input input-info mb-3 bg-white text-black" required />
        </label>

        <label> Contraseña:
          <input type="password" name="contraseña" onChange={handleChange} className="input input-info mb-3 bg-white text-black" required />
        </label>

        <label> Verificar contraseña:
          <input type="password" name="verificarpassword" onChange={handleChange} className="input input-info mb-3 bg-white text-black" required />
        </label>

        <p className="floating-label">Tipo de usuario</p>

        <div className="flex space-x-3 mb-10">
          <label>
            <input type="radio" name="rol" value="prestatario" onChange={handleChange} className="radio radio-info radio-xs mr-1" required />
            Prestatario
          </label>

          <label>
            <input type="radio" name="rol" value="prestamista" onChange={handleChange} className="radio radio-info radio-xs mr-1" required />
            Prestamista
          </label>
        </div>

        <label>
          <input type="checkbox" className="checkbox checkbox-info checkbox-xs mr-1" required />
          Acepto los términos y condiciones de PresTech
        </label>

        <button type="submit" className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 border-cyan-500 h-9">
          Registrarse
        </button>

        <a href="/Login" className="text-cyan-300 hover:text-cyan-400 flex flex-col items-center gap-3 mt-4">¿Ya tienes cuenta? Inicia sesión</a>
        <a href="/" className="text-cyan-300 hover:text-cyan-400 lg:ml-20 ml:5">← Volver al inicio</a>
      </form>
    </div>
  );
}

export default Register;

