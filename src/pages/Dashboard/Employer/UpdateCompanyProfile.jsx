import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import axios from 'axios';
import { Plus, Trash2, Upload } from "lucide-react";
import DashboardPageTitle from '../../../components/DashboardPageTitle/DashboardPageTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import toast from 'react-hot-toast';

const UpdateCompanyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const Navigate = useNavigate();

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialLinks",
    });

    // Load Company Data
    const { data: companyInfo = {}, isLoading } = useQuery({
        queryKey: ['company-profile-info', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/company?email=${user?.email}`);
            return res.data.data;
        }
    });

    const { companyName, about, website, size, industry, founded, address, phone } = companyInfo;

    if (isLoading) {
        return <Loading></Loading>
    }

    //  Handle ImgBB Upload
    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageBB}`,
                formData
            );
            const imageUrl = res.data.data.url;
            if (field === "logo") setLogoPreview(imageUrl);
            if (field === "banner") setBannerPreview(imageUrl);
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const onSubmit = async (data) => {
        const companyInfo = {
            ...data,
            logo: logoPreview,
            banner: bannerPreview,
        };
        try {
            const res = await axiosSecure.put(`/api/company?email=${user?.email}`, companyInfo);
            console.log('Data', res.data.data)
            if (res.data.data.modifiedCount === 1) {
                toast.success('Profile updated');
                reset();
                setTimeout(() => {
                    Navigate('/dashboard/company-profile');
                }, 1500);
            }
        }
        catch (error) {
            if (error.status === 409) {
                toast.error('Already created')
            }
        }
    };

    return (
        <div className='max-w-5xl mx-auto'>
            <DashboardPageTitle>Update Company Profile</DashboardPageTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border border-gray-200 px-5 py-10 rounded-xl">
                {/* Company Name */}
                <div>
                    <label className="block font-medium mb-1">Company Name</label>
                    <input
                        defaultValue={companyName}
                        {...register("companyName", { required: "Company name is required" })}
                        className="w-full border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                        placeholder="Enter company name"
                    />
                    {errors.companyName && (
                        <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                    )}
                </div>

                {/* About */}
                <div>
                    <label className="block font-medium mb-1">About</label>
                    <textarea
                        defaultValue={about}
                        {...register("about", { required: "About section is required" })}
                        className="textarea textarea-bordered w-full border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                        rows="4"
                        placeholder="Describe your company"
                    ></textarea>
                    {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
                </div>

                {/* Founded, Website, Industry, Size */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Founded</label>
                        <input
                            defaultValue={founded}
                            type="number"
                            {...register("founded", { required: "Founded year required" })}
                            className="no-arrow w-full border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                            placeholder="e.g. 2015"
                        />
                        {errors.founded && (
                            <p className="text-red-500 text-sm">{errors.founded.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Website</label>
                        <input
                            defaultValue={website}
                            type="url"
                            {...register("website", { required: "Website URL required" })}
                            className="w-full border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                            placeholder="https://example.com"
                        />
                        {errors.website && (
                            <p className="text-red-500 text-sm">{errors.website.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Industry</label>
                        <input
                            defaultValue={industry}
                            {...register("industry", { required: "Industry required" })}
                            className="w-full border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                            placeholder="e.g. Software, Finance"
                        />
                        {errors.industry && (
                            <p className="text-red-500 text-sm">{errors.industry.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Employees Size</label>
                        <input
                            defaultValue={size}
                            {...register("size", { required: "Employees size required" })}
                            className="w-full border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                            placeholder="e.g. 50-200"
                        />
                        {errors.size && (
                            <p className="text-red-500 text-sm">{errors.size.message}</p>
                        )}
                    </div>
                </div>

                {/* Phone & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Phone</label>
                        <input
                            defaultValue={phone}
                            {...register("phone", { required: "Phone number required" })}
                            className="w-full border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                            placeholder="e.g. +8801XXXXXXXXX"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Address</label>
                        <input
                            defaultValue={address}
                            {...register("address", { required: "Address required" })}
                            className="w-full border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none"
                            placeholder="e.g. Banani, Dhaka, Bangladesh"
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                    </div>
                </div>

                {/* Logo & Banner Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Logo */}
                    <div>
                        <label className="block font-medium mb-1">Company Logo</label>
                        <input
                            {...register("logo", { required: "Logo required" })}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "logo")}
                            className="file-input file-input-bordered w-full focus:border-violet-500 focus:outline-none"
                        />
                        {errors.logo && (
                            <p className="text-red-500 text-sm">{errors.logo.message}</p>
                        )}
                    </div>

                    {/* Banner */}
                    <div>
                        <label className="block font-medium mb-1">Company Banner</label>
                        <input
                            {...register("banner", { required: "Banner required" })}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "banner")}
                            className="file-input file-input-bordered w-full focus:border-violet-500 focus:outline-none"
                        />
                        {errors.banner && (
                            <p className="text-red-500 text-sm">{errors.banner.message}</p>
                        )}
                    </div>
                </div>

                {/* Social Links Section */}
                <div>
                    <label className="block font-medium mb-2">Social Links</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-3 mb-2">
                            <select
                                {...register(`socialLinks.${index}.platform`, { required: "Platform required" })}
                                className="select border border-gray-200 rounded-lg focus:border-violet-500 focus:outline-none">
                                <option value="">Select social site</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Linkedin">Linkedin</option>
                                <option value="X">X (Twitter)</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Tiktok">Tiktok</option>
                            </select>
                            <input
                                {...register(`socialLinks.${index}.url`, { required: "URL required" })}
                                className="border border-gray-200 rounded-lg p-2 focus:border-violet-500 focus:outline-none w-2/3"
                                placeholder="https://facebook.com/yourpage"
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="btn btn-error btn-sm text-white"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ platform: "", url: "" })}
                        className="btn border-0 font-normal text-white rounded-full bg-violet-500 mt-5 flex items-center gap-1"
                    >
                        <Plus size={16} /> Add Link
                    </button>
                </div>

                {/* Submit */}
                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="px-6 py-3 cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-norma"
                    >
                        Create Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCompanyProfile;