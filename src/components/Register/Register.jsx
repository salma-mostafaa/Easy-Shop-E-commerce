import React, { useContext, useState } from 'react'
import styles from "./Register.module.css";
import { useFormik } from 'formik'
import axios from "axios"
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';

export default function Register() {
  let [apiError, setError] = useState('');
  let { setLogin } = useContext(userContext)
  let [isLoading, setLoading] = useState(false);
  let navigate = useNavigate()

  async function handleRegister(formsData) {
    setLoading(true);

    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formsData)
      .then((response) => {
        console.log('success', response);
        setLoading(false);

        if (response.data.message === 'success') {
          localStorage.setItem('userToken', response.data.token);
          setLogin(response.data.token)
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log('error', error.response.data.message);
        setLoading(false);
        setError(error.response.data.message)
      })
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(3, 'min length is 3').max(10, 'max length is 10'),
    email: Yup.string().required('email is required').email('enter valid email'),
    phone: Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/, 'phone is not valid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'password is not valid'),
    rePassword: Yup.string().required('confirm password is required').oneOf([Yup.ref('password')], 'passwords must match'),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handleRegister
  })

  return (
    <section className={styles.container}>

      <div className={styles.left}>

        <div className={styles.formWrapper}>

          <h2 className={styles.title}>Create your account</h2>
          <p className={styles.subtitle}>Start your journey with us</p>

          {apiError && (
            <div className={styles.error}>
              {apiError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={styles.input}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className={styles.error}>{formik.errors.name}</div>
            )}

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}

            {/* RE-PASSWORD */}
            <input
              type="password"
              name="rePassword"
              placeholder="Confirm Password"
              className={styles.input}
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <div className={styles.error}>{formik.errors.rePassword}</div>
            )}

            {/* PHONE */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className={styles.input}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className={styles.error}>{formik.errors.phone}</div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className={styles.button}
              disabled={!(formik.isValid && formik.dirty)}
            >
              {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Register'}
            </button>

            <p className={styles.switch}>
              Have an account?{" "}
              <span onClick={() => navigate('/login')}>
                Login
              </span>
            </p>

          </form>

        </div>
      </div>

      <div className={styles.right}></div>

    </section>
  )
}