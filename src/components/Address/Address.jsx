import React, { createContext, useContext, useState } from 'react'
import { useFormik } from 'formik'
import {  useParams } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';


export default function Address() {

    const [loading, setLoading] = useState(true)

    let { pay } = useContext(cartContext)
    // Get the userId param from the URL.
    let { id } = useParams();


    async function sendDataToBackend(values){
    setLoading(false)
    let data = await pay(id ,values )
    console.log(data)
    if(data.status === "success"){
      window.location.href = data.session.url
    }
    }


    let address = useFormik({
    initialValues:{
        details: '' ,
        phone: '' ,
        city: '' 
    },
    onSubmit:(values)=>{
      sendDataToBackend(values)
    }
  })

  

  return (
    <>
    <div className="container w-75 m-auto my-4">
      <h2>Checkout:</h2>
      <form onSubmit={address.handleSubmit} >

        <label htmlFor="details">details:</label>
        <textarea onBlur={address.handleBlur} onChange={address.handleChange} type="text" name='details' className="form-control mb-3"  id='details' placeholder=''></textarea>


        <label htmlFor="phone">phone:</label>
        <input onBlur={address.handleBlur} onChange={address.handleChange} type="number" name='phone' className="form-control mb-3"  id='phone' placeholder=''/>

        <label htmlFor="city">city:</label>
        <input onBlur={address.handleBlur} onChange={address.handleChange} type="text" name='city' className="form-control mb-3"  id='city' placeholder=''/>

        <button disabled={!(address.dirty && address.isValid)} type="submit" className="btn bg-main text-white">
            {loading ? "Pay" : <i className="fa-solid fa-spinner fa-spin px-3" ></i>}
        </button>

        </form>

    </div>
    </>
)
}
