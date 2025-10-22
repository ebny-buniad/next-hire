import React from 'react';
import DashboardPageTitle from '../../../components/DashboardPageTitle/DashboardPageTitle';
import { useFieldArray, useForm } from 'react-hook-form';
import * as LucideIcons from "lucide-react";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const AddPlans = () => {
    const axiosSecure = useAxiosSecure();
    const iconList = ["Check", "Mail", "User", "Star", "Heart", "Bell", "Shield", "Cloud", "Lock",
        "MessageCircle", "BriefcaseBusiness", "BadgeCheck", "Headset", "Download"];
    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            name: "",
            price: "",
            features: [{ icon: "Check", text: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "features",
    });

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/api/plans', data);
            if (res.data.data.insertedId) {
                toast.success('Plan created')
            }
        }
        catch (error) {
            console.log(error)
        }
        reset();
    };

    const watchFeatures = watch("features");

    return (
        <div>
            <DashboardPageTitle>Create Subscription plan</DashboardPageTitle>

            <div className='grid xl:grid-cols-2 gap-10'>
                <div className='border border-gray-200 px-5 py-10 rounded-xl'>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        <h5 className='font-semibold text-gray-600'>Select plan for</h5>
                        <div className='grid grid-cols-2 gap-3'>
                            {/* Jobseeker Button */}
                            <label className='btn bg-transparent flex rounded-lg items-center justify-between py-6 cursor-pointer'>
                                <span className="text-sm font-medium text-gray-700">Jobseeker</span>
                                <input
                                {...register("role")}
                                    type="radio"
                                    value="jobseeker"
                                    className="radio radio-primary"
                                    defaultChecked
                                />
                            </label>

                            {/* Employer Button */}
                            <label className='btn bg-transparent flex rounded-lg items-center justify-between py-6 cursor-pointer'>
                                <span className="text-sm font-medium text-gray-700">Employer</span>
                                <input
                                    {...register("role")}
                                    type="radio"
                                    value="employer"
                                    className="radio radio-primary"
                                />
                            </label>
                        </div>

                        {/* Plan Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Plan Name
                            </label>
                            <input
                                {...register("name", { required: true })}
                                placeholder="e.g. Premium Plan"
                                className="w-full border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                            />
                        </div>

                        {/* Plan Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Plan Price ($)
                            </label>
                            <input
                                type="number"
                                {...register("price", { required: true })}
                                placeholder="e.g. 15"
                                className="w-full no-arrow border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                            />
                        </div>

                        {/* Plan Features */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Plan Features
                            </label>

                            <div className="space-y-3">
                                {fields.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3"
                                    >
                                        {/* Icon dropdown */}
                                        <select
                                            {...register(`features.${index}.icon`)}
                                            className="border border-gray-200 rounded-lg p-2 text-gray-700 focus:border-violet-500 focus:outline-none"
                                        >
                                            {iconList.map((icon) => (
                                                <option key={icon} value={icon}>
                                                    {icon}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Feature text */}
                                        <input
                                            {...register(`features.${index}.text`, { required: true })}
                                            placeholder="Feature description"
                                            className="flex-1 border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                                        />

                                        {/* Remove button */}
                                        {fields.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => append({ icon: "Check", text: "" })}
                                    className="px-4 py-3 mt-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200"
                                >
                                    + Add New Feature
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center pt-4">
                            <button
                                type="submit"
                                className="px-6 py-3 cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-norma"
                            >
                                Create Plan
                            </button>
                        </div>
                    </form>
                </div>

                {/* Live your plan details */}

                <div className='border border-gray-200 px-5 py-10 rounded-xl'>
                    <div className="">
                        <h3 className="text-xl font-bold mb-5 pb-2 border-b border-gray-200">
                            Preview
                        </h3>

                        <div className='space-y-3'>
                            <p className="text-xl font-semibold ">
                                Plan Name : {watch("name") || ""}
                            </p>
                            <p>
                                Plan Price : ${watch("price") || "0"}
                            </p>
                            <p className='font-semibold'>Plan features</p>
                        </div>


                        <ul className="space-y-2 mt-2">
                            {watchFeatures.map((f, i) => {
                                const Icon = LucideIcons[f.icon];
                                return (
                                    <li key={i} className="flex items-center gap-2 text-gray-700">
                                        {Icon && <Icon size={16} className="text-violet-500" />}
                                        <span>{f.text || "Feature description..."}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddPlans;