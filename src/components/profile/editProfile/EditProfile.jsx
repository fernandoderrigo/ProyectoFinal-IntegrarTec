import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const EditUserProfile = ({ isOpen, onClose, userData }) => {
  const [formData, setFormData] = useState({
    first_Name: '',
    last_Name: '',
    email: '',
    nick_Name: '',
    birthDay_date: '',
    image_Url: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        first_Name: userData.first_Name || '',
        last_Name: userData.last_Name || '',
        email: userData.email || '',
        nick_Name: userData.nick_Name || '',
        birthDay_date: userData.birthDay_date
          ? new Date(userData.birthDay_date).toISOString().split('T')[0]
          : '',
        image_Url: userData.image_Url || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos actualizados al servidor
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-black rounded-lg shadow-lg text-neutralViolet-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Editar Perfil</h2>
          <button
            onClick={onClose}
            className="text-neutralViolet-300 hover:text-neutralViolet-100"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="first_Name"
              className="block text-sm font-medium text-neutralViolet-300"
            >
              Nombre
            </label>
            <input
              type="text"
              id="first_Name"
              name="first_Name"
              value={formData.first_Name}
              onChange={handleChange}
              className="block w-full mt-1 rounded-md bg-neutralViolet-900 border-neutralViolet-700 text-neutralViolet-50"
            />
          </div>
          <div>
            <label
              htmlFor="last_Name"
              className="block text-sm font-medium text-neutralViolet-300"
            >
              Apellido
            </label>
            <input
              type="text"
              id="last_Name"
              name="last_Name"
              value={formData.last_Name}
              onChange={handleChange}
              className="block w-full mt-1 rounded-md bg-neutralViolet-900 border-neutralViolet-700 text-neutralViolet-50"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutralViolet-300"
            >
              Correo
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-1 rounded-md bg-neutralViolet-900 border-neutralViolet-700 text-neutralViolet-50"
            />
          </div>
          <div>
            <label
              htmlFor="nick_Name"
              className="block text-sm font-medium text-neutralViolet-300"
            >
              Apodo
            </label>
            <input
              type="text"
              id="nick_Name"
              name="nick_Name"
              value={formData.nick_Name}
              onChange={handleChange}
              className="block w-full mt-1 rounded-md bg-neutralViolet-900 border-neutralViolet-700 text-neutralViolet-50"
            />
          </div>
          <div>
            <label
              htmlFor="birthDay_date"
              className="block text-sm font-medium text-neutralViolet-300"
            >
              Fecha de nacimiento
            </label>
            <input
              type="date"
              id="birthDay_date"
              name="birthDay_date"
              value={formData.birthDay_date}
              onChange={handleChange}
              className="block w-full mt-1 rounded-md bg-neutralViolet-900 border-neutralViolet-700 text-neutralViolet-50"
            />
          </div>
          <div>
            <label
              htmlFor="image_Url"
              className="block text-sm font-medium text-neutralViolet-300"
            >
              URL de la imagen de perfil
            </label>
            <input
              type="text"
              id="image_Url"
              name="image_Url"
              value={formData.image_Url}
              onChange={handleChange}
              className="block w-full mt-1 rounded-md bg-neutralViolet-900 border-neutralViolet-700 text-neutralViolet-50"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 transition-colors rounded bg-violetBlue-500 text-neutralViolet-50 hover:bg-violetBlue-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
