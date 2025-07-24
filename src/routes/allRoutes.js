import Home from "../Pages/Home/Home";
import ProductPage from "../Pages/ProductPage";

export const publicRoutes = [
    { path: "/", compoments: <Home /> },
    { path: "/product", compoments: <ProductPage /> },
];