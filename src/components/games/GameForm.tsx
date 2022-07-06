import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { AxiosError } from 'axios';

import GameService from '../../services/GameService';

import Input from '../common/Input';
import Select from '../common/Select';

import Genre from '../../models/Genre';
import Game from '../../models/Game';

interface GameFormProps {
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
  const navigate = useNavigate();
  const [game, setGame] = useState<Game>();

  const loadCurrentGame = useCallback(async () => {
    if (id === 'new') return;

    try {
      const game = await GameService.getGame(id!);
      setGame(game);
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
    loadCurrentGame();
  }, [loadCurrentGame]);

  return (
    <div>
      <h1>Game Form {id}</h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: game ? game.title : '',
          genreId: game ? game.genre?._id : '',
          numberInStock: game ? game.numberInStock : '',
          dailyRentalRate: game ? game.dailyRentalRate : '',
        }}
        onSubmit={async (data, { setSubmitting, setFieldError }) => {
          setSubmitting(true);
          try {
            const { dailyRentalRate, genreId, numberInStock, title } = data;

            if (id === 'new')
              await GameService.addGame({
                title,
                genreId,
                numberInStock,
                dailyRentalRate,
              });
            else
              game &&
                (await GameService.updateGame(
                  {
                    title,
                    genreId,
                    numberInStock,
                    dailyRentalRate,
                  },
                  id!
                ));

            setSubmitting(false);

            window.location.href = '/';
          } catch (err) {
            if (err instanceof AxiosError)
              setFieldError('dailyRentalRate', err.response?.data);
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
              placeholder={game && game.genre?.name}
              name="genreId"
              onChange={handleChange}
              options={genres}
              value={values.genreId || game?.genre?._id}
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

            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default GameForm;
