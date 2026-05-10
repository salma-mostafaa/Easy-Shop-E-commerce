import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import styles from '../Brands/Brands.module.css';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setLoading] = useState(true);

  function getBrands() {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      .then((response) => {
        // Printing data to see structure
        console.log("Data Response:", response.data);
        setBrands(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Fetch Error:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className={`container ${styles.container}`}>
      {/* Use ['brands-title'] because of the hyphen in CSS */}
      <h2 className={`text-center mb-4 ${styles['brands-title']}`}>
        All Brands
      </h2>

      {!isLoading ? (
        <div className="row g-4">
          {brands.map((brand) => (
            <div className="col-md-3" key={brand._id}>
              {/* Use ['brand-card'] because of the hyphen in CSS */}
              <div className={`card h-100 shadow-sm ${styles['brand-card']}`}>
                
                <div className={styles['image-wrapper']}>
                  <img
                    src={brand.image}
                    className="w-100"
                    alt={brand.name}
                    style={{ height: '150px', objectFit: 'contain' }}
                  />
                </div>

                <div className="card-body border-top bg-light">
                  <p className="text-center fw-semibold mb-0">{brand.name}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}