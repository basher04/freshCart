import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function Categories() {


  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data}  =useQuery('getCategories',getCategories)
  console.log(data?.data.data)

  return (
    <>
      <div className="container my-5 pt-3">
        <div className="row g-4 mt-5">
          {data?.data.data.map((item)=>{
            return <div  key={item._id} className="col-md-4">
                      <div className="item card position-relative product cursor-pointer"  >
                        <img className="w-100 rounded" src={item.image}  height={350} alt="" />
                        <div class="card-body rounded-bottom position-absolute bg-white w-100 bottom-0">
                          <h4 className="text-center text-main fw-bolder">{item.name}</h4>
                        </div>
                      </div>
                    </div>
          })}
        </div>
      </div>
    </>
  )
}

// {why i cant do onclick}