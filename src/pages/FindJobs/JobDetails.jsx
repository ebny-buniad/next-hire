import React from 'react';
import Container from '../../components/Container/Container';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router';
import Loading from '../../components/Loading/Loading';
import { ArrowLeft, Building, Building2, Clock3, MapPin, Send, Sparkle, Users } from 'lucide-react';
import { Bookmark, Share2, Check, DollarSign, Briefcase, Calendar, FileText, Heart, Home, Award, GraduationCap, Clock, MonitorCheck } from 'lucide-react';
import ViewCompanyProfile from './ViewCompanyProfile';

const JobDetails = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { data: jobDetails = {}, isPending } = useQuery({
        queryKey: ['job-details', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/jobs/${id}`);
            return res.data.data;
        }
    })

    const { jobTitle, jobType, location, post_date, requirements, salaryMin, salaryMax, status, vacancy,
        workDays, jobLevel, description, deadline, companyInfo, benefits } = jobDetails;

    if (isPending) {
        return <Loading></Loading>
    }

    const hanelViewCompanyProfile = (companyName) => {
        console.log(companyName)
        navigate(`/view-company-profile/${companyName}`)
    }

    return (
        <div className='pt-22 text-gray-700'>
            <Container>

                <div className='flex items-center gap-5 mb-10 mt-5'>
                    <button onClick={() => navigate(-1)} className='cursor-pointer'><ArrowLeft /></button>
                    <div>
                        <h3 className='text-3xl font-semibold pb-2'>{jobTitle}</h3>
                        <p>{companyInfo[0].companyName} • {location}</p>
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8 mt-8 mb-15">

                    <div className="lg:col-span-2 space-y-8">
                        {/* Job Header Card */}
                        <div className="card  p-6 border border-gray-200">
                            <div className="flex items-start justify-between">
                                <div className="md:flex items-start space-x-4">
                                    {/* Company Logo */}
                                    <div className='h-20 w-20 p-2 rounded-2xl shadow flex items-center justify-center'>
                                        <img className='object-cover rounded-2xl' src={companyInfo[0]?.logo ? companyInfo[0]?.logo : <Building2 className='text-blue-600' size={40} />} alt="" />
                                    </div>
                                    {/* Title and Metadata */}
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 leading-snug">{jobTitle}</h1>
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
                                <div className="flex space-x-3">
                                    <button className="btn btn-ghost btn-circle text-gray-500 hover:text-blue-600">
                                        <Bookmark className="w-5 h-5" />
                                    </button>
                                    <button className="btn btn-ghost btn-circle text-gray-500 hover:text-blue-600">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Stats Card Row */}
                            <div className="mt-6 flex flex-wrap gap-4 justify-between border-t border-gray-200 pt-4">
                                <div className="flex flex-col items-center p-3 w-1/3 min-w-[120px] max-w-[200px]">
                                    <p className="text-2xl font-bold text-gray-900">$ {salaryMin}–{salaryMax}</p>
                                    <p className="text-sm text-gray-500">Monthly Salary</p>
                                </div>
                                <div className="flex flex-col items-center p-3 w-1/3 min-w-[120px] max-w-[200px]">
                                    <p className="text-2xl font-bold text-gray-900">{vacancy}</p>
                                    <p className="text-sm text-gray-500">Vacancies</p>
                                </div>
                                <div className="flex flex-col items-center p-3 w-1/3 min-w-[120px] max-w-[200px]">
                                    <p className="text-2xl font-bold text-gray-900 capitalize">{jobType}</p>
                                    <p className="text-sm text-gray-500">Job Type</p>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="card p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Description</h2>
                            <p className="text-gray-600 leading-relaxed">{description}</p>
                        </div>

                        {/* Requirements */}
                        <div className="card p-6 border border-gray-200">
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
                        <div className="card p-6 border border-gray-200">
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

                    <div className="lg:col-span-1 space-y-6 mt-8 lg:mt-0">
                        <div className="card p-6 border border-gray-200">
                            <div className='mb-6 flex gap-5 justify-between'>
                                <button className="btn w-90 py-7 bg-blue-600 text-white rounded-lg text-lg border-0">
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


                        {/* Job Alert Card */}
                        <div className="card bg-white shadow-xl p-6 border border-gray-100 text-center">
                            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Job Alert</h3>
                            <p className="text-sm text-gray-500 mt-1 mb-4">
                                Get notified when similar jobs are posted
                            </p>
                            <button className="btn btn-outline btn-block border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                                Create Alert
                            </button>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
};

export default JobDetails;