import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals.js';
import { Route,  MemoryRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout.js';
import Home from "./pages/Home.js";
import Upload from "./pages/Upload.js";
import Insert from "./pages/Insert.js";
import Info from "./pages/Info.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="upload" element={<Upload />} />
          <Route path="insert" element={<Insert />} />
          <Route path="info" element={<Info />} />
        </Routes>
      </Layout>
    </Router>
);

reportWebVitals();
