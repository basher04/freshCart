import axios from 'axios'
// import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import { useQuery } from 'react-query'


export default function Products() {

  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    
  }

  let {data , isLoading} = useQuery('getProducts',getProducts)
  console.log(data?.data.data)

  // const [products, setProducts] = useState([])
  // const [loading, setloading] = useState(true)

  // async function getProducts(){
  //   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  //   console.log(data.data)
  //   setProducts(data.data)
  //   setloading(false)
  // }

  // useEffect(()=>{
  //   getProducts()
  // })

  if(isLoading) return <div>loading....</div>

  return (
    <>
    <div className="container my-5 pt-5">
      <div className="row">
        {data?.data.data.map((item)=> <Product item={item} key={item._id} /> )}
      </div>
    </div>
    </>
  )
}
