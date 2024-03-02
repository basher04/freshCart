import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import { toast } from 'react-toastify'
import { wishContext } from '../Context/WishContext'

export default function ProductDetails() {

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [isloading, setisloading] = useState(true)
    let   {setwishCounter,addToWishList}= useContext(wishContext)
    let   {setCounter ,addToCart} =  useContext(cartContext)


    let x = useParams()
    console.log(x)

    async function getProduct(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x._id}`)
        setProduct(data.data)
        console.log(data.data)
        setLoading(false)
    }
    useEffect(()=>{
        getProduct()
    },[])

    // why https://react.dev/warnings/invalid-hook-call-warning

    async function addProductToCart(productId){
        setisloading(false)
    let data = await addToCart(productId)
    console.log(data)
    if(data.status === "success"){
        toast.success("Product added successfully")
        setCounter(data.numOfCartItems)
        setisloading(true)
        }
    }

    async function addProductToWish(productId){
        let data = await addToWishList(productId)
        console.log(data)
        if(data.status === "success"){
            toast.success("Product added successfully")
            setwishCounter(data.data.length)
        }
    }





    if(loading) return <h1 className='mt-5'>loading...</h1>

    return (
    <>
    <div className="container my-5">
        <div className="row mt-5">
            <div className="col-md-3">
                <img src={product.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-9">
                <h4 className="fw-bold">{product.title}</h4>
                <p className='my-3'>{product.description}</p>
                <span>{product.category.name}</span>

                <div className="d-flex justify-content-between my-4">
                    <div>
                        <div>
                            <p>{product.price} EGP</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <i className="fa-solid fa-star rating-color"></i>
                            {product.ratingsAverage} 
                            <div className="d-flex  justify-content-end mt-3">
                                <i onClick={()=>addProductToWish(product._id)} className="fa-solid fa-heart h2"></i>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <button disabled={!isloading} onClick={() => addProductToCart(product._id)} className="btn bg-main text-white w-100">
                    {isloading?"Add To Cart": <div>loadind....</div>}
                </button>
            </div>
        </div>

    </div>

    </>
    )
}
