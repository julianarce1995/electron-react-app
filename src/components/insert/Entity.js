import React, { useState } from "react";

const InsertEntity = () => {
  const [entityName, setEntity] = useState("");

  const handleEntityNameChange = (event) => {
    setEntity(event.target.value);
  };

  async function insertData() {
    try {
      await window.database.createData("Entidad",["Nombre"],[entityName]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">Entidad:</label>
          <input
            id="entityName"
            type="text"
            name="entityName"
            value={entityName}
            placeholder="ejemplo: Confama"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleEntityNameChange}
          />
        </div>
        <button
          id="menu-item-3"
          role="menuitem"
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          onClick={insertData}
        >
          Insertar Entidad
        </button>
      </div>
    </div>
  );
};

export default InsertEntity;
