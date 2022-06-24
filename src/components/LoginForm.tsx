import { Form, Formik } from 'formik';
import Input from './common/Input';
import * as Yup from 'yup';
import AuthService from '../services/AuthService';

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
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          await AuthService.login(data.email, data.password);
          console.log('Login data: ', data);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}>
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
