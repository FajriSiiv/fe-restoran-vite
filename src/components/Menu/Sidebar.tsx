import { useEffect, useState } from "react";
import { useStore } from "../../lib/zustand/useStore";
import ButtonBasic from "../Button/ButtonBasic";
import { IoCart } from "react-icons/io5";
import Swal from "sweetalert2";
import useFormat from "../../hooks/useFormatRP";
import { createOrder } from "../../api/orders";

const Sidebar = () => {
  const { transactions, addTransaction, updateTransaction, removeTransaction } =
    useStore();

  const total = useFormat(
    transactions.reduce(
      (acc, currentValue) => acc + currentValue.price * currentValue.quantity,
      0
    )
  );
  const handleDeleteProductTransaction = (id) => {
    Swal.fire({
      title: "Ingin menghapus item ini?",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonColor: "#e64242",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Kamu behasil menghapus item ini!", "", "success");
        removeTransaction(id);
      }
    });
  };

  const handleSentTransaction = async () => {
    await createOrder({
      status: "belum diproses",
      products: transactions.map((prod) => ({
        id: prod.idProduct,
        quantity: prod.quantity,
      })),
    })
      .then(() => {
        Swal.fire({
          title: "Berhasil membuat pesanan",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col gap-y-2 px-5 py-3  sticky top-5">
      <div className="flex flex-col gap-y-2 p-2 h-[85vh] overflow-y-scroll">
        {transactions.map((transaction, index) => {
          const formatRP = (number) => {
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(number);
          };

          const totalPerProduct = transaction.quantity * transaction.price;

          return (
            <div
              className="w-full rounded-sm p-2 flex gap-y-2 flex-col border"
              key={index}
            >
              <div className="flex gap-x-2 justify-between items-start">
                <p className="text-base leading-tight">
                  {transaction.title.slice(0, 30)}
                </p>
                <p className="font-bold text-lg">{formatRP(totalPerProduct)}</p>
              </div>
              <div className="flex gap-x-2 justify-between items-center">
                <p>Quality : x{transaction.quantity}</p>

                <ButtonBasic
                  className="mt-1 py-1.5  hover:bg-rose-600"
                  bgColor="bg-rose-500"
                  text="Delete"
                  icon={<IoCart size={20} />}
                  onClick={() => handleDeleteProductTransaction(transaction.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[12vh] max-h-[200px]">
        <ButtonBasic
          onClick={handleSentTransaction}
          text={`Bayar ${total}`}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
