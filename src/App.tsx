import { Route, Routes } from "react-router";
import Menu from "./pages/menu";
import Homepage from "./pages/homepage";
import Orders from "./pages/orders";
import History from "./pages/history";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;
