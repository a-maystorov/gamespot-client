import { Formik } from 'formik';
import React, { useState } from 'react';
import Input from './common/Input';

function LoginForm() {
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // Async call
          console.log('Login data: ', data);
          setSubmitting(false);
        }}>
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              name="username"
              type="text"
              onChange={handleChange}
              value={values.username}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
            />

            <button
              type="submit"
              className="btn btn-primary rounded-pill my-3"
              disabled={isSubmitting}>
              Login
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
