import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CarListPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await API.get("api/cars/");
        setCars(response.data);
      } catch (err) {
        setError("Arabalar yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCarClick = (carId) => {
    navigate(`/cars/${carId}`);
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2>Arabalar</h2>
      <div className="row">
        {cars.map((car) => (
          <div key={car.id} className="col-md-4">
            <div className="card mb-4" onClick={() => handleCarClick(car.id)}>
              <img src={car.image} className="card-img-top" alt={car.name} />
              <div className="card-body">
                <h5 className="card-title">
                  {car.brand}&nbsp;
                  {car.model}
                </h5>
                <p className="card-text">
                  <strong>Yıl:</strong> {car.year}
                </p>
                <p className="card-text">
                  <strong>Vites:</strong> {car.gear}
                </p>
                <p className="card-text">
                  <strong>Plaka:</strong> {car.plate_number}
                </p>
                <p className="card-text">
                  <strong>Fiyat:</strong> Günlük / {car.rent_per_day} TL
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarListPage;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// const CarListPage = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await API.get("api/cars/");
//         setCars(response.data);
//       } catch (err) {
//         setError("Arabalar yüklenirken bir hata oluştu.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   const handleCarClick = (carId) => {
//     navigate(`/cars/${carId}`);
//   };

//   if (loading) {
//     return <div>Yükleniyor...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container">
//       <h2>Arabalar</h2>
//       <div className="row">
//         {cars.map((car) => (
//           <div key={car.id} className="col-md-4">
//             <div className="card mb-4" onClick={() => handleCarClick(car.id)}>
//               <img src={car.image} className="card-img-top" alt={car.name} />
//               <div className="card-body">
//                 <h5 className="card-title">{car.name}</h5>
//                 <p className="card-text">{car.description}</p>
//                 <p className="card-text">
//                   <strong>Fiyat: Günlük/ </strong>
//                   {car.rent_per_day} TL
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CarListPage;
