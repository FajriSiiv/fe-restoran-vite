import React from "react";

const Homepage = () => {
  const handleClick = () => {
    window.location.href = "/menu";
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="font-bold text-4xl absolute top-10 left-0 text-center w-screen">
        Selamat Datang di Supermarket
      </h1>
      <button
        className="py-3 px-5 text-lg border font-semibold hover:bg-slate-800 transition-all text-slate-800 hover:text-white rounded-md"
        onClick={handleClick}
      >
        Pesanan Baru
      </button>
    </div>
  );
};

export default Homepage;
