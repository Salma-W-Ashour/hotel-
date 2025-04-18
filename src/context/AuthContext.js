import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // عند تحميل الصفحة، تحقق إذا كانت هناك بيانات للمستخدم في localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      // navigate(savedUser.role === "admin" ? "/admin" : "/");
    }
  }, [navigate]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // حفظ بيانات المستخدم في localStorage
    navigate(userData.role === "admin" ? "/admin" : "/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // حذف بيانات المستخدم عند الخروج
    // navigate("/sign-in");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
