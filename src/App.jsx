import './svg.sass'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
// import ProtectedRoute from './components/ProtectedRoute'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/keke",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },{
      path: "/admin",
      element: <Admin />,
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}


export default App
