import { useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/clients");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || ""));
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>TenantHub</h2>
        <p className="subtitle">Create your free account</p>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />

        <button type="submit">Sign up</button>

        <p className="demo-note">Demo: No email verification needed</p>
      </form>
    </div>
  );
};

export default RegisterPage;
