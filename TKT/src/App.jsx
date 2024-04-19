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
import UserMissions from "./pages/UserMissions.jsx";
import "./stylesheets/main.scss";
import Avertissements from "./pages/Avertissements.jsx";
import NouveauAvertissement from "./pages/NouveauAvertissement.jsx";
import HomePage from "./pages/HomePage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <UserProvider>
        <ThemeContextProvider>
          <Router>
          <ToastContainer />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
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
            <Route
              path="avertissements/nouveau"
              element={<NouveauAvertissement />}
            ></Route>
            <Route path="/avertissements" element={<Avertissements />} />
              <Route path="/gestion-utilisateurs" element={<GestionUsers />} />
              <Route path="/gestion-utilisateurs/new" element={<NewUserPage />} />
            <Route
              path="affectations/nouvelle"
              element={<NouvelleMission />}
            ></Route>
            <Route path="/missions" element={<UserMissions />} />
            </Routes>
            </Router>
            </ThemeContextProvider>
            
      </UserProvider>
    </>
  );
}

export default App;
