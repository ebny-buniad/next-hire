import React from 'react';
import { Outlet } from 'react-router';
import Header from '../../components/Header/Header';

const AuthLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className='px-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;