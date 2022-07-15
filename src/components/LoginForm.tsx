import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AxiosError } from 'axios';

import AuthService from '../services/AuthService';

import Input from './common/Input';

const validationSchema = Yup.object({
  email: Yup.string().min(5).max(255).required().email(),
  password: Yup.string().min(5).max(255).required(),
});

function LoginForm() {
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (data, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          try {
            await AuthService.login(data.email, data.password);
            window.location.href = '/';
            setSubmitting(false);
          } catch (err) {
            if (err instanceof AxiosError)
              setFieldError('email', err.response?.data);
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
        validateOnChange={false}>
        {({ values, handleChange, isSubmitting, errors }) => (
          <Form>
            <Input
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              errors={errors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              errors={errors.password}
            />

            <button
              type="submit"
              className="btn btn-primary rounded-pill my-3"
              disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
