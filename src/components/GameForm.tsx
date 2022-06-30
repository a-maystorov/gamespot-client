import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { AxiosError } from 'axios';

import GameService from '../services/GameService';

import Input from './common/Input';
import Select from './common/Select';

import Game from '../models/Game';
import Genre from '../models/Genre';

interface GameFormProps {
  games: Game[];
  genres: Genre[];
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  genreId: Yup.string().required(),
  numberInStock: Yup.number()
    .required()
    .min(0)
    .max(100)
    .label('Number in Stock'),
  dailyRentalRate: Yup.number()
    .required()
    .min(0)
    .max(10)
    .label('Daily Rental Rate'),
});

function GameForm({ genres }: GameFormProps) {
  const { id } = useParams();

  return (
    <div>
      <h1>Game Form {id}</h1>
      <Formik
        initialValues={{
          title: '',
          genreId: '',
          numberInStock: '',
          dailyRentalRate: '',
        }}
        onSubmit={async (data, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          try {
            const { dailyRentalRate, genreId, numberInStock, title } = data;
            await GameService.addGame({
              title,
              genreId,
              numberInStock,
              dailyRentalRate,
            });
            setSubmitting(false);
            window.location.href = '/';
          } catch (err) {
            if (err instanceof AxiosError)
              setFieldError('title', err.response?.data);
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
        validateOnChange={false}>
        {({ values, handleChange, isSubmitting, errors }) => (
          <Form>
            <Input
              label="Title"
              name="title"
              type="text"
              onChange={handleChange}
              value={values.title}
              errors={errors.title}
            />

            <Select
              errors={values.genreId}
              label="Genre"
              name="genreId"
              onChange={handleChange}
              options={genres}
              value={values.genreId}
            />

            <Input
              label="Stock"
              name="numberInStock"
              type="number"
              onChange={handleChange}
              value={values.numberInStock}
              errors={errors.numberInStock}
            />

            <Input
              label="Rate"
              name="dailyRentalRate"
              type="number"
              onChange={handleChange}
              value={values.dailyRentalRate}
              errors={errors.dailyRentalRate}
            />

            <button
              type="submit"
              className="btn btn-primary rounded-pill mt-3"
              disabled={isSubmitting}>
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default GameForm;
