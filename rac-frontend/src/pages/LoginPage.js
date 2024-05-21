import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/cars");
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-white">Giriş Yap</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-white">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-white">Şifre</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
