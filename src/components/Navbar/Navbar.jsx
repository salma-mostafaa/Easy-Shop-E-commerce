import React, { useContext } from 'react'
import found from '../../assets/images/logo.png'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import styles from './Navbar.module.css'
import { cartContext } from '../../context/cartContext'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLogin, setLogin} = useContext(userContext)
  let {cartNumber}= useContext(cartContext)

  function logout() {
    localStorage.removeItem('userToken')
    setLogin(null)
    navigate('/')
  }
   const isHomePage = location.pathname === '/'

  return (
    <nav className={`navbar navbar-expand-lg  shadow-sm sticky-top py-2  ${isHomePage ? 'bg-transparent'  : 'bg-white'}  `}
    style={{position: "absolute", top: "0", opacity: "1", width: "100% ", backgroundColor:"transparent"}} >
      <div className="container">

        <NavLink to="/" className="navbar-brand">
          <img src={found} alt="logo" className={styles.logo} />
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isHomePage ? 'bg-dark'  : 'bg-white'}`}  id="mainNav" >

          {isLogin &&  (
            <ul className="navbar-nav me-auto gap-1" >
              <li className="nav-item"><NavLink to="/"  className={`nav-link ${isHomePage ? 'text-white'  : 'text-dark'}`}>Home</NavLink></li>
              <li className="nav-item"><NavLink to="/products"  className={`nav-link ${isHomePage ? 'text-white' : 'text-dark'}`}>Products</NavLink></li>
              <li className="nav-item"><NavLink to="/brands"  className={`nav-link ${isHomePage ? 'text-white' : 'text-dark'}`}>Brands</NavLink></li>
              <li className="nav-item position-relative">
                <NavLink to="/carts"  className={`nav-link ${isHomePage ? 'text-white' : 'text-dark'}`}>
                  Cart
                  <span className="badge bg-warning text-dark ms-1 rounded-circle">{cartNumber}</span>
                </NavLink>
              </li>
              <li className="nav-item"><NavLink to="/allorders"  className={`nav-link ${isHomePage ? 'text-white' : 'text-dark'}`}>Orders</NavLink></li>
            </ul>
          )}

          <ul className="navbar-nav ms-auto gap-1">
            {!isLogin ? (
              <>
                <li className="nav-item"><NavLink to="/register" className={`nav-link ${styles.logout} me-3 px-3`}>Register</NavLink></li>
                <li className="nav-item"><NavLink to="/login" className={`nav-link ${styles.logout} px-3`}>Login</NavLink></li>
              </>
            ) : (
              <li className="nav-item">
                <button onClick={logout} className={styles.logout}>Logout</button>
              </li>
            )}
          </ul>

        </div>
      </div>
    </nav>
  )
}
