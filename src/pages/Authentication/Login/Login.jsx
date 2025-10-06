import React, { useState } from 'react';
import { Link } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className='hero-bg h-[100vh] flex justify-center items-center'>
            <div className='w-[420px] px-6 py-5 space-y-1 bg-white rounded-2xl border border-gray-200'>
                <p className='inline-block px-2 py-1 rounded-full bg-violet-500 ms-2 mt-2'>
                    <Link to='/' className='flex items-center gap-1 text-[14px] text-white'>
                        <ArrowLeft size={16} />Back</Link>
                </p>

                <div className='flex justify-center my-5'>
                    <Logo></Logo>
                </div>

                <p className='text-gray-500 text-center'>Please, Sign in to your JobPortal account</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
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
                        <label className="block mb-1 font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="text-white w-full cursor-pointer bg-gradient-to-br from-violet-500 to-blue-500 hover:bg-gradient-to-bl rounded-md px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Login
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div>
                    <button className='w-full border border-gray-300 
                    flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer hover:border-violet-500 transition'><FcGoogle size={20} />Login with Google</button>
                </div>


                <p className="text-center text-sm text-gray-600 mt-10">
                    Don’t have an account?{" "}
                    <Link to="/auth/signup" className="text-primary hover:underline">
                        Create an account
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;