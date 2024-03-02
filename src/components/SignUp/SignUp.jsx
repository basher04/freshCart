import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {

  // function validate(values){

  //   const myError = {}

  //   if(!values.name){
  //     myError.name = "name is required"
  //   }

  //   if(!values.email){
  //     myError.email = "email is required"
  //   }

  //   if(!/^[A-Z][A-Za-z0-9]{6,}$/.test(values.password)){
  //     myError.password = "Password must be 7 characters or more and start with a capital letter"
  //   }

  //   if(values.rePassword !== values.password){
  //     myError.rePassword = "Password and rePassword not match"
  //   }

  //   return myError
  // }
  let navigate = useNavigate() 

  const [errorMessage, seterrorMessage] = useState('')
  const [loading, setLoading] = useState(true)

  function sendDataToBackend(values){

    setLoading(false)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
    .then(({data})=> {
      console.log(data)
      if(data.message === "success"){
        navigate("/signin")
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
      name: Yup.string().min(2).max(20).required(),
      email: Yup.string().required(),
      password: Yup.string().matches(/^[A-Z][A-Za-z0-9]{6,}$/).required(),
      rePassword: Yup.string().oneOf([Yup.ref('password')]).required()
      
    })

    return schema
  }

  let register = useFormik({
    initialValues:{
      name: '' ,
      email: '' ,
      password: '' ,
      rePassword: ''
    },
    validationSchema,
    onSubmit:(values)=>{
      sendDataToBackend(values)
    }
  })

  

  return (
    <>
    <div className="container w-75 m-auto my-4">
      <h2>Register Now:</h2>
      <form onSubmit={register.handleSubmit} >

        <label htmlFor="name">Name:</label>
        <input onBlur={register.handleBlur} onChange={register.handleChange} type="text" name='name' className="form-control mb-3"  id='name' placeholder=''/>

        {register.errors.name && register.touched.name ? <div className="alert alert-danger">{register.errors.name}</div> : ''}


        <label htmlFor="email">Email:</label>
        <input onBlur={register.handleBlur} onChange={register.handleChange} type="email" name='email' className="form-control mb-3"  id='email' placeholder=''/>
        {register.errors.email && register.touched.email ? <div className="alert alert-danger">{register.errors.email}</div> : ''}


        <label htmlFor="password">Password:</label>
        <input onBlur={register.handleBlur} onChange={register.handleChange} type="password" name='password' className="form-control mb-3"  id='password' placeholder=''/>
        {register.errors.password && register.touched.password ? <div className="alert alert-danger">{register.errors.password}</div> : ''}


        <label htmlFor="repassword">rePassword:</label>
        <input onBlur={register.handleBlur} onChange={register.handleChange} type="password" name='rePassword' className="form-control mb-3"  id='repassword' placeholder=''/>
        {register.errors.rePassword && register.touched.rePassword ? <div className="alert alert-danger">{register.errors.rePassword}</div> : ''}

        {errorMessage? <div className="alert alert-danger">{errorMessage}</div> : ''}


        <button disabled={!(register.dirty && register.isValid)} type="submit" className="btn bg-main text-white">
          {loading ? "SignUp" : <i className="fa-solid fa-spinner fa-spin px-3" ></i>}
        </button>

      </form>

    </div>
    </>
  )
}
