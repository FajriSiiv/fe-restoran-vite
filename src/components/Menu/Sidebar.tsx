import { useStore } from "../../lib/zustand/useStore";
import ButtonBasic from "../Button/ButtonBasic";
import { IoCart } from "react-icons/io5";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { transactions, addTransaction, updateTransaction, removeTransaction } =
    useStore();

  const total = transactions
    .reduce(
      (acc, currentValue) => acc + currentValue.price * currentValue.quantity,
      0
    )
    .toFixed(2);

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

  return (
    <div className="flex flex-col gap-y-2 px-5 py-3  sticky top-5">
      <div className="flex flex-col gap-y-2 p-2 h-[85vh] overflow-y-scroll">
        {transactions.map((transaction, index) => {
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
                <p className="font-bold text-xl">${totalPerProduct}</p>
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
          // onClick={() => decreaseQuantity(product.id)}
          text={`Bayar $${total}`}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
