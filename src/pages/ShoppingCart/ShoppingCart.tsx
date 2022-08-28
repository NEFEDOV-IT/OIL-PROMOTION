import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ICard } from "../../types/store.initialState";
import CartCard from "./CartCard";
import "./ShoppingCart.scss";
import TotalCart from "./TotalCart/TotalCart";
import RemoveCart from "./RemoveCart";
import { ICards, ICart } from "../../types/states.useSelector";
import { FormCart } from "./FormCart/FormCart";
import CartTextNull from "./CartTextNull";

const ShoppingCart: FC = () => {
  const cart = useSelector((state: ICart) => state.cart.cart);
  const cards = useSelector((state: ICards) => state.shop.data);
  const basket = cards.filter((item: ICard) => cart.includes(item.id));

  return (
    <div className={"main"}>
      <div className="container">
        <div className={"basket shop"}>
          <h1 className="basket__title root__title">SHOPPING CART</h1>
          <div className="basket__body">
            {basket?.length > 0 && <RemoveCart />}
            <div className="basket__cards">
              {basket?.length > 0 ? (
                basket.map((item: ICard) => {
                  return <CartCard {...item} key={item.id} />;
                })
              ) : (
                <CartTextNull />
              )}
            </div>
            <TotalCart />
            {basket?.length > 0 && <FormCart />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
