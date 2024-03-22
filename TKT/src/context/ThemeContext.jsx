import { createContext, useEffect, useState } from "react";

// This variable contains the default context which will
// (unless there's a bug) always be overridden.
const defaultContext = {
  toggleDark: () => {
    console.warn("Should have been overriden");
  },
  isDark: true,
};

// Create the context from the default context.
export const ThemeContext = createContext(defaultContext);

// Define and export a component to
// wrap the React provider in order to define
// a context based on a useState
export const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  // After this component has loaded, read the local storage.
  useEffect(() => {
    const lsDark = JSON.parse(localStorage.getItem("ThemeContext:isDark"));
    if (lsDark !== undefined && lsDark !== null) {
      setIsDark(lsDark);
      // Detect if the user explicitly requests a light theme.
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      setIsDark(false);
    }
  }, []);

  const context = {
    toggleDark: () => {
      // Each time we toggle the theme, write to local storage
      localStorage.setItem("ThemeContext:isDark", String(!isDark));
      setIsDark(!isDark);
    },
    isDark,
  };
  // Generate a provider with our context
  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
