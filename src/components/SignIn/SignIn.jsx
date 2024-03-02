import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {

  let navigate = useNavigate() 

  const [errorMessage, seterrorMessage] = useState('')
  const [loading, setLoading] = useState(true)

  function sendDataToBackend(values){

    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
    .then(({data})=> {
      console.log(data)
      localStorage.setItem('token',data.token)
      if(data.message === "success"){
        navigate("/home")
      }
    }) 
    .catch((err)=>{
      console.log(err.response.data.message)
      seterrorMessage(err.response.data.message)
      setLoading(true)
    })
  }

  function validationSchema(){
    
    let schema = new Yup.object({
      email: Yup.string().required(),
      password: Yup.string().matches(/^[A-Z][A-Za-z0-9]{6,}$/).required()
    })

    return schema
  }

  let login = useFormik({
    initialValues:{
      email: '' ,
      password: '' 
    },
    validationSchema,
    onSubmit:(values)=>{
      sendDataToBackend(values)
    }
  })

  

  return (
    <>
    <div className="container w-75 m-auto my-4">
      <h2>login Now:</h2>
      <form onSubmit={login.handleSubmit} >

        <label htmlFor="email">Email:</label>
        <input onBlur={login.handleBlur} onChange={login.handleChange} type="email" name='email' className="form-control mb-3"  id='email' placeholder=''/>
        {login.errors.email && login.touched.email ? <div className="alert alert-danger">{login.errors.email}</div> : ''}


        <label htmlFor="password">Password:</label>
        <input onBlur={login.handleBlur} onChange={login.handleChange} type="password" name='password' className="form-control mb-3"  id='password' placeholder=''/>
        {login.errors.password && login.touched.password ? <div className="alert alert-danger">{login.errors.password}</div> : ''}

        {errorMessage? <div className="alert alert-danger">{errorMessage}</div> : ''}


        <button disabled={!(login.dirty && login.isValid)} type="submit" className="btn bg-main text-white">
          {loading ? "SignUp" : <i className="fa-solid fa-spinner fa-spin px-3" ></i>}
        </button>

      </form>

    </div>
    </>
  )
}
