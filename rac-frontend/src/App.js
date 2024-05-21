import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/cars"
            element={
              <PrivateRoute>
                <CarListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cars/:id"
            element={
              <PrivateRoute>
                <CarDetailPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CarListPage from "./pages/CarListPage";
// import CarDetailPage from "./pages/CarDetailPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import Navbar from "./components/Navbar";
// import PrivateRoute from "./components/PrivateRoute";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route
//             path="/cars"
//             element={
//               <PrivateRoute>
//                 <CarListPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/cars/:id"
//             element={
//               <PrivateRoute>
//                 <CarDetailPage />
//               </PrivateRoute>
//             }
//           />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
