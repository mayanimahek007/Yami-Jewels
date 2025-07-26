import Home from "../Pages/Home/Home";
import ProductPage from "../Pages/ProductPage";
import ProductDetailPage from "../Pages/ProductDetailPage";

// Auth Pages
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import UpdatePasswordPage from "../Pages/Auth/UpdatePasswordPage";
import TokenLoginPage from "../Pages/Auth/TokenLoginPage";

// Admin Pages
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ProductForm from "../Pages/Admin/ProductForm";
import ProductFormData from "../Pages/Admin/ProductFormData";
import AdminRegisterPage from "../Pages/Admin/AdminRegisterPage";

export const publicRoutes = [
    { path: "/", compoments: <Home /> },
    { path: "/product", compoments: <ProductPage /> },
    { path: "/product/:id", compoments: <ProductDetailPage /> },
    { path: "/login", compoments: <LoginPage /> },
    { path: "/register", compoments: <RegisterPage /> },
    { path: "/forgot-password", compoments: <ForgotPasswordPage /> },
    { path: "/reset-password/:token", compoments: <ResetPasswordPage /> },
    { path: "/update-password", compoments: <UpdatePasswordPage /> },
    { path: "/token-login", compoments: <TokenLoginPage /> },
];

export const adminRoutes = [
    { path: "/admin", compoments: <AdminDashboard /> },
    { path: "/admin/product/new", compoments: <ProductForm /> },
    { path: "/admin/product/edit/:id", compoments: <ProductForm /> },
    { path: "/admin/product/new-formdata", compoments: <ProductFormData /> },
    { path: "/admin/register", compoments: <AdminRegisterPage /> },
];