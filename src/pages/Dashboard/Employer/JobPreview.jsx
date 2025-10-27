import { ArrowLeft, Building2, DollarSign, MapPin, Send, Users } from 'lucide-react';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const JobPreview = ({ data, onEdit, onPost }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { jobTitle, jobType, location, requirements, salaryMax, salaryMin, category, description,
        jobLevel, vacancy, workDays, deadline, benefits

    } = data;
    const { data: logo = {}, isLoading } = useQuery({
        queryKey: ['logo-load', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/company?email=${user?.email}&field=logo`);
            return res.data.data;
        }
    })

    console.log(data)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='text-gray-700'>
            <div className='flex items-center justify-between mb-10'>
                <h4 className='text-2xl font-semibold'>Job Preview</h4>
                <button onClick={() => onEdit()} className='btn py-6 rounded-xl shadow-lg bg-transparent
                 hover:bg-blue-600 hover:text-white'><ArrowLeft size={17} />Back to Edit</button>
            </div>
            <div className='flex items-center justify-between border-b border-gray-200 pb-5'>
                <div>
                    <h4 className='text-xl font-semibold pb-2'>{jobTitle}</h4>
                    <p className='flex items-center gap-2'><MapPin size={16} />{location}</p>
                </div>

                <div className='h-20 w-20 p-2 rounded-2xl shadow flex items-center justify-center'>
                    {
                        logo?.logo ? <img className='object-cover rounded-2xl' src={logo.logo} alt="" /> : <Building2 className='text-blue-600' size={40} />
                    }
                </div>
            </div>

            <div className='flex flex-wrap items-center gap-2 my-10'>
                <p className='bg-violet-100 text-sm inline px-4 py-2 rounded-full text-violet-700 border border-violet-300'>{category}</p>
                <p className='bg-blue-100 text-sm inline px-4 py-2 rounded-full text-blue-700 border border-blue-300'>{jobType}</p>
                <p className='bg-lime-100 text-sm inline px-4 py-2 rounded-full text-lime-700 border border-lime-300'>{jobLevel}</p>
                <p className='bg-green-100 text-sm inline px-4 py-2 rounded-full text-green-700 border border-green-300'>{vacancy}</p>
                <p className='bg-rose-100 text-sm inline px-4 py-2 rounded-full text-rose-700 border border-rose-300'>{workDays}</p>
                <p className='bg-orange-100 text-sm inline px-4 py-2 rounded-full text-orange-700 border border-orange-300'>
                    {new Date(deadline).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </p>
            </div>

            <div className="mt- flex justify-between items-center bg-green-50 border border-green-200 rounded-2xl p-3 shadow-s">
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 h-20 w-20 flex items-center justify-center text-white p-3 rounded-xl">
                        <DollarSign size={32} />
                    </div>
                    <div className='space-y-2'>
                        <p className="text-sm text-gray-600 font-medium">Compensation</p>
                        <p className="text-xl font-semibold">
                            {salaryMin} - {salaryMax}{" "}
                            <span className="text-sm font-normal text-gray-600">per month</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-emerald-700 bg-green-100 px-3 py-2 rounded-full text-sm font-medium">
                    <Users size={16} /> Competitive
                </div>
            </div>

            <div className='flex items-center gap-3 mt-10'>
                <div className='w-1 bg-blue-500 h-10 rounded-full'>
                </div>
                <h4 className='text-xl font-semibold'>About This Role</h4>
            </div>
            <p className='p-5 rounded-lg mt-5 bg-gray-50'>{description}</p>
            <div className='flex items-center gap-3 mt-10'>
                <div className='w-1 bg-violet-500 h-10 rounded-full'>
                </div>
                <h4 className='text-xl font-semibold'>What We're Looking For</h4>
            </div>
            <ul className="p-5 rounded-lg mt-5 bg-gray-100 list-disc list-inside text-gray-700 space-y-2 leading-relaxed marker:text-emerald-600">
                {requirements
                    ?.split("\n")
                    .filter((req) => req.trim() !== "")
                    .map((req, index) => (
                        <li key={index}>{req.trim()}</li>
                    ))}
            </ul>
            <div className='flex items-center gap-3 mt-10'>
                <div className='w-1 bg-violet-500 h-10 rounded-full'>
                </div>
                <h4 className='text-xl font-semibold'>Additional Benefits</h4>
            </div>
            <ul className="p-5 rounded-lg mt-5 bg-gray-100 list-disc list-inside text-gray-700 space-y-2 leading-relaxed marker:text-emerald-600">
                {benefits
                    ?.split("\n")
                    .filter((ben) => ben.trim() !== "")
                    .map((ben, index) => (
                        <li key={index}>{ben.trim()}</li>
                    ))}
            </ul>

            <button onClick={() => onPost()} className='btn mt-10 py-6 px-10 bg-blue-600 text-white font-normal
            hover:rounded-xl transform transition-all shadow-lg border-0'><Send size={15} /> Post Job</button>
        </div>
    );
};

export default JobPreview;