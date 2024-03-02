import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import { toast } from 'react-toastify';
import { wishContext } from '../Context/WishContext';


export default function Product({item}) {

  let  {setCounter,addToCart,} = useContext(cartContext)
  let  {setwishCounter,addToWishList}= useContext(wishContext)
  let [loading, setloading] = useState(true)
  
  
  
  async function addProductToCart(productId){
    setloading(false)
    let data = await addToCart(productId)
    console.log(data)
    if(data.status === "success"){
      toast.success("Product added successfully")
      setCounter(data.numOfCartItems)
      setloading(true)
    }
  }


  let myStyle ={}
  const [color, setcolor] = useState(myStyle)

  
  async function addProductToWish(productId){
    
    let data = await addToWishList(productId)
    console.log(data)
    if(data.status === "success"){
      toast.success("Product added successfully")
      setwishCounter(data.data.length)
      setcolor({color: "red"})
    }

    
  }

  return (

    <>
    <div className="col-md-3">
                    <div className="product cursor-pointer rounded-3 p-3">
                      <Link to={'/product-details/'+ item._id}>
                      <img src={item.imageCover} className='w-100' alt="" />
                      <span className='text-main'>{item.category.name}</span>
                      <h5 className="my-2 fw-bold">{item.title.split(' ').slice(0,2).join(' ')}</h5>
                      <div className="d-flex justify-content-between my-3">
                        <div>
                          {item.price} EGP
                        </div>
                        <div>
                          <i className="fa-solid fa-star rating-color"></i>
                          {item.ratingsAverage} 
                        </div>
                      </div>
                      </Link>
                      <div className="d-flex  justify-content-end ">
                        <i style={color} onClick={()=>addProductToWish(item._id)} className="fa-solid fa-heart h3"></i>
                      </div>
                      <button disabled={!loading} onClick={() => addProductToCart(item._id)} className="btn bg-main text-white w-100">
                        {loading?"Add To Cart": <div>loadind....</div>}
                        </button>
                    </div>
                  </div>
    </>
  )
}
