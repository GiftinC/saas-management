import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductFormModal from "../components/ProductFormModal.jsx";
import "../styles/Dashboard.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      alert("Error loading products:" + (err.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Manage Products</h1>
        <button onClick={() => setShowModal(true)}>+ Add Product</button>
      </div>

      <div className="tenant-card-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {showModal && (
        <ProductFormModal
          onClose={() => setShowModal(false)}
          onSave={fetchProducts}
        />
      )}
    </div>
  );
};

export default ProductList;
