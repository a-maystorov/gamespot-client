import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AxiosError } from 'axios';

import Customer from '../../models/Customer';

import CustomerService from '../../services/CustomerService';

import Input from '../common/Input';

function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer>();

  const loadCurrentCustomer = useCallback(async () => {
    if (id === 'new') return;

    try {
      const customer = await CustomerService.getCustomer(id!);
      setCustomer(customer);
    } catch (err) {
      if (err instanceof AxiosError) {
        err.response && err.response.status === 404
          ? navigate('/not-found')
          : console.error(err.response?.data);
      }

      console.error(err);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadCurrentCustomer();
  }, [loadCurrentCustomer]);

  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(20).required(),
    phone: Yup.string().min(6).max(20).required(),
    isGold: Yup.boolean(),
  });

  return (
    <div>
      <h1>Customer Form {id}</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: customer ? customer.name : '',
          phone: customer ? customer.phone : '',
        }}
        onSubmit={async (data, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          try {
            const { name, phone } = data;

            if (id === 'new')
              await CustomerService.addCustomer({
                name,
                phone,
              });
            else
              customer &&
                (await CustomerService.updateCustomer({ name, phone }, id!));

            setSubmitting(false);

            window.location.href = '/customers';
          } catch (err) {
            if (err instanceof AxiosError)
              setFieldError('phone', err.response?.data);
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
        validateOnChange={false}>
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
              label="Phone Number"
              name="phone"
              type="text"
              onChange={handleChange}
              value={values.phone}
              errors={errors.phone}
            />

            <button
              type="submit"
              className="btn btn-primary rounded-pill mt-3"
              disabled={isSubmitting}>
              Save
            </button>

            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CustomerForm;
