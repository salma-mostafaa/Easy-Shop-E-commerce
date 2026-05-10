import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";
import styles from './Login.module.css'

export default function Login() {
  let navigate = useNavigate();
  let { setLogin } = useContext(userContext);

  let [apiError, setError] = useState("");
  let [isLoading, setLoading] = useState(false);

  async function handleLogin(formsData) {
    console.log('Login', formsData);
    setLoading(true);

    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formsData)
      .then((response) => {
        console.log('response', response.data);
        setLoading(false);

        if (response.data.message === "success") {
          localStorage.setItem("userToken", response.data.token);
          setLogin(response.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log('error', error.response.data.message);
        setLoading(false);
        setError(error.response.data.message);
      });
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string().required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <section className={styles.container}>

      <div className={styles.left}>

        <div className={styles.formWrapper}>

          <h2 className={styles.title}>Welcome back</h2>
          <p className={styles.subtitle}>Log in to continue</p>

          {apiError && (
            <div className={styles.error}>
              {apiError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>

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
              <div className={styles.error}>
                {formik.errors.email}
              </div>
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
              <div className={styles.error}>
                {formik.errors.password}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className={styles.button}
              disabled={!(formik.isValid && formik.dirty)}
            >
              {isLoading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </button>

            <p className={styles.switch}>
              Don't have an account?{" "}
              <span onClick={() => navigate('/register')}>
                Create one
              </span>
            </p>

          </form>

        </div>
      </div>

      <div className={styles.right}></div>

    </section>
  );
}