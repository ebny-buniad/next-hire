import {
    Check, Mail, User, Star, Heart, Bell, Shield, Cloud, Lock,
    MessageCircle, BriefcaseBusiness, BadgeCheck, Headset, Download,
    BicepsFlexed,
    DollarSign,
    ChevronsRight,
} from 'lucide-react';
import Loading from '../../../components/Loading/Loading';
import useUserPlan from '../../../hooks/useUserPlan';
const PlansTab = () => {
    const iconMap = {
        Check, Mail, User, Star, Heart, Bell, Shield, Cloud, Lock, MessageCircle, BriefcaseBusiness, BadgeCheck, Headset, Download, BicepsFlexed, DollarSign,
    };
    const { plans, loading } = useUserPlan();

    if (loading) {
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