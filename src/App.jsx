import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Carts from './components/Carts/Carts'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import UserContextProvider from './context/userContext'
import CartContextProvider from './context/cartContext'
import Checkout from './components/Checkout/Checkout'
import { Toaster } from 'react-hot-toast'
import AllOrders from './components/allorders/allorders'


function App() {

  let paths = createBrowserRouter([
    {path:'', element:<Layout/> , children:[
      {index:'/', element: <Home/>},
      {path:'products', element: <ProtectedRoutes> <Products/> </ProtectedRoutes>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'brands', element:<ProtectedRoutes> <Brands/> </ProtectedRoutes>},
      {path:'carts', element: <ProtectedRoutes> <Carts/> </ProtectedRoutes>},
      {path:'products/productDetails/:id', element: <ProtectedRoutes> <ProductDetails/> </ProtectedRoutes>},
      {path:'checkout/:cartId', element: <ProtectedRoutes> <Checkout/> </ProtectedRoutes>},
      {path:'allorders', element: <ProtectedRoutes> <AllOrders/> </ProtectedRoutes>},
      {path:'*', element:<NotFound/>},
    ]}
  ])

  return (
    <CartContextProvider>
    <UserContextProvider>
     <RouterProvider router = {paths}></RouterProvider>
     <Toaster/>
    </UserContextProvider>
    </CartContextProvider>
    
  )
}

export default App
