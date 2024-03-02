import axios from 'axios'
import React, { createContext, useState } from 'react'
import { baseURL } from '../Utils/Baseurl'



    export let cartContext = createContext(0)

    function addToCart(productId){
        return axios.post(baseURL+"cart",{productId},{
            headers :{
                token: localStorage.getItem('token')}
        })
        .then(({data})=>data).catch( err => err)
    }

    function getCartItem(){
        return axios.get(baseURL+"cart",{
            headers :{
                token: localStorage.getItem('token')}
        })
        .then(({data})=>data).catch( err => err)
    }

    function deleteCartItem(productId){
        return axios.delete(baseURL+"cart/"+productId,{
            headers :{
                token: localStorage.getItem('token')}
        })
        .then(({data})=>data).catch( err => err)
    }
    
    function updateQTY(productId , count){
        return axios.put(baseURL+"cart/"+productId,{count},{
            headers :{
                token: localStorage.getItem('token')}
        })
        .then(({data})=>data).catch( err => err)
    }

    function pay(cartId , shippingAddress){
        return axios.post(baseURL+"orders/checkout-session/"+cartId,{shippingAddress},{
            headers :{
                token: localStorage.getItem('token')}
        })
        .then(({data})=>data).catch( err => err)
    }

    export default function StoreContextProvider({children}){

        const [counter, setCounter] = useState(0)
        return  <cartContext.Provider value={{
                counter,
                setCounter,
                addToCart,
                getCartItem,
                deleteCartItem,
                updateQTY,
                pay
                }}>

                    {children}
                </cartContext.Provider>
    }


