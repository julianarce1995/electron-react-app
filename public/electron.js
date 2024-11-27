import { app, BrowserWindow, dialog } from 'electron';
import isDev from "electron-is-dev";
import { join, dirname } from "path";
import xlsx from 'xlsx';
import { ipcMain } from 'electron/main';
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

const { Database } = sqlite3
const { readFile, utils } = xlsx;

let mainWindow;
let db;

function createMainWindow() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  mainWindow = new BrowserWindow({
    title: 'My buddy app',
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${join(__dirname, "../build/index.html")}`
  );
  
  mainWindow.on("closed", () => (mainWindow = null));
}


app.whenReady().then(async () => {
  try {
    createMainWindow();
    await connection();
  } catch (error) {
    console.error('Error durante la inicialización:', error);
  }
});

function createTable() {
  const tableName = "Entidad"
  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
    [tableName],
    (err, row) => {
      if (err) {
        console.error('Error:', err.message);
      } else {
        if (!row) {        
          console.log(`La tabla "${tableName}" no existe. Creando tablas...`);
          const createTables = `
            CREATE TABLE IF NOT EXISTS Entidad (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Sede (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL,
              IdEntidad INTEGER NOT NULL,
              FOREIGN KEY (IdEntidad) REFERENCES Entidad(ID)
            );

            CREATE TABLE IF NOT EXISTS Grupo (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL,
              IdSede INTEGER NOT NULL,
              FOREIGN KEY (IdSede) REFERENCES Sede(ID)
            );

            CREATE TABLE IF NOT EXISTS Brigada (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL,
              Fecha TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Estudiante (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              Name TEXT NOT NULL,
              Edad INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS Info (
              IdEstudiante INTEGER NOT NULL,
              IdGrupo INTEGER NOT NULL,
              IdBrigada INTEGER NOT NULL,
              Tarifa REAL NOT NULL,
              Despiojado TEXT CHECK(Despiojado IN ('Si', 'No')) NOT NULL,
              TienePiojos TEXT CHECK(TienePiojos IN ('Si', 'No')) NOT NULL,
              Razon TEXT CHECK(Razon IN ('Ausente', 'No Autorizado', 'Retirado')),
              PRIMARY KEY (IdEstudiante, IdGrupo, IdBrigada),
              FOREIGN KEY (IdEstudiante) REFERENCES Estudiante(ID),
              FOREIGN KEY (IdGrupo) REFERENCES Grupo(ID),
              FOREIGN KEY (IdBrigada) REFERENCES Brigada(ID)
            );
          `;

          db.exec(createTables, (err) => {
            if (err) {
              console.error('Error al crear las tablas:', err.message);
            } else {
              console.log('Tablas creadas correctamente.');
            }
          });
        } else {
          console.log(`La tabla "${tableName}" ya existe.`);
        }
      }
    }
  );
}

async function connection() {
  try {
    const dbPath = join(process.cwd(), 'app.db');

    // Crear una nueva conexión a la base de datos o crear una nueva
    db = new Database(dbPath, (err) => {
      if (err) {
        console.error('Error al conectar a la base de datos', err.message);
      } else {
        console.log('Conectado a la base de datos existente.');
      }
    });

    createTable();

    return db;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error.message);
    throw error;
  }
}


async function insertEntity(name) {
  const query = `INSERT INTO Entidad (Name) VALUES (?);`;
  db.run(query, [name], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
    } else {
      console.log('Consulta ejecutada correctamente');
    }
  });
}

ipcMain.handle('get-data', async (event, table) => {
  console.log("careedkdkkdkdk");
  
  const query = `SELECT * FROM ${table}`;
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err.message);
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle('create-data', async (event, name) => {
  try {
    await insertEntity(name);
  } catch (error) {
    console.error("Error al crear info:", error);
    throw error;
  }
});

ipcMain.handle('read-excel', async (event, filePath) => {
  try {
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(sheet);

    return data;
  } catch (error) {
    console.error('Error al leer el archivo Excel:', error);
  }
});

ipcMain.handle("select-file", async () => {
  console.log("alksdfhklasdfhlkashdflk");
  
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Excel Files", extensions: ["xls", "xlsx"] }],
  });

  if (result.canceled) {
    return null; // Usuario canceló la selección
  }
  return result.filePaths[0]; // Devuelve la ruta del archivo seleccionado
});