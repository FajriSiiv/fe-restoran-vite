import Sidebar from "../components/Menu/Sidebar";
import { useStore } from "../lib/zustand/useStore";
import MainMenu from "../components/Menu/MainMenu";
import Loading from "../components/Loading";

const Menu = () => {
  const { loading } = useStore();

  return (
    <div className="grid grid-cols-8 p-6">
      <div className="col-span-2 ">
        <Sidebar />
      </div>
      <div className="col-span-6 border p-5 rounded-md flex flex-col relative">
        {loading && (
          <div className="flex h-full w-full justify-center items-center absolute left-0 top-0 bg-white z-50">
            <Loading />
          </div>
        )}
        <MainMenu />
      </div>
    </div>
  );
};

export default Menu;
