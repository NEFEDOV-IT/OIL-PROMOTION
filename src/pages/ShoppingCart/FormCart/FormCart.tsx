import { Button, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import * as React from "react";
import { ICard } from "../../../types/store.initialState";
import { useNavigate } from "react-router-dom";
import { removeCart } from "../../../store/cart/cart.slice";
import { removeShopSize } from "../../../store/shop/shop.slice";
import { getCards, getCart } from "../../../utils/selectors";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

interface Values {
  email: string;
  phone: string;
  name: string;
  cart: [];
}

export function FormCart() {
  const cart = useAppSelector(getCart);
  const cards = useAppSelector(getCards);
  const newCart = cards.filter((item: ICard) => cart.includes(item.id));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeFullCart: () => void = () => {
    dispatch(removeCart());
    dispatch(removeShopSize());
    navigate("/thanks");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        phone: "",
        name: "",
        cart: newCart,
      }}
      validate={(values) => {
        const errors: Partial<Values> = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.phone) {
          errors.phone = "Enter the phone number without symbols or spaces.";
        } else if (
          !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(
            values.phone
          )
        ) {
          errors.phone = "Invalid phone number";
        }
        if (!values.name) {
          errors.name = "Enter your name";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("phone", values.phone);
        formData.append("email", values.email);
        newCart.map((item: ICard, index: number) => {
          return formData.append(
            "cart" + index,
            `ID${item.id}. ${item.name} заказано ${item.size} штук по цене ${item.price}${item.currency}`
          );
        });

        const fetchArgs: any = {
          method: "POST",
          body: formData,
        };
        setTimeout(() => {
          setSubmitting(false);
          fetch("sendmail.php", fetchArgs)
            .then((response) => response.json())
            .then(() => {
              removeFullCart();
              navigate("/thanks");
            });
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            sx={{ width: 300 }}
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />
          <br />
          <br />
          <Field
            sx={{ width: 300 }}
            component={TextField}
            type="tel"
            label="Phone"
            name="phone"
          />
          <br />
          <br />
          <Field
            sx={{ width: 300 }}
            component={TextField}
            type="name"
            label="Name"
            name="name"
          />
          <br />
          <br />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
          <br />
          <br />
        </Form>
      )}
    </Formik>
  );
}
