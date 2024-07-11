import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router';
import Router from './components/Router/Router';

const App: React.FC = (): JSX.Element => {
  return <RouterProvider router={Router} />;
};

export default App;
