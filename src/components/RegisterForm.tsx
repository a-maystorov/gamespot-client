import { Form, Formik } from 'formik';
import Input from './common/Input';
import * as Yup from 'yup';

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
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // Async call
          console.log('Register data: ', data);
          setSubmitting(false);
        }}
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
