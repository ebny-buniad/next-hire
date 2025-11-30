import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useParams } from 'react-router';
import Loading from '../../components/Loading/Loading';
import { ArrowLeft, Building, Building2, MapPin, Send, Sparkle, Users } from 'lucide-react';
import { Bookmark, Share2, Check, Calendar, Clock, MonitorCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import useUserPlan from '../../hooks/useUserPlan';
import Logo from '../../components/Logo/Logo';
import {
    Mail, User, Star, Heart, Bell, Shield, Cloud, Lock,
    MessageCircle, BriefcaseBusiness, BadgeCheck, Headset, Download,
    BicepsFlexed,
    DollarSign,
    ChevronsRight,
} from 'lucide-react';

const JobDetails = () => {
    const iconMap = {
        Check, Mail, User, Star, Heart, Bell, Shield, Cloud, Lock, MessageCircle, BriefcaseBusiness, BadgeCheck, Headset, Download, BicepsFlexed, DollarSign,
    };
    const [openModal, setOpenModal] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { plans } = useUserPlan();
    const plan = plans[plans.length - 1]
    const { id } = useParams();
    const { data: jobDetails = {}, isPending } = useQuery({
        queryKey: ['job-details', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/jobs/${id}`);
            return res.data.data;
        }
    });

    const { _id, jobTitle, jobType, location, post_date, requirements, salaryMin, salaryMax, status, vacancy,
        workDays, jobLevel, description, deadline, companyInfo, benefits } = jobDetails;

    if (isPending) {
        return <Loading></Loading>
    }

    const hanelViewCompanyProfile = (companyName) => {
        navigate(`/view-company-profile/${companyName}`)
    }

    const jobApplyInfo = {
        jobId: _id,
        email: user?.email,
        jobTitle,
        companyInfo,
        appliedAt: new Date().toISOString(),
        jobLevel,
        deadline,
        applicationStatus: 'pending',
        jobStatus: status
    }
    const handelApplyJob = async () => {
        try {
            const res = await axiosSecure.post('/api/applications', jobApplyInfo);
            if (res.data.application.insertedId) {
                toast.success('Application Successful');
            }
        }
        catch (error) {
            const status = error.response?.status;

            if (status === 400) {
                toast.error("Please create your profile first!");
            }
            else if (status === 409) {
                toast.error("You already applied to this job");
            }
            else if (status === 403) {
                toast.error("Employers cannot apply!");
            }
            else {
                setOpenModal(true);
            }
        }
    }

    return (
        <div className='pt-22 text-gray-700'>
            <Container>

                <div className='md:flex items-center gap-5 mb-10 md:mt-5'>
                    <button onClick={() => navigate(-1)} className='cursor-pointer mb-5 md:mb-0'><ArrowLeft /></button>
                    <div className='space-y-3'>
                        <h3 className='text-3xl font-semibold'>{jobTitle}</h3>
                        <p>{companyInfo[0].companyName} • {location}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-15">

                    <div className="lg:col-span-2 space-y-4">
                        {/* Job Header Card */}
                        <div className="card p-3 md:p-6 border border-gray-200">
                            <div className="relative">
                                <div className="md:flex items-start space-x-4">
                                    {/* Company Logo */}
                                    <div className='h-16 w-16 p-1 mb-3 rounded-2xl shadow flex items-center justify-center'>
                                        <img className='object-cover rounded-2xl' src={companyInfo[0]?.logo ? companyInfo[0]?.logo : <Building2 className='text-blue-600' size={40} />} alt="" />
                                    </div>
                                    {/* Title */}
                                    <div className='space-y-3'>
                                        <h1 className="text-2xl font-bold text-gray-700">{jobTitle}</h1>
                                        <p className="text-gray-600 flex items-center mt-1">
                                            <span className="font-semibold text-blue-600">{companyInfo[0].companyName}</span>
                                            <MapPin className="w-4 h-4 ml-3 mr-1 text-gray-400" />
                                            <span>{location}</span>
                                        </p>
                                        <div className="flex items-center space-x-3 mt-2 text-sm">
                                            <div className="badge badge-success badge-outline border-green-500 text-green-700 bg-green-50 uppercase">
                                                {status}
                                            </div>
                                            <p className="text-gray-500 flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                Posted on {new Date(post_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions (Bookmark/Share) */}
                                <div className="flex space-x-3 absolute top-0 right-0">
                                    <button className="btn btn-ghost btn-circle text-gray-500 hover:text-blue-600">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Stats Card Row */}
                            <div className="mt-6 flex flex-wrap gap-4 justify-between border-t border-gray-200 pt-4">
                                <div className="flex flex-col items-center p-3">
                                    <p className="text-2xl font-semibold text-gray-600">$ {salaryMin}–{salaryMax}</p>
                                    <p className="text-sm text-gray-500">Monthly Salary</p>
                                </div>
                                <div className="flex flex-col items-center p-3">
                                    <p className="text-2xl font-semibold text-gray-600">{vacancy}</p>
                                    <p className="text-sm text-gray-500">Vacancies</p>
                                </div>
                                <div className="flex flex-col items-center p-3">
                                    <p className="text-2xl font-semibold text-gray-600 capitalize">{jobType}</p>
                                    <p className="text-sm text-gray-500">Job Type</p>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="card p-3 md:p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Description</h2>
                            <p className="text-gray-600 leading-relaxed">{description}</p>
                        </div>

                        {/* Requirements */}
                        <div className="card p-3 md:p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Requirements</h2>
                            <ul className="space-y-3">
                                {requirements?.split("\n")
                                    .filter((req) => req.trim() !== "")
                                    .map((req, index) => (
                                        <li key={index} className="flex items-start text-gray-600">
                                            <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                            <p>{req}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/* Benefits & Perks */}
                        <div className="card p-3 md:p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Benefits & Perks</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-600">
                                <ul className='space-y-3'>
                                    {
                                        benefits?.split("\n")
                                            .filter((ben) => ben.trim() !== "")
                                            .map((ben, index) => (
                                                <li key={index} className="flex items-start text-gray-600">
                                                    <Sparkle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                                                    <p>{ben}</p>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="card p-3 md:p-6 border border-gray-200 md:sticky md:top-20">
                            <div className='mb-6 flex gap-5 justify-between'>
                                <button onClick={() => handelApplyJob()} className="btn flex-1 py-7 bg-blue-600 text-white rounded-lg text-lg border-0">
                                    <Send className="w-5 h-5" />
                                    Apply Now
                                </button>
                                <button className="btn py-7 bg-transparent rounded-lg">
                                    <Bookmark className="w-5 h-5" />
                                </button>

                            </div>

                            {/* Job Summary List */}
                            <div className="space-y-3 text-gray-700">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold flex items-center text-gray-500">
                                        <MonitorCheck className="w-5 h-5 mr-3 text-blue-600" />
                                        Job Level
                                    </span>
                                    <span className="font-medium capitalize">{jobLevel}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold flex items-center text-gray-500">
                                        <Clock className="w-5 h-5 mr-3 text-blue-600" />
                                        Work Days
                                    </span>
                                    <span className="font-medium">{workDays}</span>
                                </div>
                                <div className="flex items-center justify-between pb-5">
                                    <span className="font-semibold flex items-center text-gray-500">
                                        <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                                        Application Deadline
                                    </span>
                                    <span className={`font-medium ${new Date(deadline) < new Date() ? 'text-red-500' : 'text-orange-500'}`}>
                                        {new Date(deadline).toLocaleDateString()}
                                    </span>
                                </div>


                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-t border-gray-200 pt-5">Company Info</h3>
                                <div className="flex items-center space-x-4">
                                    <div className='h-15 w-15 p-2 rounded-xl shadow flex items-center justify-center'>
                                        <img className='object-cover rounded-xl' src={companyInfo[0]?.logo ? companyInfo[0]?.logo : <Building2 className='text-blue-600' size={40} />} alt="" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{companyInfo[0].companyName}</p>
                                        <a href={companyInfo[0].website} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline">
                                            {companyInfo[0].website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                        </a>
                                    </div>
                                </div>
                                <button onClick={() => hanelViewCompanyProfile(companyInfo[0].companyName)} className="btn py-6 w-full bg-transparent rounded-lg">
                                    <Building size={18} /> View Company Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>






                {/* PLAN UPGRADE MODAL */}
                {openModal && (
                    <dialog open className="modal">
                        <div className="modal-box lg:w-5xl max-w-5xl bg-gradient-to-r from-blue-100 to-violet-50">
                            <button onClick={() => setOpenModal(false)} className="btn btn-circle btn-ghost absolute right-2 top-2 text-xl">✕</button>
                            <div className='flex flex-col items-center mb-10 mt- space-y-3'>
                                <Logo className="mx-auto"></Logo>
                                <p className='text-red-400'>Already you hit the free plan!</p>
                                <p className='text-2xl'>Unlock advanced Capabilities</p>
                            </div>


                            <div className='grid items-center md:grid-cols-2 gap-5'>
                                <div>
                                    <img className='rounded-xl w-full hidden md:block' src="https://leodesignking.com/wp-content/uploads/2024/07/social-media-marketing-1.jpg" alt="" />
                                </div>
                                <div key={plan._id}>
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
                                    <div className="divider">OR</div>
                                    <Link state={{ tab: "plans" }} to="/settings"
                                        className='btn w-full rounded-full mt-1 bg-blue-600 text-white border-0 font-normal py-6 px-10'>See all Plans</Link>
                                </div>
                            </div>
                        </div>
                    </dialog>
                )}

            </Container>
        </div>
    );
};

export default JobDetails;