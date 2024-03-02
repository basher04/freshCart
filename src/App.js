import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Navbar from './components/Navbar/Navbar'
import MainLayOut from './components/LayOuts/MainLayOut'
import AthoLayOut from './components/LayOuts/AthoLayOut'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import WishList from './components/WishList/WishList'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import NotFound from './components/NotFound/NotFound'
import { Offline } from "react-detect-offline";
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import StoreContextProvider from './components/Context/CartContext'
import { ToastContainer } from 'react-toastify';
import Address from './components/Address/Address'
import WishContextProvider from './components/Context/WishContext'



export default function App() {

  let routes = createBrowserRouter([
    {path:"/",element: <MainLayOut/> ,children:[
    {index: true,element: <ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:"home",element: <ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:"products",element: <ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:"categories",element: <ProtectedRoutes><Categories/></ProtectedRoutes>},
    {path:"brands",element: <ProtectedRoutes><Brands/></ProtectedRoutes>},
    {path:"cart",element: <ProtectedRoutes><Cart/></ProtectedRoutes>},
    {path:"wishlist",element: <ProtectedRoutes><WishList/></ProtectedRoutes>},
    {path:"product-details/:_id",element: <ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
    {path:"address/:id",element: <ProtectedRoutes><Address/></ProtectedRoutes>},
    {path: "*" , element: <NotFound/>}
  ]},

  {path:"/",element: <AthoLayOut/> ,children:[
    {path:"signin",element: <SignIn/>},
    {path:"signup",element: <SignUp/>},
  ]}


  ])
  
  return (
    <>

    <ToastContainer autoClose={1000} theme="colored"/>
    
    <Offline>
      <div className='offline' >you are offline Now!</div>
    </Offline>

    <WishContextProvider>
      <StoreContextProvider>
        <RouterProvider router={routes} />
      </StoreContextProvider>
    </WishContextProvider>
    </>
  )
}
