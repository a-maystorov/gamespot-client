import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AxiosError } from 'axios';

import Genre from '../../models/Genre';

import GenreService from '../../services/GenreService';

import Input from '../common/Input';

function GenreForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState<Genre>();

  const loadCurrentGenre = useCallback(async () => {
    if (id === 'new') return;

    try {
      const genre = await GenreService.getGenre(id!);
      setGenre(genre);
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
    loadCurrentGenre();
  }, [loadCurrentGenre]);

  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(50).required(),
  });

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: genre ? genre.name : '',
        }}
        onSubmit={async (data, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          try {
            const { name } = data;

            if (id === 'new')
              await GenreService.addGenre({
                name,
              });
            else genre && (await GenreService.updateGenre({ name }, id!));

            window.location.href = '/genres';

            setSubmitting(false);
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
            <div className="form-container">
              <h1>Genre Form </h1>

              <Input
                label="Name"
                name="name"
                type="text"
                onChange={handleChange}
                value={values.name}
                errors={errors.name}
              />

              <div className="submit-btn--container">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill mt-3 submit-btn"
                  disabled={isSubmitting}>
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default GenreForm;
