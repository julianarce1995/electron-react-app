import React, { useState } from 'react';
import ExcelList from '../components/excel/ExcelList.js';

const Work = () => {
  const [entidad, setEntidad] = useState('');
  const [table, setTable] = useState('');
  const [dataTable, setDataTable] = useState([]);

  const handleEntityChange = (event) => {
    setEntidad(event.target.value);
  };
  const handleTableChange = (event) => {
    setTable(event.target.value);
  };
  async function insertData() {
     try {
       await window.connection.createData(entidad);
     } catch (error) {
       console.log(error);
     }
  }

  async function getData() {
    try {
      const data = await window.connection.getData(table);
      console.log(data);
      setDataTable(data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <label className="block text-sm/6 font-medium text-gray-900">
          Entidad.
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="entidad"
            id="entidad"
            value={entidad}
            onChange={handleEntityChange}
            className="flex rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6"
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
      <div>
        <label className="block text-sm/6 font-medium text-gray-900">
          Tabla.
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="table"
            id="table"
            value={table}
            onChange={handleTableChange}
            className="flex rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm/6"
            placeholder="ejemplo: Entidad"
          />
        </div>
        <button
          onClick={() => getData()}
          className="flex px-4 my-2 py-2 text-left text-xl text-gray-700 border-2 rounded-md"
          role="menuitem"
          id="menu-item-3"
        >
          Obetener Datos x Tabla
        </button>
        <div>
          {dataTable.map((item, index) => {
            return (
              <label
                className="block text-sm/6 font-medium text-gray-900"
                key={index}
              >
                {item.Name}
              </label>
            );
          })}
        </div>
      </div>
      <ExcelList />
    </div>
  );
};

export default  Work;
