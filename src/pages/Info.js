import React, { useState } from "react";

const Info = () => {
  const [tableSelected, setTableSelected] = useState("");
  const [columnsNames, setColumnsNames] = useState([]);
  const [dataTable, setDataTable] = useState([]);

  const handleSelectTableChange = (event) => {
    setTableSelected(event.target.value);
  };

  async function getData() {
    try {
      const tableInfo = await window.database.getData(tableSelected);
      const columns = Object.keys(tableInfo[0]);
      setColumnsNames(columns);
      setDataTable(tableInfo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="w-full">
        <div className="max-w-sm mx-auto flex flex-col items-center">
          <div className="w-full">
            <label className="mb-2 text-sm font-medium text-gray-900">
              Selecciona la tabla
            </label>
            <select
              id="countries"
              value={tableSelected}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
              onChange={handleSelectTableChange}
            >
              <option value=""></option>
              <option value="Entidad">Entidad</option>
              <option value="Sede">Sede</option>
              <option value="Grupo">Grupo</option>
              <option value="Jornada">Jornada</option>
              <option value="Brigada">Brigada</option>
              <option value="Sexo">Sexo</option>
            </select>
          </div>
          <button
            id="menu-item-3"
            role="menuitem"
            className="flex w-fit px-4 my-2 py-2 text-xl text-gray-700 border-2 rounded-md"
            onClick={getData}
          >
            Obetener Datos
          </button>
        </div>

        <div className="flex justify-center m-8">
          <table className="w-fit text-sm text-left rtl:text-right text-gray-500">
            <thead className="w-fit text-sm text-gray-500">
              <tr>
                {columnsNames.map((column, index) => (
                  <th
                    key={index}
                    className="px-8 py-2 text-sm text-gray-100 uppercase rounded-t-lg bg-gray-700 text-gray-400"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTable.map((item, index) => (
                <tr key={index} className="bg-white border-b">
                  {columnsNames.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-8 py-2 font-medium border-x-1"
                    >
                      {item[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Info;
