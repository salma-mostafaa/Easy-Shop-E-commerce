import React from 'react'
import found from '../../assets/images/error.png'
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css'

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div>
        
        <div>
          <img src={found} alt="not found" className={styles.image} />
        </div>

        <div>
          <p className={styles.message}>
            The page you are looking for was moved, removed or might never existed.
          </p>

          <button
            className={styles.btn}
            onClick={() => navigate('/')}
          >
            Back to homepage
          </button>
        </div>

      </div>
    </section>
  )
}
