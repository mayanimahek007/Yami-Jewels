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
import CustomJewels from "../Pages/CustomeJewels";
import TermsAndConditions from "../Pages/TermsAndConditions";
import ReturnExchangeCancellationPolicy from "../Pages/ReturnExchangeCancellationPolicy";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Blogs from "../Pages/Blogs";
import BlogDetail from "../Pages/BlogDetail";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";

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
    { path: "/about-us", component: <AboutUs /> },
    { path: "/contact-us", component: <ContactUs /> },
    { path: "/terms-and-conditions", component: <TermsAndConditions /> },
    { path: "/return-exchange-cancellation-policy", component: <ReturnExchangeCancellationPolicy /> },
    { path: "/privacy-policy", component: <PrivacyPolicy /> },
    { path: "/blogs", component: <Blogs /> },
    { path: "/blog-detail/:id", component: <BlogDetail /> },
    {path: "/custom-jewellery", component: <CustomJewels />}, // Assuming this is a custom route for jewellery
];


export const adminRoutes = [
    { path: "/", component: <AdminDashboard /> },
    { path: "/admin", component: <AdminDashboard /> },
    { path: "/admin/product/new", component: <ProductForm /> },
    { path: "/admin/product/edit/:id", component: <ProductForm /> },
    { path: "/admin/register", component: <AdminRegisterPage /> },
];