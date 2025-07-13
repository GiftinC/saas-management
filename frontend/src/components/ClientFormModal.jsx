import { useState } from "react";
import API from "../services/api.js";

const ClientFormModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    domain: "",
    plan: "Free",
    status: "Active",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/clients", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSave();
      onClose();
    } catch (err) {
      alert("Error saving tenant:" + (err.response?.data?.message || ""));
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal-box" onSubmit={handleSubmit}>
        <h3>Add Tenant</h3>
        <input
          name="name"
          placeholder="Tenant Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="domain"
          placeholder="Domain"
          value={form.domain}
          onChange={handleChange}
        />
        <select name="plan" value={form.plan} onChange={handleChange}>
          <option>Free</option>
          <option>Professional</option>
          <option>Enterprise</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <input
          type="date"
          name="createdAt"
          value={form.createdAt}
          onChange={handleChange}
        />

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Save Tenant</button>
        </div>
      </form>
    </div>
  );
};

export default ClientFormModal;
