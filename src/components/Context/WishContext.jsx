import axios from "axios";
import { baseURL } from "../Utils/Baseurl";
import { createContext, useState } from "react";

export let wishContext = createContext(0)

function addToWishList(productId){
    return axios.post(baseURL + "wishlist",{productId},{
        headers:{
            token: localStorage.getItem("token")
        }
    })
    .then(({data})=>data).catch(err => err)
    
}

function getWishItem(){
    return axios.get(baseURL +"wishlist",{
        headers:{
            token: localStorage.getItem("token")
        }
    }).then(({data})=>data).catch(err => err)
}

function removeWishItem(productId){
    return axios.delete(baseURL +"wishlist/"+ productId ,{
        headers:{
            token: localStorage.getItem("token")
        }
    }).then(({data})=>data).catch(err => err)
}

export default  function WishContextProvider({children}){
    const [wishCounter, setwishCounter] = useState(0)
    
    return <wishContext.Provider value={{
        wishCounter,
        setwishCounter,
        addToWishList,
        getWishItem,
        removeWishItem,
       
        }}>
            {children}
        </wishContext.Provider>
}