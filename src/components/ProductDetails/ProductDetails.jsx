import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useContext, useState } from 'react';
import axios from 'axios'
import styles from './ProductDetails.module.css'
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';


export default function ProductDetails() {
  let {addProductToCart}= useContext(cartContext);


  async function addProduct(productID){
    let response = await addProductToCart(productID)
    console.log(response)
    if(response.data.status == 'success'){
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }
  let {id} = useParams(); 
    console.log(id);

     const [details, setDetails] = useState(null) 

    function getProductDetails(){ 
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)  
    
    .then( ({data})=>{ 
      console.log(data)
      console.log(data.data); 
      setDetails(data.data); 
    } ) 
 
    .catch( ()=>{} ) 
 
  } 
 
  useEffect( ()=>{ 
    getProductDetails(); 
  } , []) 

  return (
    <div className={`container ${styles.container}`}>

    <div className={`row justify-content-center align-items-center g-4 ${styles['card']}`}>

      <div className='w-25 '> 
        <img src={details?.imageCover} alt={details?.title} className='w-100' /> 
      </div> 

      <div className="col-md-6">

        <span className={`badge mb-2 ${styles['category']}`}>
          {details?.category?.name}
        </span>

        <h3 className="fw-bold">
          {details?.title}
        </h3>

        <p className="text-muted">
          {details?.description}
        </p>

        <div className="d-flex justify-content-between my-3">

          <span className="fw-bold" >
            {details?.price} EGP
          </span>

          <span className="text-warning">
            {details?.ratingsQuantity}
            <i className="fas fa-star ms-1"></i>
          </span>

        </div>

        <button onClick={()=>{addProduct(details.id)}} className={` w-100 text-white ${styles['add-btn']}`}>
          Add To Cart
        </button>

      </div>

    </div>

  </div> 
  )
}
