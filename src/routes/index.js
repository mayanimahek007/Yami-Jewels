import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes, adminRoutes } from './allRoutes';
import Layout from '../Components/Layout';
import ScrollToTop from '../Components/ScrollToTop';
import { useAuth } from '../context/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
    const { currentUser, isAdmin } = useAuth();
    
    if (!currentUser || !isAdmin) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

const index = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* Public Routes */}
                {publicRoutes?.map((item, index) => (
                    <Route path={item?.path} key={index} element={<Layout>{item?.compoments}</Layout>}></Route>
                ))}
                
                {/* Admin Routes - Protected */}
                {adminRoutes?.map((item, index) => (
                    <Route 
                        path={item?.path} 
                        key={`admin-${index}`} 
                        element={
                            <ProtectedRoute>
                                <Layout>{item?.compoments}</Layout>
                            </ProtectedRoute>
                        }
                    />
                ))}
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default index;