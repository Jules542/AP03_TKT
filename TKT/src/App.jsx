import { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";
import "./stylesheets/main.scss";

function App() {
  const { isDark } = useContext(ThemeContext);
  useEffect(() => {
    document.body.classList.toggle("theme--dark", isDark);
    document.body.classList.toggle("theme--light", !isDark);
  }, [isDark]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Welcome to the homepage</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
