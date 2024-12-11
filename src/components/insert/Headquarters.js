import React, { useEffect, useState } from "react";

const InsertHeadquarters = () => {
  const [headquartersName, setHeadquartersName] = useState("");
  
  const [idEntity, setIdEntity] = useState("");
  const [dataEntities, setDataEntities] = useState([]);

  const handleHeadquartersNameChange = (event) => {
    setHeadquartersName(event.target.value);
  };
  
  const handleEntityChange = (event) => {
    setIdEntity(event.target.value);
  };

  async function insertData() {
    try {
      await window.database.createData(
        "Sede",
        ["Nombre", "IdEntidad"],
        [headquartersName, idEntity]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function getData() {
    try {
      const entitiesInfo = await window.database.getData("Entidad");
      setDataEntities(entitiesInfo);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  },[]);

  return (
    <div>
      <div className="max-w-sm mx-auto flex flex-col items-center">
        <div className="w-full">
          <div className="w-full">
            <label className="mb-2 text-sm font-medium text-gray-900">
              Select Sede
            </label>
            <select
              id="entities"
              value={idEntity}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
              onChange={handleEntityChange}
            >
              <option value=""></option>
              {dataEntities.length
                ? dataEntities.map((entity) => (
                    <option key={entity.ID} value={entity.ID}>
                      {entity.Nombre}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <label className="text-sm font-medium text-gray-900">Sede:</label>
          <input
            id="headquartersName"
            type="text"
            name="headquartersName"
            value={headquartersName}
            placeholder="ejemplo: Aranjuez"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            onChange={handleHeadquartersNameChange}
          />
        </div>
        <button
          id="menu-item-3"
          role="menuitem"
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          onClick={insertData}
        >
          Insertar Sede
        </button>
      </div>
    </div>
  );
};

export default InsertHeadquarters;
