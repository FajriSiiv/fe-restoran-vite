import { Route, Routes } from "react-router";
import Menu from "./pages/menu";
import Homepage from "./pages/homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
}

export default App;
