import { RouterProvider, createBrowserRouter, createMemoryRouter } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home.js";
import Upload from "./pages/Upload.js";
import Insert from "./pages/Insert.js";
import Info from "./pages/Info.js";
import Work from "./pages/Work.js";

const ErrorPage = () => (
  <div>
    <h1>¡Ups! Algo salió mal.</h1>
    <p>No pudimos encontrar esta página.</p>
  </div>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/work",
    element: <Work />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/insert",
    element: <Insert />,
  },
  {
    path: "/info",
    element: <Info />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const router = createMemoryRouter(routes, {
  initialEntries: ["/"], // Rutas iniciales (opcional)
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
