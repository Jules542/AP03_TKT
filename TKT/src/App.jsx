import { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Login from "./pages/Login.jsx";
import "./stylesheets/main.scss";

function App() {
  const { isDark } = useContext(ThemeContext);
  useEffect(() => {
    document.body.classList.toggle("theme--dark", isDark);
    document.body.classList.toggle("theme--light", !isDark);
  }, [isDark]);
  return (
    <>
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>Welcome to the homepage</h1>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
