import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const [clientsRes, productsRes] = await Promise.all([
        API.get("/clients", { headers }),
        API.get("/products", { headers }),
      ]);
      setClients(clientsRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      alert("Failed to load dashboard: " + (err.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <input
          type="text"
          placeholder="Search Tenants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tenants</h3>
          <p>{clients.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Products</h3>
          <p>{products.filter((p) => p.status === "Active").length}</p>
        </div>
      </div>

      <div className="tenant-card-grid">
        {filteredClients.map((client) => (
          <div className="tenant-card" key={client._id}>
            <div className="tenant-card-header">
              <div className="tenant-initial">{client.name.charAt(0)}</div>
              <div className="tenant-name-email">
                <strong>{client.name}</strong>
                <p>{client.email}</p>
              </div>
            </div>
            <div className="tenant-badges">
              <span className={`status ${client.status.toLowerCase()}`}>
                {client.status}
              </span>
              <span className="plan">{client.plan}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
