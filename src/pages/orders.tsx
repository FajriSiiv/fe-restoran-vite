import React from "react";
import ButtonBasic from "../components/Button/ButtonBasic";
import { orders } from "../dummyData";

const Orders = () => {
  const handleConfirmOrders = () => {};

  const filterOrders = orders.filter(
    (order) => order.status === "belum diproses"
  );

  const handleOrderStatus = (id) => {};

  return (
    <div className="w-full h-screen p-5">
      <h1 className="font-semibold text-5xl text-center uppercase mb-5">
        Orders
      </h1>
      <div className="grid grid-cols-5 gap-5 mt-2">
        {filterOrders.map((order) => (
          <div className="bg-rose-100 min-h-32 p-2 rounded-sm flex flex-col justify-between ">
            <div className="w-full p-1 rounded-sm flex flex-col">
              <div>
                <p className="font-semibold text-lg text-center">
                  Order #{order.id}
                </p>
              </div>
              <div className="flex flex-col divide-y divide-black divide-dashed hover:divide-solid gap-y-2 my-2">
                {order.produk.slice(0, 3).map((order, index) => (
                  <div key={index} className="flex justify-between">
                    <p className="text-opacity-90">{order.product.name}</p>
                    <p>x{order.quantity}</p>
                  </div>
                ))}
                {order.produk.length > 3 && (
                  <ButtonBasic
                    className="!p-0 !bg-transparent text-black"
                    text={`${order.produk.length - 3} more products`}
                    onClick={() => console.log("check detail")}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="pt-5 capitalize">Status : {order.status}</p>
              <ButtonBasic
                text="Selesaikan Orderan"
                className="w-full"
                onClick={() => handleOrderStatus(order.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
