import React from 'react';
import { Outlet } from 'react-router';
import Header from '../../components/Header/Header';

const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className=''>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;