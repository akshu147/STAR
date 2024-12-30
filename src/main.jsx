import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './assets/pages/Login'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Deshboard from './assets/pages/deshboard'
// import App from './App.jsx'

const routes = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"deshboard",
    element:<Deshboard/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}>

    </RouterProvider>
    
  </StrictMode>,
)
