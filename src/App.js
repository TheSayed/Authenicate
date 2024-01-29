import React from 'react';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Layout from './Components/Layout/Layout.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound.jsx';
import Home from './Components/Home/Home.jsx';


let routers = createBrowserRouter([
  {
    path: "/", element: <Layout />, children: [
      { path: "home", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ]
  }
])



export default function App() {
  return (
    <>

      <RouterProvider style={{ position: 'relative' }} router={routers}></RouterProvider>
    </>
  );
}