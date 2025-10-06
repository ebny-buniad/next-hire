import React from 'react';
import { Outlet } from 'react-router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className=''>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;