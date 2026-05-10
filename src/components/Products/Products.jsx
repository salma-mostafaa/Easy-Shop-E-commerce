import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import styles from './Products.module.css'
import { cartContext } from '../../context/cartContext'
import toast from 'react-hot-toast'
import CategorySlider from '../CategorySlider/CategorySlider'


export default function Products() {

  let {addProductToCart}= useContext(cartContext);
  // this function return content in cartContext

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

  let [isLoading, setLoading] = useState(true)
  let [products, setProducts] = useState([])

  async function getProducts() {
    await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        console.log(data)
        setProducts(data.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
    <CategorySlider/>
    <div className="container mt-5 mb-4">
      

      {!isLoading ? (
        <div className="row g-4 ">

          {products.map((productInfo) => {
            return (
              <div className="col-md-3" key={productInfo._id}>

                <div className={`card h-100 border-0 shadow-sm ${styles['product-card']}`}>

                  <Link
                    to={`productDetails/${productInfo.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >

                    <div className="position-relative overflow-hidden">
                      <img
                        src={productInfo.imageCover}
                        className={`card-img-top p-3 ${styles['product-img']}`}
                        alt={productInfo.title}
                      />
                    </div>

                    <div className="card-body">

                      <span className="text-info small text-uppercase mb-1">
                        {productInfo.category.name}
                      </span>

                      <h6 className="fw-semibold mb-2">
                        {productInfo.title.split(' ').slice(0, 3).join(' ')}
                      </h6>

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold">{productInfo.price} EGP</span>

                        <span className="text-muted small">
                          {productInfo.ratingsQuantity}
                          <i className="fas fa-star text-warning ms-1"></i>
                        </span>
                      </div>

                    </div>

                  </Link>

                  {/* Button OUTSIDE link */}
                  <div className="p-3 pt-0">
                    <button onClick={()=>{addProduct(productInfo.id)}} className={`btn w-100 text-white ${styles['add-btn']}`}>
                      Add To Cart
                    </button>
                  </div>

                </div>

              </div>
            )
          })}

        </div>
      ) : (
        <Loader />
      )}

    </div>
    </>
  )
}