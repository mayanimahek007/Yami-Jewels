import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './allRoutes';
import Layout from '../Components/Layout';
import ScrollToTop from '../Components/ScrollToTop';

const index = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {publicRoutes?.map((item, index) => (
                    <Route path={item?.path} key={index} element={<Layout>{item?.compoments}</Layout>}></Route>
                ))}
            </Routes>
        </>
    );
};

export default index;