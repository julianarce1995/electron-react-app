import React, { useState } from "react";

const InsertProfessor = () => {
  const [professorName, setProfessorName] = useState("");
  const [professorPhone, setProfessorPhone] = useState("");
  const [professorEmail, setProfessorEmail] = useState("");

  const handleProfessorNameChange = (event) => {
    setProfessorName(event.target.value);
  };
  const handleProfessorPhoneChange = (event) => {
    setProfessorPhone(event.target.value);
  };
  const handleProfessorEmailChange = (event) => {
    setProfessorEmail(event.target.value);
  };

  async function insertData() {
    try {
      await window.database.createData(
        "Profesor",
        ["Nombre", "Telefono", "Email"],
        [professorName, professorPhone, professorEmail]
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">Name:</label>
          <input
            id="professorName"
            type="text"
            name="professorName"
            value={professorName}
            placeholder="ejemplo: Juan Camilo Leal Gomez"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleProfessorNameChange}
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">Telefono:</label>
          <input
            id="professorPhone"
            type="text"
            name="professorPhone"
            value={professorPhone}
            placeholder="ejemplo: 3128781544"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleProfessorPhoneChange}
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">Email:</label>
          <input
            id="professorEmail"
            type="text"
            name="professorEmail"
            value={professorEmail}
            placeholder="ejemplo: JuanKmilo@gamil.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleProfessorEmailChange}
          />
        </div>
        <button
          id="menu-item-3"
          role="menuitem"
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          onClick={insertData}
        >
          Insertar Profesor
        </button>
      </div>
    </div>
  );
};

export default InsertProfessor;
