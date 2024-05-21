import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await API.get(`/api/cars/${id}/`);
        setCar(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>Hata: {error.detail || "Bir hata oluştu."}</p>;
  }

  return (
    <div className="container mt-5">
      {car ? (
        <div className="card text-white bg-dark">
          <img
            src={car.image}
            className="card-img-top"
            alt={car.name}
            style={{ height: "500px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">Araç Detayı</h5>
            <p className="card-text">Marka: {car.brand}</p>
            <p className="card-text">Model: {car.model}</p>
            <p className="card-text">Fiyat: Günlük / {car.rent_per_day} TL</p>
            <p className="card-text">Vites: {car.gear}</p>
          </div>
        </div>
      ) : (
        <p className="text-white">Araba bulunamadı.</p>
      )}
    </div>
  );
};

export default CarDetailPage;
