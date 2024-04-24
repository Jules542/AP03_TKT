import { createContext, useEffect, useState } from "react";

const defaultContext = {
  toggleDark: () => {},
  isDark: false,
};

export const ThemeContext = createContext(defaultContext);

export const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const localTheme = window.localStorage.getItem("theme");
    return localTheme ? JSON.parse(localTheme) : false;
  });

  useEffect(() => {
    window.localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  const toggleDark = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
