import { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import AffectationMissions from "./pages/AffectationMissions.jsx";
import Attractions from "./pages/Attractions.jsx";
import Login from "./pages/Login.jsx";
import NouvelleMission from "./pages/NouvelleMission.jsx";
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
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="affectations"
              element={<AffectationMissions />}
            ></Route>
            <Route
              path="affectations/nouvelle"
              element={<NouvelleMission />}
            ></Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
