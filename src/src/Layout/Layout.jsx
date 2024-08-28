import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Screens/LayoutComponents/Header';


const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout