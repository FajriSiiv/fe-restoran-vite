import { useMemo } from "react";

const useFormat = (number: number) => {
  return useMemo(() => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }, [number]);
};

export default useFormat;
