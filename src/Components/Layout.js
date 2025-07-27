import React from 'react';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Home/Footer';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
    const { currentUser, logout, isAdmin } = useAuth();
    return (
        <>
         {!isAdmin && (
            <Header />
         )}
            <Outlet />
            {children}
            <Footer />
        </>
    );
};

export default Layout;