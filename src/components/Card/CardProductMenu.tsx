import { useState } from "react";
import { useStore } from "../../lib/zustand/useStore";
import ButtonBasic from "../Button/ButtonBasic";
import { IoCart } from "react-icons/io5";
import { TiMinus, TiPlus } from "react-icons/ti";

const CardProductMenu = ({ product, setProducts }: any) => {
  const { transactions, addTransaction, updateTransaction } = useStore();

  const incrementQuantity = (id: number | string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id: number | string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(product.quantity - 1, 1) }
          : product
      )
    );
  };

  const handleAddTransaction = (product) => {
    const checkingTransaction = transactions.find(
      (trx) => trx.idProduct === product.id
    );

    if (checkingTransaction) {
      updateTransaction(checkingTransaction.id, {
        quantity: checkingTransaction.quantity + product.quantity,
      });
    } else {
      const newTrasaction: any = {
        price: product.price,
        id: transactions.length + 1,
        title: product.title,
        quantity: product.quantity,
        idProduct: product.id,
      };

      addTransaction(newTrasaction);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-slate-800 p-2 rounded-md text-white">
      <div className="flex flex-col">
        <div className="relative w-full h-40 bg-white rounded-md"></div>
        <div className="  items-start mt-2 flex flex-col gap-y-2">
          <p className="whitespace-wrap">{product.title.slice(0, 30)}</p>
          <p className="font-bold text-xl">${product.price}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mt-2">
          <ButtonBasic
            onClick={() => decreaseQuantity(product.id)}
            icon={<TiMinus size={20} />}
            className="bg-amber-600 hover:bg-amber-700"
          />
          <span className="font-semibold text-xl">{product.quantity}</span>

          <ButtonBasic
            onClick={() => incrementQuantity(product.id)}
            icon={<TiPlus size={20} />}
            className="bg-amber-600 hover:bg-amber-700"
          />
        </div>

        <ButtonBasic
          className="mt-2"
          text="Buy"
          onClick={() => handleAddTransaction(product)}
          icon={<IoCart size={20} />}
        />
      </div>
    </div>
  );
};

export default CardProductMenu;
