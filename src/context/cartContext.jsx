import React from 'react'
import { createContext,useEffect, useState } from "react";
import axios from 'axios'


let headers = {
    token: localStorage.getItem('userToken')
}

// home >> 40 >>>> 2 send/add to API >>> request >>> header(token) + body(id)>> in the endpoint
export const cartContext = createContext();

export default function CartContextProvider(props) {

    let [cartNumber, setCartNumber] = useState(0)
    // addproduct
    function addProductToCart(productId){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            
            {productId: productId},
            {headers: headers}
        )
        .then((response)=>{
            console.log('response', response)
            setCartNumber(response.data.numOfCartItems)
            return response})
        .catch((error)=>error)
    }

    function getProductToCart(productID){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            {headers: headers}
        // we will use headers with more than one end point (add, delete update products) then create public variable

        )
       .then((response)=>{
            setCartNumber(response.data.numOfCartItems)
            return response})
        .catch((error)=>error)
    }
    function deleteProductFromCart(productID){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
            {headers: headers}
        )
        .then((response)=>{
            setCartNumber(response.data.numOfCartItems)
            return response})
        .catch((error)=>error)
    }

    function updateProductInCart(Id, count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`,
            {count: count},
            {headers:headers},
        ).then((response)=> response)
        .catch((error)=>error)
    }


  return (
    <cartContext.Provider value={{ addProductToCart, getProductToCart, deleteProductFromCart, updateProductInCart, cartNumber }}>
      {props.children}
    </cartContext.Provider>
  )
}

// crud system >> create/add (as add or create content), read/retreive, update, delete
// 1) home >> 40 products for example >> 2 (i liked 2) >> send/add to API >> request >> header(token) + body(id)
// message >> success 2) add >>> get 2 products from API to cart component
// 3) update using count or delete