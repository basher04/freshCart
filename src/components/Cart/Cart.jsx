import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../Context/CartContext'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Cart() {

  let  {getCartItem ,deleteCartItem ,setCounter,updateQTY} = useContext(cartContext)
  const [data, setdata] = useState(null)
  const [loading, setloading] = useState(true)

  useEffect(()=>{
    (async ()=>{ 
      setloading(false)
      let data =  await getCartItem()

      if(data?.response?.data.statusMsg === "fail"){
        setdata(null)
      }else{
        setdata(data)
      }
      console.log(data)
      setloading(true)
    }
    )()
  },[])

  async function deleteCart(productId){
    let data = await deleteCartItem(productId)
    console.log(data)
    if(data.status === "success"){
      toast.error("Product deleted successfully.")
      setCounter(data.numOfCartItems)
      setdata(data)
    }
  }

  async function upDateProductQTY(productId , count){
    let data = await updateQTY(productId , count)
    console.log(data)
    if(data.status === "success"){
      toast.success("Product updated successfully.")
      setCounter(data.numOfCartItems)
      setdata(data)
    }
  }

  if(!loading) return <div>loading....</div>
  if(data === null || data.numOfCartItems === 0) return <h2 className="text-center my-5 text-main mt-5 pt-5">No items in the cart</h2>

  return (

    <div className='pt-5'>
    <div className="container mt-5 bg-main-light px-3 rounded-1 pt-5">
      <h2>Shop Cart:</h2>
      <p className='text-main border-bottom'>Total Cart Price : {data?.data.totalCartPrice} EGP</p>

      {data?.data.products.map(item =>{
        return <div key={item._id} className="row py-2 border-bottom">
          <div className='col-md-1'>
            <img src={item.product.imageCover} className='w-100' alt="" />
          </div>
          <div className="col-md-11 d-flex justify-content-between align-items-center">
            <div>
              <p className='m-1'>{item.product.title.split(" ").slice(0,10).join(" ")}</p>
              <p className='text-main m-1 p-0'>Price: {item.price} EGP</p>
              <button onClick={()=>deleteCart(item.product._id)} className='btn m-0 p-0'><i className="fa-solid text-main fa-trash-can"></i>Remove</button>
            </div>
            <div>
              <button onClick={()=> upDateProductQTY(item.product._id, item.count + 1)} className='btn brdr'>+</button>
              <span className='px-2'>{item.count}</span>
              <button disabled={item.count <= 1} onClick={()=> upDateProductQTY(item.product._id, item.count - 1)} className='btn brdr'>-</button>
            </div>
          </div>
        </div>
      })}

      <Link to={`/address/${data.data._id}`}className='btn bg-main text-white my-3'>place order</Link>
    </div>
    </div>
  )
}
