import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loading/Loading';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to='/auth/login' state={location}></Navigate>
    }

    return children;
};

export default PrivateRouter;