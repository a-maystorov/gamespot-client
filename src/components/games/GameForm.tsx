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
  const [error, setError] = useState('');

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
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: game ? game.title : '',
          genreId: game ? game.genre?._id : '',
          numberInStock: game ? game.numberInStock : '',
          dailyRentalRate: game ? game.dailyRentalRate : '',
        }}
        onSubmit={async (data, { setSubmitting }) => {
          const { dailyRentalRate, genreId, numberInStock, title } = data;
          setSubmitting(true);

          try {
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

            window.location.href = '/';

            setSubmitting(false);
          } catch (err) {
            if (err instanceof AxiosError) setError(err.response?.data);
            setSubmitting(false);
            console.error(err);
          }
        }}
        validationSchema={validationSchema}
        validateOnChange={false}>
        {({ values, handleChange, isSubmitting, errors }) => (
          <Form>
            <div className="form-container">
              <h1>Game Form</h1>

              <Input
                label="Title"
                name="title"
                type="text"
                onChange={handleChange}
                value={values.title}
                errors={errors.title}
              />

              <Select
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

              {error && (
                <div className="form-control alert-danger rounded-pill mt-3">
                  {error}
                </div>
              )}

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

export default GameForm;
