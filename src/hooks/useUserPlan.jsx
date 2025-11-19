import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUserPlan = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Load user details
    const { data: userDetails = {}, isLoading: userLoading } = useQuery({
        queryKey: ["user-details", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/users?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    })

    // Load plans based on user role
    const { data: plans = [], isLoading: planLoading } = useQuery({
        queryKey: ["plans", userDetails?.role],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/plans/${userDetails.role}`);
            return res.data.data;
        },
        enabled: !!userDetails?.role,
    });

    return { userDetails, plans, loading: planLoading || userLoading };
};

export default useUserPlan;