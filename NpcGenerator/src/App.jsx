// src/App.js
import React from 'react';
import NpcGenerator from './components/NpcGenerator';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom';
import Info from './Info';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Info />
    },
    {
      path: "generate",
      element: <NpcGenerator />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;