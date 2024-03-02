import React, { useContext, useState } from 'react'
import { wishContext } from '../Context/WishContext'
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { cartContext } from '../Context/CartContext';



export default function WishList() {

  const [data, setdata] = useState([])
  // const [isLoading, setisLoading] = useState(true)
  

  let { setwishCounter,getWishItem , removeWishItem} = useContext(wishContext)
  let  {setCounter,addToCart,} = useContext(cartContext)

  useEffect(()=>{
   ( async ()=>{
    // setisLoading(false)
    let {data} = await getWishItem()
    console.log(data)
    setdata(data)
    // setisLoading(true)
  })()
  },[])
// why not ,[] in the useEffect

  async function removeFromWish(productId){
    let data = await removeWishItem(productId)
    console.log(data)
    if(data.status === 'success'){
      toast.error("Product deleted successfully." ,{
        toastId: "customId"
      })
      // setdata(data)
      setwishCounter(data.data.length)
    }
  }

async function addProductToCart(productId){
  let data = await addToCart(productId)
  console.log(data)
  if(data.status === "success"){
    toast.success("Product added successfully")
    setCounter(data.numOfCartItems)
  }
  
  removeFromWish(productId)
  toast.dismiss("customId")
}

  // if(!isLoading) return <h1>loading....</h1>
  return (
    <div className='pt-5'>
      <div className="container  bg-main-light px-3 rounded-1 mt-5 pt-5">
        
          {data.map(item =>{
            return <div  key={item._id} className='row py-2 border-bottom'>
              <div className="col-md-2" >
              <img src={item.imageCover} className='w-100' alt="" />
              </div>
              <div className="col-md-10 d-flex justify-content-between">
            <div>
              <p className='m-1'>{item.category.name.split(" ").slice(0,10).join(" ")}</p>
              <p className='text-main m-1 p-0'>Price: {item.price} EGP</p>
              <button onClick={()=>removeFromWish(item.id)} className='btn m-0 p-0'><i className="fa-solid text-main fa-trash-can"></i>Remove</button>
            </div>
            <div>
             <button onClick={()=>addProductToCart(item.id)} className='btn bg-main text-white'>add to cart</button>
            </div>
            </div>
            </div>
          })}
        </div>
    </div>
  )
}















// import React, { useContext } from 'react'
// import { wishContext } from '../Context/WishContext'
// import { useEffect } from "react";
// import { useQuery } from 'react-query'
// import { Link } from 'react-router-dom'



// export default function WishList() {


//   let {getWishItem} = useContext(wishContext)

//   async function getwishProduct(){
//     let data = await getWishItem()
//     console.log(data.data)
//   }

//   let {data} = useQuery("getwishProduct",getwishProduct)
//   console.log(data)

//   return (
//     <>
// <div className="container my-2 bg-bg-main-light p-3 rounded-1">
//       <h2>Shop Cart:</h2>
//       <p className='text-main'>Total Cart Price : {data?.data.totalCartPrice} EGP</p>

//       {data?.data.map(item =>{
//         return <div key={item._id} className="row py-2 border-bottom">
//           <div className='col-md-1'>
//             <img src={item.imageCover} className='w-100' alt="" />
//           </div>
//           <div className="col-md-11 d-flex justify-content-between">
//             <div>
//               <p className='m-1'>{item.product.title.split(" ").slice(0,10).join(" ")}</p>
//               <p className='text-main m-1 p-0'>Price: {item.price} EGP</p>
//               <button  className='btn m-0 p-0'><i className="fa-solid text-main fa-trash-can"></i>Remove</button>
//             </div>
//             <div>
//               <button  className='btn brdr'>+</button>
//               <span className='px-2'>{item.count}</span>
//               <button  className='btn brdr'>-</button>
//             </div>
//           </div>
//         </div>
//       })}

//       <Link to=""className='btn bg-main text-white my-3'>place order</Link>
//     </div>
//     </>
//   )
// }
