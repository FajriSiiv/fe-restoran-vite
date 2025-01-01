import { useLocation } from "react-router";

const API_URL = "https://dummyjson.com";

export const getProducts = async (category?: string, page?) => {
  const skipPaging = page > 1 ? (page - 1) * 10 : 0;

  try {
    if (category && category !== "" && category !== null) {
      const categoryPage = page > 1 ? 0 : page;

      const response = await fetch(
        `${API_URL}/products/category/${category}?limit=10&skip=${
          categoryPage * 10
        }`
      );

      const data = await response.json();
      const totalProducts = data.products.length;
      if (totalProducts < 10) {
        const response = await fetch(
          `${API_URL}/products/category/${category}?limit=10`
        );

        const data = await response.json();
        console.log(data, "dari yang ada category");
        return data.products;
      }
      console.log(data, "dari yang ada category");
    }

    const response = await fetch(
      `${API_URL}/products?limit=10&skip=${skipPaging}`
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
