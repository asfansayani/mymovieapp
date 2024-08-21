import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./Home"
import App from './App'
import './index.css'
import Movies from './Movies'
import Movie from './Movie'
const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path:"/mymovieapp",
        element: <Home />,
      }, {
        path:"/mymovieapp/movies",
        element: <Movies />
      },  {
        path:"/mymovieapp/movie/:id",
        element: <Movie />
      }, {
        path:"/mymovieapp/tv/:id",
        element: <Movie />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

