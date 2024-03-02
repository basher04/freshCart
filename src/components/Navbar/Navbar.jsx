import React, { useContext, useEffect } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import logo from "../../assets/images/freshcart-logo.svg"
import { wishContext } from '../Context/WishContext'

export default function Navbar() {

  let  {counter,setCounter,getCartItem} = useContext(cartContext)
  let {wishCounter,setwishCounter,getWishItem} = useContext(wishContext)

  useEffect(()=>{
    (async ()=>{ 
      let data =  await getCartItem()
      console.log(data)
      setCounter( data.numOfCartItems)
    }
    )()
  })


  useEffect(()=>{
    ( async ()=>{
      let {data} = await getWishItem()
      console.log(data)
      setwishCounter(data.length)
  })()
  })

let nav =  useNavigate()

  function logOut(){
    localStorage.setItem("token" , '')
    console.log(true)
    nav('/signin')
  }


  return (
    <>

<nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top p-2">
  <div className="container-fluid mx-3">
    <NavLink className="navbar-brand" to="/">
        <img src={logo} alt="" />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/brands">Brands</NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link position-relative" to="/cart">
            Cart
            <i className="fa-solid fa-cart-shopping cartIcon ms-1"></i>
                {counter?<span className="position-absolute  top-1 start-100 translate-middle badge rounded-pill bg-danger">
                              {counter}
                            <span className="visually-hidden">unread messages</span>
                          </span>:""}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link position-relative" to="/wishlist">
            Wishlist
            <i className="fa-solid fa-heart cartIcon ms-1"></i>
                {wishCounter?<span className="position-absolute  top-1 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishCounter}
                <span className="visually-hidden">unread messages</span>
            </span>:""}
          </NavLink>
        </li>
        <li className="nav-item ms-1 ">
          <button onClick={()=>logOut()} className="nav-link mt-1" >SignOut</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}
