import API from "./api";

// Giriş fonksiyonu
export const login = async (credentials) => {
  try {
    const response = await API.post("/user/login/", credentials);
    if (response.data.access) {
      const token = response.data.access;
      const user = parseJwt(token);
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Token yenileme fonksiyonu
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("Refresh token bulunamadı.");
  }

  try {
    const response = await API.post("/user/login/refresh/", {
      refresh: refreshToken,
    });
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch (error) {
    logout(); // Token yenileme başarısızsa kullanıcıyı çıkış yaptır
    throw error.response.data;
  }
};

// JWT token'ı ayrıştırma fonksiyonu
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

// Kayıt fonksiyonu
export const register = async (userData) => {
  try {
    const response = await API.post("/user/register/", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Çıkış fonksiyonu
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

// import API from "./api";

// // Giriş fonksiyonu
// export const login = async (credentials) => {
//   try {
//     const response = await API.post("/user/login/", credentials);
//     if (response.data.access) {
//       localStorage.setItem("token", response.data.access);
//     }
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// // Kayıt fonksiyonu
// export const register = async (userData) => {
//   try {
//     const response = await API.post("/user/register/", userData);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// // Çıkış fonksiyonu
// export const logout = () => {
//   localStorage.removeItem("token");
// };
