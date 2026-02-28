import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipes from "../pages/Recipes";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Recipes />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;