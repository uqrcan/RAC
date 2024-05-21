import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password, name });
      navigate("/login");
    } catch (err) {
      setError("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-white">Kayıt Ol</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-white">İsim</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
