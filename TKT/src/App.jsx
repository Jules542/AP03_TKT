import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import AffectationMissions from "./pages/AffectationMissions.jsx";
import Attractions from "./pages/Attractions.jsx";
import Login from "./pages/Login.jsx";
import NouvelleMission from "./pages/NouvelleMission.jsx";
import GestionUsers from "./pages/GestionUsers.jsx";
import NewUserPage from "./pages/NewUserPage.jsx";
import "./stylesheets/main.scss";

function App() {
  return (
    <>
      <UserProvider>
        <ThemeContextProvider>
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
              <Route path="/gestion-utilisateurs" element={<GestionUsers />} />
              <Route path="/gestion-utilisateurs/new" element={<NewUserPage />} />
            </Routes>
          </Router>
        </ThemeContextProvider>
      </UserProvider>
    </>
  );
}

export default App;
