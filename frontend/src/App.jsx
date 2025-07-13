import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ClientList from "./pages/ClientList.jsx";
import ProductList from "./pages/ProductList.jsx";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/clients" element={<ClientList />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
