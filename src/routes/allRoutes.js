import Home from "../Pages/Home/Home";
import ProductPage from "../Pages/ProductPage";
import ProductDetailPage from "../Pages/ProductDetailPage";

// Auth Pages
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import ProfilePage from "../Pages/Auth/ProfilePage";
import WishlistPage from "../Pages/WishlistPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import UpdatePasswordPage from "../Pages/Auth/UpdatePasswordPage";
import TokenLoginPage from "../Pages/Auth/TokenLoginPage";
import DirectAdminLogin from "../Pages/Auth/DirectAdminLogin";

// Admin Pages
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ProductForm from "../Pages/Admin/ProductForm";
import AdminRegisterPage from "../Pages/Admin/AdminRegisterPage";

export const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/product", component: <ProductPage /> },
    { path: "/product/:id", component: <ProductDetailPage /> },
    { path: "/login", component: <LoginPage /> },
    { path: "/register", component: <RegisterPage /> },
    { path: "/profile", component: <ProfilePage /> },
    { path: "/wishlist", component: <WishlistPage /> },
    { path: "/forgot-password", component: <ForgotPasswordPage /> },
    { path: "/reset-password/:token", component: <ResetPasswordPage /> },
    { path: "/update-password", component: <UpdatePasswordPage /> },
    { path: "/token-login", component: <TokenLoginPage /> },
    { path: "/direct-admin-login", component: <DirectAdminLogin /> },
];

export const adminRoutes = [
    { path: "/", component: <AdminDashboard /> },
    { path: "/admin", component: <AdminDashboard /> },
    { path: "/admin/product/new", component: <ProductForm /> },
    { path: "/admin/product/edit/:id", component: <ProductForm /> },
    { path: "/admin/register", component: <AdminRegisterPage /> },
];