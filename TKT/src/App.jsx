import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext.jsx";
import "./stylesheets/main.scss";

function App() {
  const { isDark } = useContext(ThemeContext);
  useEffect(() => {
    document.body.classList.toggle("theme--dark", isDark);
    document.body.classList.toggle("theme--light", !isDark);
  }, [isDark]);
  return <></>;
}

export default App;
