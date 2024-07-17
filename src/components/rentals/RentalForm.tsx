import { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { AxiosError } from "axios";

import Game from "../../models/Game";
import Customer from "../../models/Customer";

import GameService from "../../services/GameService";
import CustomerService from "../../services/CustomerService";
import RentalService from "../../services/RentalService";

import Select from "../common/Select";

function RentalForm() {
  const [games, setGames] = useState<Game[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState("");

  const loadGames = useCallback(async () => {
    const gamesFromDb = await GameService.getGames();
    setGames(gamesFromDb);
  }, []);

  const loadCustomers = useCallback(async () => {
    const customersFromDb = await CustomerService.getCustomers();
    setCustomers(customersFromDb);
  }, []);

  useEffect(() => {
    loadCustomers();
    loadGames();
  }, [loadCustomers, loadGames]);

  const validationSchema = Yup.object({
    gameId: Yup.string().required(),
    customerId: Yup.string().required(),
  });

  return (
    <div>
      <Formik
        initialValues={{
          customerId: "",
          gameId: "",
        }}
        onSubmit={async (data, { setSubmitting }) => {
          const { customerId, gameId } = data;
          setSubmitting(true);

          try {
            await RentalService.addRental(gameId, customerId);
            window.location.href = "/rentals";
            setSubmitting(false);
          } catch (err) {
            if (err instanceof AxiosError) setError(err.response?.data);
            setSubmitting(false);
            console.error(err);
          }
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <div className="form-container">
              <h1>Rental Form</h1>

              <Select
                label="Customer"
                name="customerId"
                onChange={handleChange}
                options={customers}
                value={values.customerId}
              />

              <Select
                label="Game"
                name="gameId"
                onChange={handleChange}
                options={games}
                value={values.gameId}
              />

              {error && <div className="form-control alert-danger rounded-pill mt-3">{error}</div>}

              <div className="submit-btn--container">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill mt-3 submit-btn"
                  disabled={isSubmitting}
                >
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

export default RentalForm;
