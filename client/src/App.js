import './App.css'
import Register from './pages/Register'
import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Home from './pages/Home'
import Post from './pages/Post'
import CreatePost from './pages/CreatePost'

function App() {

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    )
  }

  const router =  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/post/:id",
          element: <Post />
        },
        {
          path: "/createPost",
          element: <CreatePost />
        }
      ]
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    }
  ])


  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
