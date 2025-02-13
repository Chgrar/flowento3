import { useState } from "react";
import PropTypes from "prop-types";
import EventMessageModal from "./EventMessageModal";
import { IoInformation } from "react-icons/io5";
import { FaRegClock, FaRegImage } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { MdOutlineTitle } from "react-icons/md";
import { BsCalendarCheck } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

const EventForm = ({ onClose, onSubmit }) => {
  const [evento, setEvento] = useState({
    titulo: "",
    fecha: "",
    hora: "",
    ubicacion: "",
    estado: "",
    imagen: "",
    precio: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prevEvento) => ({
      ...prevEvento,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvento((prevEvento) => ({
          ...prevEvento,
          imagen: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(evento);
      setIsSuccess(true);
      setMessage("¡Evento creado con éxito!");
      setShowMessage(true);
    } catch (error) {
      setIsSuccess(false);
      setMessage("Hubo un problema al crear el evento, vuelve a intentarlo.");
      setShowMessage(true);
    }
  };

  const handleEdit = () => {
    setShowMessage(false);
  };

  const closeModal = () => {
    setShowMessage(false);
    onClose();
  };

  const formFields = [
    {
      id: "titulo",
      label: "Título",
      type: "text",
      icon: <MdOutlineTitle className="text-orangeprimary" />,
    },
    {
      id: "fecha",
      label: "Fecha",
      type: "date",
      icon: <BsCalendarCheck className="text-orangeprimary" />,
    },
    {
      id: "hora",
      label: "Hora",
      type: "time",
      icon: <FaRegClock className="text-orangeprimary" />,
    },
    {
      id: "ubicacion",
      label: "Ubicación",
      type: "text",
      icon: <GoLocation className="text-orangeprimary" />,
    },
    {
      id: "informacion",
      label: "Información",
      type: "text",
      icon: <IoInformation className="text-orangeprimary" />,
    },
    {
      id: "imagen",
      label: "Imagen",
      type: "file",
      icon: <FaRegImage className="text-orangeprimary" />,
    },
    {
      id: "precio",
      label: "Precio",
      type: "number",
      icon: <BiDollar className="text-orangeprimary" />,
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-8 bg-white shadow-lg rounded-3xl">
          <h2 className="mb-4 text-2xl font-bold text-center text-redprimary">
            Crear Nuevo Evento
          </h2>
          <form onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div key={field.id} className="relative mb-4">
                <label
                  htmlFor={field.id}
                  className="block text-sm font-bold text-orangeprimary"
                >
                  {field.label}
                </label>
                {field.type === "file" ? (
                  <>
                    <div className="relative">
                      <input
                        type="text"
                        id={field.id}
                        name={field.id}
                        value={evento[field.id]}
                        onChange={handleChange}
                        className="block w-full py-2 pl-4 mt-1 border border-gray-300 shadow-sm pr-9 rounded-3xl focus:outline-none focus:ring-orangeprimary focus:border-orangeprimary sm:text-sm"
                        required
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {field.icon}
                      </span>
                    </div>
                    <input
                      type="file"
                      id={`${field.id}-file`}
                      accept=".jpg, .jpeg, .png"
                      onChange={handleFileChange}
                      className="block w-full py-2 pl-4 mt-1 border-gray-300 shadow-sm pr-9 focus:outline-none focus:ring-orangeprimary focus:border-orangeprimary sm:text-sm"
                    />
                  </>
                ) : (
                  <div className="relative">
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={evento[field.id]}
                      onChange={handleChange}
                      className="block w-full py-2 pl-4 mt-1 border border-gray-300 shadow-sm pr-9 rounded-3xl focus:outline-none focus:ring-orangeprimary focus:border-orangeprimary sm:text-sm"
                      required
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {field.icon}
                    </span>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 mr-2 text-white transition-colors duration-300 border-2 border-white bg-redprimary rounded-3xl hover:bg-red-800 hover:text-white"
                style={{ boxShadow: "0px 4px 10px 0px #00000040" }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white transition-colors duration-300 border-2 border-white bg-orangeprimary rounded-3xl hover:bg-orange-600 hover:text-white"
                style={{ boxShadow: "0px 4px 10px 0px #00000040" }}
              >
                Crear Evento
              </button>
            </div>
          </form>
        </div>
      </div>
      {showMessage && (
        <EventMessageModal
          message={message}
          onEdit={handleEdit}
          onClose={closeModal}
          isSuccess={isSuccess}
        />
      )}
    </>
  );
};

EventForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EventForm;
