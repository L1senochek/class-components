import React, { createContext, ReactNode, useState } from 'react';

export interface IThemeContextState {
  theme: string;
  toggleTheme: () => void;
}

export interface IThemeProviderProps {
  children: ReactNode;
}
const defaultThemeContextState: IThemeContextState = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<IThemeContextState>(
  defaultThemeContextState
);

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
