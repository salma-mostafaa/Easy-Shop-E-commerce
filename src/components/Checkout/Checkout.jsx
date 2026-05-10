import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const { cartId } = useParams()
  const headers = {
    token: localStorage.getItem("userToken"),
  }
  function handleCheckout(formData) {
  console.log("check ", formData)
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
   {'shippingAddress' : formData},
    { headers : headers,
      params : {url: 'http://localhost:5173'}
     })
      .then((response) =>{console.log('checkout', response)
        location.href = response.data.session.url
          let oldOrders = JSON.parse(localStorage.getItem("orders")) || []

  let newOrder = {
    id: Date.now(),
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
    totalPrice: JSON.parse(localStorage.getItem("cartTotal")) || 0,
    shippingAddress: formData,
    isPaid: true,
  }

  oldOrders.push(newOrder)

  localStorage.setItem("orders", JSON.stringify(oldOrders))

  console.log("checkout", response)
      })
      .catch((error) => { console.log('error', error) })
    }
  
  let formik = useFormik({
  initialValues:{
    details:'',
    phone: '',
    city:'',
  },
  onSubmit: handleCheckout
})
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className={styles.card}>

              <h2 className={styles.title}>Checkout</h2>

              <form onSubmit={formik.handleSubmit}>

                <input
                  name="details"
                  placeholder="Address details"
                  className={styles.input}
                  value={formik.values.details}
                  onChange={formik.handleChange}
                />

                <input
                  name="phone"
                  placeholder="Phone number"
                  className={styles.input}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />

                <input
                  name="city"
                  placeholder="City"
                  className={styles.input}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />

                <button
                  type="submit"
                  className={styles.button}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Loading..." : "Pay Now"}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
