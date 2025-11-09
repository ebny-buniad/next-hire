import React, { useState } from 'react';
import Container from '../../../components/Container/Container';
import { Eye, Briefcase, MapPin, DollarSign, Layers, Clock, User, Users, Send, ArrowBigRight, ArrowRight, Calendar } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import JobPreview from './JobPreview';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import useAuth from '../../../hooks/useAuth';

const PostJob = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
    const [previewData, setPreviewData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = (data) => {
        const jobDetails = {
            ...data,
            post_date: new Date().toISOString(),
            posted_by: user?.email,
            status: "active",
            deadline: data?.deadline.toISOString()
        }
        setPreviewData(jobDetails);
    };

    return (
        <Container>
            <div className='shadow-md rounded-2xl p-6 mt-5'>
                {
                    !previewData ?
                        <div>
                            <h4 className='text-2xl font-semibold'>Post a new Job</h4>
                            <p>Fill out the form to create your job posting</p>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-10">
                                {/* Job Title */}
                                <div>
                                    <label className="label text-sm font-medium">Job Title*</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Enter job title"
                                            {...register("jobTitle", { required: "Job title is required" })}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    {errors.jobTitle && (
                                        <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
                                    )}
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="label text-sm font-medium">Location*</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Enter location"
                                            {...register("location", { required: "Location is required" })}
                                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                        />
                                    </div>
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                                    )}
                                </div>

                                <div className='grid md:grid-cols-2 gap-5'>
                                    {/* Category Select */}
                                    <div>
                                        <label className="label text-sm font-medium">Category*</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select
                                                {...register("category", { required: "Category is required" })}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select category
                                                </option>
                                                <option>Frontend Developer</option>
                                                <option>Backend Developer</option>
                                                <option>Full Stack Developer</option>
                                                <option>UI/UX Designer</option>
                                                <option>Project Manager</option>
                                                <option>Mobile App Developer</option>
                                                <option>DevOps Engineer</option>
                                                <option>Data Analyst</option>
                                                <option>Software Engineer</option>
                                                <option>Cybersecurity Specialist</option>
                                                <option>Technical Support Engineer</option>
                                                <option>Digital Marketing Specialist</option>
                                            </select>
                                        </div>
                                        {errors.category && (
                                            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                                        )}
                                    </div>

                                    {/* Job Type Select */}
                                    <div>
                                        <label className="label text-sm font-medium">Job Type*</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select
                                                {...register("jobType", { required: "Job type is required" })}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select job type
                                                </option>
                                                <option>Full-time</option>
                                                <option>Part-time</option>
                                                <option>Remote</option>
                                                <option>Contract</option>
                                                <option>Internship</option>
                                            </select>
                                        </div>
                                        {errors.jobType && (
                                            <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>
                                        )}
                                    </div>

                                    {/* Job Level */}
                                    <div>
                                        <label className="label text-sm font-medium">Job Level*</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select
                                                {...register("jobLevel", { required: "Job level is required" })}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>
                                                    Select Level
                                                </option>
                                                <option>Entry</option>
                                                <option>Medium</option>
                                                <option>Senior</option>
                                            </select>
                                        </div>
                                        {errors.jobLevel && (
                                            <p className="text-red-500 text-sm mt-1">{errors.jobLevel.message}</p>
                                        )}
                                    </div>

                                    {/* Vacancy */}
                                    <div>
                                        <label className="label text-sm font-medium">Vacancy*</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="number"
                                                placeholder="Vacancy"
                                                {...register("vacancy", { required: "Vacancy is required" })}
                                                className="w-full no-arrow pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                        {errors.vacancy && (
                                            <p className="text-red-500 text-sm mt-1">{errors.vacancy.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Job Description */}
                                <div>
                                    <label className="label text-sm font-medium">Job Description*</label>
                                    <textarea
                                        {...register("description", { required: "Description is required" })}
                                        placeholder="Describe the job responsibilities"
                                        className="textarea w-full h-38 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                    ></textarea>
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                                    )}
                                    <p className='mt-2 text-sm'>Include key responsibilities, day-to-day tasks, and what makes this role existing</p>
                                </div>

                                {/* Requirements */}
                                <div>
                                    <label className="label text-sm font-medium">Requirements*</label>
                                    <textarea
                                        {...register("requirements", { required: "Requirements are required" })}
                                        placeholder="List the job requirements"
                                        className="textarea w-full h-38 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                    ></textarea>
                                    {errors.requirements && (
                                        <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>
                                    )}
                                    <p className='mt-2 text-sm'>Include required skills, experience level, education, and any preferred qualifications</p>
                                </div>

                                {/* Additional Benefits */}
                                <div>
                                    <label className="label text-sm font-medium">Additional Benefits*</label>
                                    <textarea
                                        {...register("benefits", { required: "Benefits are required" })}
                                        placeholder="List the additional benefits"
                                        className="textarea w-full h-28 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                    ></textarea>
                                    {errors.benefits && (
                                        <p className="text-red-500 text-sm mt-1">{errors.benefits.message}</p>
                                    )}
                                    <p className='mt-2 text-sm'>Include Additional Benefits for job holders</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {/* Salary Range */}
                                    <div>
                                        <label className="label text-sm font-medium">Min Salary*</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="number"
                                                placeholder="Minimum"
                                                {...register("salaryMin", { required: "Min salary is required" })}
                                                className="w-full no-arrow pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                        {errors.salaryMin && (
                                            <p className="text-red-500 text-sm mt-1">{errors.salaryMin.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="label text-sm font-medium">Max Salary*</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="number"
                                                placeholder="Maximum"
                                                {...register("salaryMax", { required: "Max salary is required" })}
                                                className="w-full no-arrow pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                        {errors.salaryMax && (
                                            <p className="text-red-500 text-sm mt-1">{errors.salaryMax.message}</p>
                                        )}
                                    </div>

                                    {/* Application deadline */}
                                    <div>
                                        <label className="label text-sm font-medium">Application Deadline*</label>
                                        <Controller
                                            name="deadline"
                                            control={control}
                                            render={({ field }) => (
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value={field.value ? field.value.toLocaleDateString() : ""}
                                                        onClick={() => setIsOpen(!isOpen)}
                                                        placeholder="Select a date"
                                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                                    />

                                                    {isOpen && (
                                                        <div className="absolute z-50 bg-white shadow-lg p-2 rounded-lg mt-2">
                                                            <DayPicker
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={(date) => {
                                                                    field.onChange(date);
                                                                    setIsOpen(false);
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        />

                                    </div>

                                    {/* Working hours */}
                                    <div>
                                        <label className="label text-sm font-medium">Working Days*</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Working days (Start – End)"
                                                {...register("workDays", { required: "Working days is required" })}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                        </div>
                                        {errors.workDays && (
                                            <p className="text-red-500 text-sm mt-1">{errors.workDays.message}</p>
                                        )}
                                    </div>


                                </div>

                                {/* Submit Button */}
                                <button type="submit" className="btn rounded-lg text-white py-6 bg-gradient-to-r from-blue-500 to-purple-500 mt-4">
                                    Next <ArrowRight size={17} />
                                </button>
                            </form>
                        </div>
                        :
                        <JobPreview
                            data={previewData}
                            onEdit={() => setPreviewData(null)}
                            onPost={async () => {

                                const res = await axiosSecure.post('/api/jobs', previewData);
                                if (res.data.data.insertedId) {
                                    toast.success('Job post successful');
                                    reset();
                                    setPreviewData(null);
                                }
                            }}
                        >
                        </JobPreview>
                }
            </div>
        </Container>
    );
};

export default PostJob;