import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import { useForm } from 'react-hook-form';
import { ArrowRight, Bookmark, Building2, Calendar, Clock, ContactRound, MapPin, Search, Users } from 'lucide-react';
import JobFilters from './JobFilters';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const FindJobs = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, watch } = useForm();
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);

    const searchValue = watch("search");
    const locationValue = watch("location");

    const getJobsParams = () => {
        const params = { status: "active" };
        if (searchValue) params.search = searchValue;
        if (locationValue) params.location = locationValue;
        if (filters.jobType) params.jobType = filters.jobType;
        if (filters.category?.length) params.category = filters.category.join(",");
        if (filters.minSalary) params.minSalary = filters.minSalary;
        if (filters.maxSalary) params.maxSalary = filters.maxSalary;
        return params;
    };

    const { data: jobs = [] } = useQuery({
        queryKey: ['jobs', filters, searchValue, locationValue],
        queryFn: async () => {
            const params = getJobsParams();
            const res = await axiosSecure.get("/api/jobs", { params });
            setLoading(false)
            return res.data.data || [];
        }
    });


    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleSeeDetails = (id) => {
        navigate(`/job-details/${id}`);
    };

    return (
        <div className='pt-20'>
            <Container>
                {/* Search Form */}
                <div className='p-5 shadow-lg rounded-xl space-y-3'>
                    <h3 className='text-3xl font-semibold'>Find Your Dream Job</h3>
                    <p>Discover opportunities that match your passion</p>
                    <form>
                        <div className="grid md:grid-cols-7 items-center gap-3 mt-5">
                            <div className="col-span-4 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Job title, keyword or company"
                                    {...register("search")}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-violet-500"
                                />
                            </div>

                            <div className="col-span-2 relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    {...register("location")}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-violet-500"
                                />
                            </div>

                            <button type="button" className="btn bg-blue-600 py-6 rounded-xl font-normal text-white w-full">
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Jobs + Filters */}
                <div className='grid md:grid-cols-8 gap-3 mt-10 mb-10 items-start'>
                    <div className='col-span-2 p-5 shadow-lg rounded-xl bg-white md:sticky top-20'>
                        <h4 className='font-semibold text-xl mb-5'>Filter Jobs</h4>
                        <JobFilters onFilterChange={handleFilterChange} />
                    </div>

                    <div className='col-span-6'>
                        <h3 className='text-xl font-semibold text-gray-600 pb-5'>Available jobs {jobs.length}</h3>
                        {loading ? (
                            <p className="text-center text-gray-500">Loading jobs...</p>
                        ) : jobs.length === 0 ? (
                            <p className="text-center text-gray-500">No jobs found</p>
                        ) : (
                            <div className='grid md:grid-cols-2 gap-3'>
                                {jobs.map((job) => (
                                    <div key={job._id} className='border border-gray-200 rounded-2xl p-3 hover:shadow-md cursor-pointer transform transition-all'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <div className='p-1 w-18 h-18 flex items-center justify-center shadow-md rounded-2xl'>
                                                    <img className='w-14 h-14 rounded-2xl' src={job.companyInfo.logo} alt="" />
                                                </div>
                                                <div>
                                                    <h3 className='text-[16px] font-semibold'>{job.jobTitle}</h3>
                                                    <p className='flex items-center gap-1 text-gray-500'><Building2 size={15} />{job.companyInfo.companyName}</p>
                                                </div>
                                            </div>
                                            <button><Bookmark className='text-gray-500' /></button>
                                        </div>

                                        <div className='my-5 flex flex-wrap gap-3'>
                                            <p className='inline-block bg-gray-100 py-2 px-3 text-sm rounded-full'><span className='flex gap-2 items-center'><MapPin size={17} />{job.location}</span></p>
                                            <p className='inline-block bg-orange-100 py-2 px-3 text-sm rounded-full'><span className='flex gap-2 items-center'><Clock size={17} />{job.jobType}</span></p>
                                            <p className='inline-block bg-gray-100 py-2 px-3 text-sm rounded-full'><span className='flex gap-2 items-center'><Users size={17} />{job.vacancy}</span></p>
                                        </div>

                                        <div className='flex items-center justify-between py-3 text-gray-500'>
                                            <p className='flex items-center gap-2'><Calendar className='text-green-500' size={16} />{new Date(job.post_date).toLocaleDateString()}</p>
                                            <p className='flex items-center gap-2'><Calendar className='text-red-500' size={16} />{new Date(job.deadline).toLocaleDateString()}</p>
                                        </div>

                                        <div className='text-gray-500 mt-2 flex items-center justify-between'>
                                            <h3 className='text-lg font-bold text-gray-500'>$ {job.salaryMin}-{job.salaryMax}/m</h3>
                                            <p className='flex items-center gap-2'><ContactRound size={17} />{job.workDays}</p>
                                        </div>

                                        <div className='flex items-center justify-between mt-5'>
                                            <p className='capitalize bg-green-100 border border-green-500 rounded-full px-5 py-2 text-sm'>{job.status}</p>
                                            <button
                                                onClick={() => handleSeeDetails(job._id)}
                                                className='btn bg-blue-600 text-white font-normal border-0 rounded-lg py-6'
                                            >
                                                Details <ArrowRight size={15} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default FindJobs;
