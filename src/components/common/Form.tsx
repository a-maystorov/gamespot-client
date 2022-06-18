import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from './Input';

interface FormProps {
  initialValues: {};
  onSubmit: (values: {}) => void;
  validationSchema: {};
}

function Form({ initialValues, onSubmit, validationSchema }: FormProps) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data) => console.log('Submit: ', data)}
      validationSchema={validationSchema}>
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}></form>
      )}
    </Formik>
  );
}

export default Form;
