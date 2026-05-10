import React, { useEffect, useState } from 'react'
import styles from './allorders.module.css'

export default function AllOrders() {

  const [orders, setOrders] = useState([])

  function clearOrders() {
  localStorage.removeItem("orders")
  setOrders([])
}

  useEffect(() => {
    let savedOrders =
      JSON.parse(localStorage.getItem("orders")) || []

    setOrders(savedOrders)
  }, [])

  return (
    <section className={styles.section}>
      <div className="container">

        <h2 className={styles.title}>
          All Orders
        </h2>
        <button
        onClick={clearOrders}
        className={styles.clearBtn}
        >
          Clear Orders
          </button>
        <div className="row g-4">

          {orders.map((order) => (
            <div className="col-md-4 col-sm-6" key={order.id}>

              <div className={styles.orderCard}>

                <h5 className={styles.orderId}>
                  Order #{order.id}
                </h5>

                <p>
                  <span className={styles.label}>City: </span>
                  {order.shippingAddress.city}
                </p>

                <p>
                  <span className={styles.label}>Phone: </span>
                  {order.shippingAddress.phone}
                </p>

                <p>
                  <span className={styles.label}>Status: </span>
                  Paid
                </p>

                <h5 className={styles.totalPrice}>
                  {order.totalPrice} EGP
                </h5>

                <hr />

                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex align-items-center gap-2 mb-3"
                  >

                    <img
                      src={item.product.imageCover}
                      width="60"
                      className={styles.itemImg}
                    />

                    <div>
                      <h6 className="mb-1">
                        {item.product.title}
                      </h6>

                      <small className="text-muted">
                        Qty: {item.count}
                      </small>
                    </div>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
