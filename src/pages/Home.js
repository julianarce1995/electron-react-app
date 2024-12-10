import React, { useState } from "react";

const Home = () => {
  const [entidad, setEntidad] = useState("");

  const handleEntityChange = (event) => {
    setEntidad(event.target.value);
  };
  async function insertData() {
    try {
      await window.connection.createData(entidad);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <div className="w-full">
          <label className="text-sm font-medium text-gray-900">Entidad.</label>
          <input
            type="text"
            name="entidad"
            id="entidad"
            value={entidad}
            onChange={handleEntityChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            placeholder="ejemplo: confama"
          />
        </div>
        <button
          onClick={() => insertData()}
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          role="menuitem"
          id="menu-item-3"
        >
          Insertar Entidad
        </button>
      </div>
    </div>
  );
};

export default Home;
