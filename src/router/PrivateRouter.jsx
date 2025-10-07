import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p>loading..</p>
    }

    if (!user) {
        return <Navigate to='/auth/login' state={location}></Navigate>
    }

    return children;
};

export default PrivateRouter;