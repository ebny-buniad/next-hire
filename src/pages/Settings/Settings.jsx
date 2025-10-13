import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import { BadgeCheck, Brain, Eye, EyeOff, Lock, Trash } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import deleteGif from '../../assets/delete.gif'

const Settings = () => {
    const { user, emailVerified, setNewPassword, deleteUserAccount } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Password visibility states
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // User email account verify
    const handelVerify = () => {
        emailVerified()
            .then(() => {
                toast.success("Verification email sent successfully!");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to send verification email!");
            });
    };

    const { register, handleSubmit, formState: { errors }, watch, setError } = useForm();
    const { register: deleteRegister, handleSubmit: handleDeleteSubmit,
        formState: { errors: deleteErrors }, setError: deleteSetError } = useForm();
    const newPassword = watch("newPassword");

    // Change old password
    const handelChangePass = async (data) => {
        try {
            const credential = EmailAuthProvider.credential(user?.email, data.oldPassword);
            const res = await reauthenticateWithCredential(user, credential);
            if (res.operationType === "reauthenticate") {
                setNewPassword(data.newPassword)
                    .then(() => {
                        toast.success("Password Change");
                    })
                    .catch(() => {
                    })
            }
        } catch (error) {
            if (error) {
                setError("oldPassword", {
                    type: "manual",
                    message: "Password doesn't match with old password",
                });
            }
        }
    };

    // Delete account 
    const handelDelete = async (data) => {
        try {
            const credential = EmailAuthProvider.credential(user?.email, data.existPass);
            const res = await reauthenticateWithCredential(user, credential);
            if (res.operationType === "reauthenticate") {
                deleteUserAccount()
                    .then(async () => {
                        const res = await axiosSecure.delete(`http://localhost:3000/api/users?email=${user.email}`);
                        if (res.data.data.profileDelete.deletedCount === 1 ||
                            res.data.data.userDelete.deletedCount === 1
                        ) {
                            toast.success("Account Deleted")
                        }
                    })
                    .catch(() => {
                    })
            }
        } catch (error) {
            if (error) {
                deleteSetError("existPass", {
                    type: "manual",
                    message: "Your password is wrong!",
                });
            }
        }
    }

    return (
        <div className='py-15 text-gray-600'>
            <Container>
                <div className='mt-10 mb-5'>
                    <h3 className='flex items-center gap-4 text-2xl text-gray-600'><Brain size={20} />Settings</h3>
                </div>

                <div>
                    <Tabs>
                        {/* Tab List */}
                        <TabList className="flex border-b border-gray-200 mb-6">
                            <Tab
                                className="px-6 py-3 text-gray-600 cursor-pointer transition-all duration-300 hover:text-purple-600"
                                selectedClassName="text-purple-600 font-semibold border-b-1 border-purple-600"
                            >
                                Account
                            </Tab>
                            <Tab
                                className="px-6 py-3 text-gray-600 cursor-pointer transition-all duration-300 hover:text-purple-600"
                                selectedClassName="text-purple-600 font-semibold border-b-1 border-purple-600"
                            >
                                Plans & Billings
                            </Tab>
                            <Tab
                                className="px-6 py-3 text-gray-600 cursor-pointer transition-all duration-300 hover:text-purple-600"
                                selectedClassName="text-purple-600 font-semibold border-b-1 border-purple-600"
                            >
                                Notifications
                            </Tab>
                        </TabList>

                        {/* Tab Panels */}
                        <TabPanel>
                            <div className="transition-all duration-500 ease-in-out transform space-y-10">
                                <div className='shadow md:w-2xl p-3 rounded-xl space-y-2'>
                                    <h4 className='text-xl font-semibold mb-5 flex items-center gap-1'><BadgeCheck size={20} />Account Verification</h4>
                                    <p>
                                        {user.emailVerified === false && <span className='bg-red-100 text-[12px] inline-block text-red-600 py-1 px-3 rounded-full'>
                                            Your account is not verified
                                        </span>}
                                    </p>
                                    <button onClick={() => handelVerify()} className='btn px-5 bg-violet-500 text-white
                                    rounded-full'>{user.emailVerified === true ? 'Verified' : 'Verify'}</button>
                                </div>

                                <div className='shadow md:w-2xl p-3 rounded-xl space-y-2'>
                                    <h4 className='text-xl font-semibold mb-5 flex items-center gap-1'><Lock size={20} />Change Password</h4>
                                    <form onSubmit={handleSubmit(handelChangePass)} className="space-y-4">
                                        {/* Old Password */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium mb-1">Old Password</label>
                                            <input
                                                type={showOld ? "text" : "password"}
                                                placeholder="Enter old password"
                                                {...register("oldPassword", { required: "Old password is required" })}
                                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowOld(!showOld)}
                                                className="absolute right-3 top-[30px] text-gray-500"
                                            >
                                                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                            {errors.oldPassword && (
                                                <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
                                            )}
                                        </div>

                                        {/* New Password */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium mb-1">New Password</label>
                                            <input
                                                type={showNew ? "text" : "password"}
                                                placeholder="Enter new password"
                                                {...register("newPassword", {
                                                    required: "New password is required",
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password must be at least 6 characters",
                                                    },
                                                })}
                                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNew(!showNew)}
                                                className="absolute right-3 top-[30px] text-gray-500"
                                            >
                                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                            {errors.newPassword && (
                                                <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                                            )}
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                                            <input
                                                type={showConfirm ? "text" : "password"}
                                                placeholder="Retype new password"
                                                {...register("confirmPassword", {
                                                    required: "Please confirm your password",
                                                    validate: (value) =>
                                                        value === newPassword || "Passwords do not match",
                                                })}
                                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                                className="absolute right-3 top-[30px] text-gray-500"
                                            >
                                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                            {errors.confirmPassword && (
                                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button type="submit" className="btn bg-violet-500 text-white mt-3 px-5 rounded-full">
                                            Save
                                        </button>
                                    </form>
                                </div>

                                <div className='shadow md:w-2xl p-3 rounded-xl space-y-2'>
                                    <h4 className='text-xl font-semibold mb-5 flex items-center gap-1'><Trash size={20} />Delete Account</h4>

                                    <button className="btn rounded-full bg-violet-500 text-white px-5"
                                        onClick={() => document.getElementById('delete_account').showModal()}>Delete</button>
                                </div>

                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="transition-all duration-500 ease-in-out transform">
                                <h2 className="text-xl font-semibold text-purple-700 mb-3">
                                    Security Settings
                                </h2>
                                <p className="text-gray-600">
                                    Update your password, 2FA, and security preferences.
                                </p>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="transition-all duration-500 ease-in-out transform">
                                <h2 className="text-xl font-semibold text-purple-700 mb-3">
                                    Notification Settings
                                </h2>
                                <p className="text-gray-600">
                                    Manage email and push notification preferences.
                                </p>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>


                <dialog id="delete_account" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <img className='w-20 mx-auto' src={deleteGif} alt="" />
                        <h3 className='mb-10 mt-2  text-center font-semibold text-red-500'>Delete your "next hire" account</h3>
                        <form onSubmit={handleDeleteSubmit(handelDelete)}>
                            <div className="relative">
                                <label className="block text-sm font-medium mb-1">Your Password</label>
                                <input
                                    type={showOld ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...deleteRegister("existPass", { required: "Password is required" })}
                                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOld(!showOld)}
                                    className="absolute right-3 top-[30px] text-gray-500"
                                >
                                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                {deleteErrors.existPass && (
                                    <p className="text-red-500 text-sm mt-1">{deleteErrors.existPass.message}</p>
                                )}
                            </div>

                            <button type="submit" className="btn bg-violet-500 text-white mt-3 px-5 rounded-full">
                                Delete
                            </button>
                        </form>
                    </div>
                </dialog>
            </Container>
        </div>
    );
};

export default Settings;