import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import ClientCard from "../components/ClientCard.jsx";
import ClientFormModal from "../components/ClientFormModal.jsx";
import "../styles/Dashboard.css";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(res.data);
    } catch (err) {
      alert("Failed to fetch clients: " + (err.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>SaaS Tenant Manager</h1>
        <button onClick={() => setShowModal(true)}>+ Add New Tenant</button>
      </div>

      <div className="tenant-card-grid">
        {clients.map((client) => (
          <ClientCard key={client._id} client={client} />
        ))}
      </div>

      {showModal && (
        <ClientFormModal
          onClose={() => setShowModal(false)}
          onSave={fetchClients}
        />
      )}
    </div>
  );
};

export default ClientList;
