import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Rent A Car
      </Link>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cars">
                  Araçlar
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                >
                  Çıkış Yap
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Giriş Yap
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Kayıt Ol
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
