import React, { useState } from "react";
import API from "../services/api.js";

const ProductFormModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    status: "Active",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/products", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSave();
      onClose();
    } catch (err) {
      alert("Error saving product:" + (err.response?.data?.message || ""));
    }
  };

  return (
    <div className="modal-overlay">
      <form className="modal-box" onSubmit={handleSubmit}>
        <h3>Add Product</h3>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

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
          <button type="submit">Save Product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormModal;
