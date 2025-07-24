import React from 'react';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Home/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Outlet />
            {children}
                <Footer />
        </>
    );
};

export default Layout;