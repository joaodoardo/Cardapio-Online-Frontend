import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categoria from "./pages/Itens";
import Admin from "./pages/Admin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/itens/:id" element={<Categoria />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;