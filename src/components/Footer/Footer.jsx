import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./Footer.module.css"
import { userContext } from '../../context/userContext'

export default function Footer() {
  const { isLogin, setLogin } = useContext(userContext)

  return (
    <footer className={`mt-0 ${styles.footer}`}>

      <div className="container text-center py-4">

        <div className="mb-3">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>

          {isLogin && (
            <>
              <NavLink
                to="products"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Products
              </NavLink>

              <NavLink
                to="/carts"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Cart
              </NavLink>
            </>
          )}

        </div>

        <div className="mb-3">
          <NavLink to="#" className={styles.icon}>
            <i className="fab fa-facebook-f"></i>
          </NavLink>
          <NavLink to="#" className={styles.icon}>
            <i className="fab fa-instagram"></i>
          </NavLink>
          <NavLink to="#" className={styles.icon}>
            <i className="fab fa-twitter"></i>
          </NavLink>
          <NavLink to="#" className={styles.icon}>
            <i className="fab fa-github"></i>
          </NavLink>
        </div>

        <p className={styles.copy}>
          © 2026 EasyShop. All rights reserved.
        </p>

      </div>

    </footer>
  )
}