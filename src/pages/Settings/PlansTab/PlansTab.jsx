import {
    Check, Mail, User, Star, Heart, Bell, Shield, Cloud, Lock,
    MessageCircle, BriefcaseBusiness, BadgeCheck, Headset, Download,
    BicepsFlexed,
    DollarSign,
    ChevronsRight,
} from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading/Loading';
const PlansTab = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const iconMap = {
        Check, Mail, User, Star, Heart, Bell, Shield, Cloud, Lock, MessageCircle, BriefcaseBusiness, BadgeCheck, Headset, Download, BicepsFlexed, DollarSign,
    };

    // Load user data for get role
    const { data: userDetails = {}, isPending } = useQuery({
        queryKey: ['userACdetails', user?.email],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/api/users?email=${user?.email}`);
                return res.data;
            }
            catch (error) {
                console.log(error);
            }

        },
        enabled: !!user?.email,
    });

    // Load subscription plan by user role
    const { data: plans = [] } = useQuery({
        queryKey: ['plans', userDetails?.email],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/api/plans/${userDetails?.role}`);
                return res.data.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        enabled: !!userDetails?.role,
    })

    if (isPending) {
        return <Loading></Loading>
    }

    const handelGetPlan = (id) => {
        console.log(id)
    }

    return (
        <div>
            <h4 className='text-xl font-semibold mb-5 flex items-center gap-1'><BicepsFlexed size={20} />Upgrade your plan</h4>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-start'>
                {plans.map(plan => (
                    <div key={plan._id} className='border border-gray-200 rounded-lg px-3 py-6'>
                        <h3 className='font-semibold text-2xl text-violet-500'>{plan.name}</h3>
                        <h1 className='text-4xl flex mt-5 mb-2'><DollarSign size={15} />{plan.price}</h1>
                        <p>Per Month</p>
                        <div className='mt-4 space-y-4'>
                            {plan.features.map((feature, index) => {
                                const IconComponent = iconMap[feature.icon];
                                return (
                                    <p key={index} className="flex items-center gap-2">
                                        {IconComponent && <IconComponent size={16} />}
                                        {feature.text}
                                    </p>
                                );
                            })}
                        </div>
                        <button onClick={() => handelGetPlan(plan._id)}
                            disabled={plan.price === '0'}
                            className='btn mt-8 border-0 text-white w-full py-6 rounded-full
                         bg-gradient-to-r from-blue-500 to-purple-500 font-normal'
                        >{plan.price === "0" ? 'Your current plan' : <>Get Plan <ChevronsRight size={17} /></>}</button>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default PlansTab;