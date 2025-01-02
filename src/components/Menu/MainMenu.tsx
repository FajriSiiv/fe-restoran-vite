import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { useStore } from "../../lib/zustand/useStore";
import { getCategory, getProducts } from "../../api/product";
import ButtonBasic from "../Button/ButtonBasic";
import CardProductMenu from "../Card/CardProductMenu";

const MainMenu = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageSearchParams = queryParams.get("page");
  const categorySearchParams = queryParams.get("category");

  const paging = pageSearchParams ? Number(pageSearchParams) : 1;
  const categoryParams = categorySearchParams ? categorySearchParams : "";

  const [products, setProducts] = useState<String[]>([]);
  const [categories, setCategories] = useState<String[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(categoryParams);
  const [page, setPage] = useState(paging);
  const [limit, setLimit] = useState(10);

  const { loading, setLoading } = useStore();

  const fetchData = async (category?: string, page?: any) => {
    setLoading(true);

    try {
      // const dataCategory = await getCategory();

      setCategories([]);

      // if (category) {
      //   const data = await getProducts(category, page || paging);

      //   setProducts(data.map((product) => ({ ...product, quantity: 1 })));
      //   console.log(products, "dari  category");
      // } else
      if (page) {
        const data = await getProducts(category, page);

        setProducts(data.map((product) => ({ ...product, quantity: 1 })));
        console.log(products, "hanya dari page");
      } else {
        const data = await getProducts();

        setProducts(data.map((product) => ({ ...product, quantity: 1 })));
        console.log(products, "bukan dari  page dan category");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = async (category: string) => {
    setCategory(category);

    setSearchParams({ category: category, page: page.toString() });
  };

  const handleNextPage = async () => {
    setPage((prev) => prev + 1);

    setSearchParams({ category: category, page: page.toString() });
  };

  const handlePrevPage = async () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));

    setSearchParams({ category: category, page: page.toString() });
  };

  useEffect(() => {
    if (category === null || category === "") {
      setSearchParams({ page: page.toString() });
      fetchData("", page);
    } else {
      setSearchParams({ category: category, page: page.toString() });
      fetchData(category, page);
    }
  }, [page, setSearchParams]);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-2">
        {/* <ButtonBasic
          text="All Product"
          className="py-1 hover:bg-orange-500"
          bgColor="bg-orange-400"
          onClick={() => handleCategory(null)}
        />
        {categories.slice(0, 4).map((cate, index) => (
          <ButtonBasic
            text={cate.name}
            key={index}
            className="py-1 hover:bg-orange-500"
            bgColor="bg-orange-400"
            onClick={() => handleCategory(cate.slug)}
          />
        ))} */}
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <CardProductMenu
            product={product}
            setProducts={setProducts}
            key={index}
          />
        ))}
      </div>
      <div className="flex gap-2 justify-end mt-2">
        <ButtonBasic
          text="Prev"
          onClick={handlePrevPage}
          disabled={page <= 1}
        />
        <ButtonBasic
          text="Next"
          onClick={handleNextPage}
          disabled={products.length < 2}
        />
      </div>
    </>
  );
};

export default MainMenu;
