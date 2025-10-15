import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the Context
const ThemeContext = createContext(null);

// Constants for cleaner management
const THEME_KEY = "theme";
const DEFAULT_THEME = "light";

/**
 * Custom hook to consume the theme context.
 * This is the replacement for the manual useContext(ThemeContext) calls.
 */
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

/**
 * Provider component that manages theme state, persistence, and exposes
 * the theme and the toggle function globally.
 */
export const ThemeProvider = ({ children }) => {
	// State initialized from localStorage or defaults
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
	});

	// Effect to apply the theme to the document and persist to localStorage
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem(THEME_KEY, theme);
	}, [theme]);

	// Function to toggle between 'light' and 'dark'
	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
