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
    <div>
      {car ? (
        <div>
          <img src={car.image} alt={car.name} style={{ maxWidth: "100%" }} />
          <p>Marka: {car.brand}</p>
          <p>Model: {car.model}</p>
          <p>Fiyat: Günlük / {car.rent_per_day} TL</p>
          <p>Vites: {car.gear}</p>
        </div>
      ) : (
        <p>Araba bulunamadı.</p>
      )}
    </div>
  );
};

export default CarDetailPage;
