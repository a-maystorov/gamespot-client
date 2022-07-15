import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import UserService from '../services/UserService';

import Input from './common/Input';

const validationSchema = Yup.object({
  name: Yup.string().min(3).max(50).required(),
  email: Yup.string().min(5).max(255).required().email(),
  password: Yup.string().min(5).max(255).required(),
});

function RegisterForm() {
  return (
    <div>
      <h1>Register</h1>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        onSubmit={async (data, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          try {
            await UserService.register({
              name: data.name,
              email: data.email,
              password: data.password,
            });
            window.location.href = '/';
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            if (err instanceof AxiosError)
              setFieldError('email', err.response?.data);
            setSubmitting(false);
          }
        }}
        validateOnChange={false}
        validationSchema={validationSchema}>
        {({ values, handleChange, isSubmitting, errors }) => (
          <Form>
            <Input
              label="Name"
              name="name"
              type="text"
              onChange={handleChange}
              value={values.name}
              errors={errors.name}
            />

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
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
