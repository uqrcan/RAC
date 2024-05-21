import React, { useState } from "react";
import API from "../services/api";

const HomePage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availableCars, setAvailableCars] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await API.get("/api/available-cars/", {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      setAvailableCars(response.data);
    } catch (error) {
      console.error("Araçları getirirken bir hata oluştu:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-white">Rent A Car</h1>
      <div className="form-group">
        <label htmlFor="startDate" className="text-white">
          Başlangıç Tarihi:
        </label>
        <input
          type="date"
          id="startDate"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate" className="text-white">
          Bitiş Tarihi:
        </label>
        <input
          type="date"
          id="endDate"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSearch}>
        Araç Ara
      </button>
      <div className="mt-4">
        <h2 className="text-white">Müsait Araçlar</h2>
        {availableCars.length === 0 ? (
          <p className="text-white">
            Bu tarihler arasında müsait araç bulunamadı.
          </p>
        ) : (
          <ul className="list-group">
            {availableCars.map((car) => (
              <li key={car.id} className="list-group-item bg-dark text-white">
                {car.brand} {car.model}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;

// import React, { useState } from "react";
// import API from "../services/api";

// const HomePage = () => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [availableCars, setAvailableCars] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await API.get("/api/available-cars/", {
//         params: {
//           start_date: startDate,
//           end_date: endDate,
//         },
//       });
//       setAvailableCars(response.data);
//     } catch (error) {
//       console.error("Araçları getirirken bir hata oluştu:", error);
//     }
//   };

//   const handleReserve = async (carId) => {
//     try {
//       await API.post("/api/reservations/", {
//         car: carId,
//         start_date: startDate,
//         end_date: endDate,
//       });
//       alert("Rezervasyon başarılı!");
//     } catch (error) {
//       console.error("Rezervasyon yaparken bir hata oluştu:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Rent A Car</h1>
//       <div className="form-group">
//         <label htmlFor="startDate">Başlangıç Tarihi:</label>
//         <input
//           type="date"
//           id="startDate"
//           className="form-control"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="endDate">Bitiş Tarihi:</label>
//         <input
//           type="date"
//           id="endDate"
//           className="form-control"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//       </div>
//       <button className="btn btn-primary" onClick={handleSearch}>
//         Araç Ara
//       </button>
//       <div className="mt-4">
//         <h2>Müsait Araçlar</h2>
//         {availableCars.length === 0 ? (
//           <p>Bu tarihler arasında müsait araç bulunamadı.</p>
//         ) : (
//           <ul className="list-group">
//             {availableCars.map((car) => (
//               <li
//                 key={car.id}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//               >
//                 {car.brand} {car.model}
//                 <button
//                   className="btn btn-success"
//                   onClick={() => handleReserve(car.id)}
//                 >
//                   Rezervasyon Yap
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
