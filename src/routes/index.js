import React from 'react'
import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
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

const Routes = () => {
    const { isAdmin } = useAuth();
    
    return (
        <>
            <ScrollToTop />
            <RouterRoutes>
                {/* Render routes based on user role */}
                {isAdmin ? (
                    // Admin Routes
                    adminRoutes?.map((item, index) => (
                        <Route 
                            path={item?.path} 
                            key={`admin-${index}`} 
                            element={
                                <ProtectedRoute>
                                    <Layout>{item?.component}</Layout>
                                </ProtectedRoute>
                            }
                        />
                    ))
                ) : (
                    // Public Routes for non-admin users
                    publicRoutes?.map((item, index) => (
                        <Route path={item?.path} key={index} element={<Layout>{item?.component}</Layout>}></Route>
                    ))
                )}
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </RouterRoutes>
        </>
    );
};

export default Routes;