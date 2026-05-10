import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { Link } from 'react-router-dom'
import styles from '../Carts/Carts.module.css'

export default function Carts() {
  let [product, setProduct] = useState(null)
  let { getProductToCart, deleteProductFromCart, updateProductInCart } =
    useContext(cartContext)

  let [cartId, setCartId] = useState(null)

  async function getProduct() {
    let { data } = await getProductToCart()
    console.log(data?.data)
    setProduct(data?.data)
    setCartId(data?.data._id)
  }

  useEffect(() => {
    getProduct()
  if (product) {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(product.products)
    )

    localStorage.setItem(
      "cartTotal",
      JSON.stringify(product.totalCartPrice)
    )
  }
}, [product])

  async function removeProduct(id) {
    let response = await deleteProductFromCart(id)
    setProduct(response?.data?.data)
  }

  async function updateProduct(Id, count) {
    if (count < 1) return
    let response = await updateProductInCart(Id, count)
    setProduct(response?.data?.data)
  }

  return (
    <>
      <section className={`min-vh-100 ${styles.container}`} >
        {product?.products?.length > 0 ? (
          <div className="container py-5 ">
            <div className="row g-4 align-align-items-start">

              {/* left cart */}
              <div className="col-lg-8 mt-1">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h2 className="fw-bold mb-1" style={{ color: '#5b2a86' }}>
                      Shopping Cart
                    </h2>
                    <p className="text-muted mb-0">
                      Your selected products
                    </p>
                  </div>
                </div>

                {/* cart card */}
                <div
                  className="card border-0 rounded-5"
                  style={{
                    background: '#fff',
                    boxShadow: '0 8px 30px rgba(128, 90, 213, 0.12)'
                  }}
                >
                  {product?.products?.map((item) => {
                    return (
                      <div key={item._id} className="card-body p-4 border-bottom">

                        <div className="row align-items-center gy-4">

                          {/* Image */}
                          <div className="col-md-2 text-center">
                            <img
                              src={item?.product?.imageCover}
                              className="img-fluid rounded-4"
                              style={{ height: '120px', objectFit: 'cover' }}
                            />
                          </div>

                          {/* titlee */}
                          <div className="col-md-3">
                            <h5 className="fw-bold" style={{ color: '#5b2a86' }}>
                              {item?.product?.title}
                            </h5>

                            <p className="text-muted mb-0">
                              {item?.product?.category?.name}
                            </p>
                          </div>

                          {/* quantity */}
                          <div className="col-md-3">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-pill px-2 py-2"
                              style={{ background: '#f8f2ff' }}
                            >
                              <button
                                onClick={() =>
                                  updateProduct(item?.product?.id, item?.count - 1)
                                }
                                className="btn border-0"
                                style={{ color: '#7b2cbf' }}
                              >
                                -
                              </button>

                              <input
                                value={item?.count}
                                readOnly
                                className="form-control text-center border-0 mx-2"
                                style={{
                                  width: '70px',
                                  background: 'transparent',
                                  color: '#5b2a86'
                                }}
                              />

                              <button
                                onClick={() =>
                                  updateProduct(item?.product?.id, item?.count + 1)
                                }
                                className="btn border-0"
                                style={{ color: '#7b2cbf' }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* prices */}
                          <div className="col-md-2 text-center">
                            <h5 style={{ color: '#d63384' }}>
                              {item?.price} EGP
                            </h5>
                          </div>

                          {/* Delete */}
                          <div className="col-md-1 text-end">
                            <button
                              onClick={() => removeProduct(item?.product?.id)}
                              className="btn border-0"
                              style={{
                                background: '#fff0f5',
                                color: '#d63384',
                                borderRadius: '50%',
                                width: '45px',
                                height: '45px'
                              }}
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </div>

                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* right cart */}
              <div className="col-lg-4 mt-5">
                <div
                  className="card border-0 rounded-5 p-3 w-100 mt-5"
                  style={{
                    background: '#fff',
                    boxShadow: '0 8px 30px rgba(128, 90, 213, 0.12)',

                  }}
                >
                  <div className="card-body">

                    <h5 className="fw-bold mb-4" style={{ color: '#5b2a86' }}>
                      Summary
                    </h5>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Subtotal</span>
                      <span style={{ color: '#5b2a86' }}>
                        {product?.totalCartPrice || 0} EGP
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Shipping</span>
                      <span style={{ color: '#5b2a86' }}>Free</span>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between mb-4">
                      <strong style={{ color: '#5b2a86' }}>Total</strong>
                      <strong style={{ color: '#d63384' }}>
                        {product?.totalCartPrice || 0} EGP
                      </strong>
                    </div>

                    
                      <Link to ={`/checkout/${cartId}`} >
                      <button
                      className="btn w-100 py-2 rounded-4 fw-semibold"
                      style={{
                        background:
                          'linear-gradient(135deg, #d63384, #7b2cbf)',
                        border: 'none',
                        color: 'white'
                      }}
                    >
                      Checkout
                      
                    </button>
                    </Link>

                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <h2 className="text-center text-danger my-5">
            There is no data
          </h2>
        )}
      </section>
    </>
  )
}