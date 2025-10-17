import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Briefcase } from 'lucide-react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';

const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth();
    const [fbError, setFbError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const selectedRole = watch("role");
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { name, email, role, password } = data;
        const userInfo = {
            name,
            email,
            role,
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            photoURL: "",
        }
        createUser(email, password)
            .then(async () => {
                // Update user profile
                const userProfile = {
                    displayName: name,
                }
                updateUserProfile(userProfile);

                // Send user info in DB
                const res = await axiosInstance.post('/api/users', userInfo);
                if (res.data.user.insertedId) {
                    navigate('/')
                }
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setFbError(true);
                }
            });
    }

    return (
        <div>
            <div className='hero-bg h-[100vh] flex justify-center items-center'>
                <div className='w-[420px] px-6 py-5 space-y-1 bg-white rounded-2xl border border-gray-200'>
                    <p className='inline-block px-2 py-1 rounded-full bg-violet-500 ms-2 mt-2'>
                        <Link to='/' className='flex items-center gap-1 text-[14px] text-white'>
                            <ArrowLeft size={16} />Back</Link>
                    </p>

                    <div className='flex justify-center my-5'>
                        <Logo></Logo>
                    </div>
                    <h3 className='text-center font-bold text-xl text-gray-600'>Create an account</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-medium">Name*</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium">Email*</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", { required: "Email is required" })}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-1 font-medium">Password*</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter a strong password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters'
                                        },
                                        // pattern: {
                                        //     value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                        //     message: "Password must contain at least one uppercase, one number, and one special character",
                                        // }
                                    })}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <p className="font-medium">I am a *</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Job Seeker Card */}
                            <label
                                className={`cursor-pointer border rounded-xl  gap-2 transition flex flex-col items-center py-4
                                ${selectedRole === "jobseeker" ? "border-violet-500 shadow-lg" : "border-gray-300"}`}
                            >
                                <input
                                    type="radio"
                                    value="jobseeker"
                                    {...register("role", { required: true })}
                                    className="hidden"
                                />
                                <User size={24} className="text-violet-600" />
                                <p className="font-semibold">Job Seeker</p>
                                <p className="text-sm text-gray-500">Looking for opportunities</p>
                            </label>

                            {/* Employer Card */}
                            <label
                                className={`cursor-pointer border rounded-xl gap-2 transition flex flex-col items-center py-4
                                ${selectedRole === "employer" ? "border-violet-500 shadow-lg" : "border-gray-300"}`}
                            >
                                <input
                                    type="radio"
                                    value="employer"
                                    {...register("role", { required: true })}
                                    className="hidden"
                                />
                                <Briefcase size={24} className="text-violet-600" />
                                <p className="font-semibold">Employer</p>
                                <p className="text-sm text-gray-500">Hiring talent</p>
                            </label>
                        </div>


                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="text-white w-full cursor-pointer bg-gradient-to-br from-violet-500 to-blue-500 hover:bg-gradient-to-bl rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Sign Up
                        </button>
                    </form>
                    {fbError && <p className='text-xs text-red-400'>This email alredy registred</p>}
                    <p className="text-center text-sm text-gray-600 mt-5">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-primary hover:underline">
                            Sign in here
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default SignUp;