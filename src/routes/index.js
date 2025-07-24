import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './allRoutes';
import Layout from '../Components/Layout';

const index = () => {
    return (
        <>
            <Routes>
                {publicRoutes?.map((item, index) => (
                    <Route path={item?.path} key={index} element={<Layout>{item?.compoments}</Layout>}></Route>
                ))}
            </Routes>
        </>
    );
};

export default index;