// import { TransactionProps } from "@/interfaces";
import { create } from "zustand";

interface TransactionProps {
  quantity: number;
  price: number;
}

interface Store {
  transactions: TransactionProps[];
  addTransaction: (transaction: TransactionProps) => void;
  updateTransaction: (
    id: string,
    updatedTransaction: Partial<TransactionProps>
  ) => void;
  removeTransaction: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useStore = create<Store>((set) => ({
  transactions: [],

  addTransaction: (transaction: any) =>
    set((state: any) => ({
      transactions: [...state.transactions, transaction],
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, quantity } : transaction
      ),
    })),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id
      ),
    })),

  updateTransaction: (id, updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      ),
    })),
}));
