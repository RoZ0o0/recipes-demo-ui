import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipes from "../pages/Recipes";
import MainLayout from "../layouts/MainLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Recipes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
