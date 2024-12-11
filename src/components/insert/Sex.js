import React, { useState } from "react";

const InsertSex = () => {
  const [sexTipo, setSexTipo] = useState("");

  const handleSexTipoChange = (event) => {
    setSexTipo(event.target.value);
  };
  async function insertData() {
    try {
      await window.database.createData("Sexo",["Tipo"],[sexTipo]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">
            Tipo de Sexo:
          </label>
          <input
            id="sexTipo"
            type="text"
            name="SexTipo"
            value={sexTipo}
            placeholder="ejemplo: Masculino/Femenino"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleSexTipoChange}
          />
        </div>
        <button
          id="menu-item-3"
          role="menuitem"
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          onClick={insertData}
        >
          Insertar Tipo Sexo
        </button>
      </div>
    </div>
  );
};

export default InsertSex;
