import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className={styles.home}>

      <div className={styles.hero}>

        <h1>Discover the best products for you</h1>

        <p>
          Explore high-quality products, trusted brands, and a smooth shopping experience.
        </p>

        <button onClick={() => navigate('/products')}>
          Shop Now
        </button>

      </div>

    </div>
  )
}