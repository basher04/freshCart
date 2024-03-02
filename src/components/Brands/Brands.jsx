import axios from 'axios'
import React from 'react'
import { baseURL } from '../Utils/Baseurl'
import { useQuery } from 'react-query'

export default function Brands() {

  function getBrand(){
    return axios.get(baseURL +'brands')
  }

  let {data} = useQuery('getBrand',getBrand)
  console.log(data?.data.data)



  return (
    <>
    <div className="container mt-5 pt-5">
      <div className="row g-4">
        {data?.data.data.map((value)=>{
          return<div key={value._id} className="col-md-3">
                  <div className="item product">
                    <img src={value.image} className='w-100' alt="" />
                    <p className="text-center">{value.name}</p>
                  </div>
                </div>
        })}
      </div>
    </div>
    </>
  )
}
