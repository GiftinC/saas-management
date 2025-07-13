import { useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/clients");
    } catch (err) {
      alert("Invalid credentials" + (err.response?.data?.message || ""));
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h2>TenantHub</h2>
        <p className="subtitle">SaaS Tenant Management Platform</p>

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

        <div className="auth-options">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <div>
            <a href="/register" className="register-link">
              Register?
            </a>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>
        </div>

        <button type="submit">Sign in</button>
        <p className="demo-note">Demo: Use any email/password</p>
      </form>
    </div>
  );
};

export default LoginPage;
