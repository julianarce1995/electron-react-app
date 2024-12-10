import React, { useState } from "react";

const Info = () => {
  const [table, setTable] = useState("");
  const [dataTable, setDataTable] = useState([]);

  const handleTableChange = (event) => {
    setTable(event.target.value);
  };

  async function getData() {
    try {
      const data = await window.connection.getData(table);
      console.log(data);
      setDataTable(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="w-full">
        <div className="max-w-sm mx-auto flex flex-col items-center">
          <div className="w-full">
            <label className="mb-2 text-sm font-medium text-gray-900">Select table</label>
            <select
              id="countries"
              value={table}
              onChange={handleTableChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5"
            >
              <option value=""></option>
              <option value="Entidad">Entidad</option>
              <option>Otro</option>
            </select>
          </div>
          <button
            onClick={() => getData()}
            className="flex w-fit px-4 my-2 py-2 text-xl text-gray-700 border-2 rounded-md"
            role="menuitem"
            id="menu-item-3"
          >
            Obetener Datos
          </button>
        </div>

        <div className="m-8">
          {dataTable.length ? (
            <span className="px-4 pt-2 pb-1 text-xs text-gray-300 uppercase rounded-t-lg bg-gray-700 text-gray-400">
              Entidades
            </span>
          ) : null}
          <div className="relative overflow-x-auto">
            <table className="w-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                {dataTable.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b"
                    >
                      <th
                        scope="col"
                        className="px-8 py-2 font-medium"
                        key={index}
                      >
                        {item.Name}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
