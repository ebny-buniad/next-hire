import React from 'react';
import Container from '../../components/Container/Container';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Loading from '../../components/Loading/Loading';
import { Link, Outlet } from 'react-router';
import { useForm } from 'react-hook-form';
import { FileUser } from 'lucide-react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import toast from 'react-hot-toast';

const Profile = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isPending } = useQuery({
        queryKey: ['account-data', user?.email],
        queryFn: async () => {
            const [A_CRes, profileRes] = await Promise.all([
                axiosSecure.get(`/api/users?email=${user?.email}`),
                axiosSecure.get(`/api/profiles?email=${user?.email}`)
            ]);
            return {
                accountDetails: A_CRes?.data,
                profileDetails: profileRes?.data
            }
        }
    })
    const AC_details = data?.accountDetails;
    const profile_Details = data?.profileDetails?.data;

    if (isPending) {
        return <Loading></Loading>
    }

    const { name, email, role, photoURL } = AC_details;
    const { phone, country, address, education, experience, linkedin } = profile_Details || {};

    const onSubmit = async (data) => {
        const profileInfo = { ...data, email };

        if (profile_Details) {
            try {
                const res = await axiosSecure.put(`/api/profiles?email=${user?.email}`, profileInfo);
                console.log(res.data);
                if (res.data.modifiedCount === 1) {
                    toast.success("Update successful");
                }
            }
            catch (error) {
                if (error.response?.status === 409) {
                    toast.error("Already created");
                }
            }
        } else {
            try {
                const res = await axiosSecure.post('/api/profiles', profileInfo);
                if (res.data?.result?.insertedId) {
                    toast.success("Created successful");
                }
            } catch (error) {
                if (error.response?.status === 409) {
                    toast.error("Already created");
                }
            }
        }
    };


    return (
        <div className='py-15'>
            <Container>
                <div className='pt-10'>
                    <div className="h-20 rounded-t-2xl bg-gradient-to-r from-blue-200 via-red-100 to-amber-100"></div>
                </div>

                <div className='mt-5 grid lg:grid-cols-4 gap-10'>
                    <div className='flex flex-col items-center text-center gap-6  shadow rounded-2xl pb-5'>
                        <img className='w-26 rounded-full mt-5 border-2 border-dotted border-purple-500 p-1'
                            alt="profile"
                            src={photoURL ? photoURL : 'https://img.freepik.com/free-photo/portrait-3d-male-doctor_23-2151107071.jpg'} />
                        <div className='space-y-1'>
                            <h3 className='text-xl font-semibold'>{name}</h3>
                            <p className='text-gray-500'>{email}</p>
                            <p className='text-gray-500 uppercase'>{role}</p>
                        </div>
                    </div>
                    <div className='lg:col-span-3 shadow p-5 rounded-2xl'>
                        <h3 className='mb-8 font-semibold text-xl flex items-center gap-1 text-gray-500'><FileUser size={20} />{profile_Details ? 'Update Information' : 'Add Information'}</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block font-medium">Name*</label>
                                <input
                                    defaultValue={name}
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className="input input-bordered w-full border-0 bg-gray-100 py-6"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block font-medium">Phone Number*</label>
                                <input
                                    type="number"
                                    defaultValue={phone}
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10,15}$/,
                                            message: "Enter a valid phone number",
                                        },
                                    })}
                                    className="input input-bordered w-full no-arrow border-0 bg-gray-100 py-6"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block font-medium">Country*</label>
                                <input
                                    defaultValue={country}
                                    type="text"
                                    {...register("country", { required: "Country is required" })}
                                    className="input input-bordered w-full border-0 bg-gray-100 py-6"
                                />
                                {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block font-medium">Address*</label>
                                <input
                                    defaultValue={address}
                                    {...register("address", { required: "Address is required" })}
                                    className="input input-bordered w-full border-0 bg-gray-100 py-6"
                                />
                                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                            </div>

                            {/* Last Education */}
                            <div>
                                <label className="block font-medium">Last Education*</label>
                                <input
                                    defaultValue={education}
                                    type="text"
                                    {...register("education", { required: "Last education is required" })}
                                    className="input input-bordered w-full border-0 bg-gray-100 py-6"
                                />
                                {errors.education && <p className="text-red-500 text-sm">{errors.education.message}</p>}
                            </div>

                            {/* Job Experience */}
                            <div>
                                <label className="block font-medium">Job Experience*</label>
                                <input
                                    defaultValue={experience}
                                    type="number"
                                    {...register("experience", { required: "Job experience is required" })}
                                    className="input input-bordered w-full no-arrow border-0 bg-gray-100 py-6"
                                />
                                {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                            </div>


                            {/* LinkedIn Profile */}
                            <div>
                                <label className="block font-medium">LinkedIn Profile Link*</label>
                                <input
                                    defaultValue={linkedin}
                                    type="url"
                                    {...register("linkedin", {
                                        required: "LinkedIn profile link is required",
                                        pattern: {
                                            value: /^https?:\/\/.+$/,
                                            message: "Enter a valid URL",
                                        },
                                    })}
                                    className="input input-bordered w-full border-0 bg-gray-100 py-6"
                                />
                                {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin.message}</p>}
                            </div>

                            {/* Resume Drive Link */}

                            <div>
                                <label className="block font-medium">Upload Resume</label>
                                <FileUploaderRegular
                                    sourceList='local'
                                    classNameUploader='uc-light'
                                    pubkey="b57373d6cff3b596af10"
                                    onFileUploadSuccess={(fileInfo) => {
                                        setValue('resume', fileInfo.cdnUrl)
                                    }}
                                    checkForUrlDuplicates={true}
                                    multiple={false}
                                >
                                </FileUploaderRegular>
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block font-medium mb-1">Gender*</label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="male"
                                            {...register("gender", { required: "Gender is required" })}
                                            className="radio radio-primary"
                                        />
                                        Male
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            value="female"
                                            {...register("gender", { required: "Gender is required" })}
                                            className="radio radio-primary"
                                        />
                                        Female
                                    </label>
                                </div>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="md:col-span-2">
                                <button type="submit" className="btn text-white py-5 bg-gradient-to-r from-blue-500 to-purple-500">
                                    {profile_Details ? 'Update Info' : 'Submit Info'}
                                </button>
                            </div>
                        </form>


                    </div>
                </div>

            </Container >
        </div>
    );
};

export default Profile;