import Home from "../Pages/Home/Home";
import ProductPage from "../Pages/ProductPage";
import ProductDetailPage from "../Pages/ProductDetailPage";

export const publicRoutes = [
    { path: "/", compoments: <Home /> },
    { path: "/product", compoments: <ProductPage /> },
    { path: "/product/:id", compoments: <ProductDetailPage /> },
];