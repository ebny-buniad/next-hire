import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import { BadgeCheck, Brain, Eye, EyeOff, Lock } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const Settings = () => {

    const { user, emailVerified, setNewPassword } = useAuth();

    // Password visibility states
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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
    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const credential = EmailAuthProvider.credential(user?.email, data.oldPassword);
            const res = await reauthenticateWithCredential(user, credential);
            console.log(res);
            if (res.operationType === "reauthenticate") {
                console.log('Yaaa')
                setNewPassword(data.newPassword)
                    .then(() => {
                        toast.success("Password Change");
                    })
                    .catch((error) => {
                        console.log(error)
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
                                Security
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
                            <div className="transition-all duration-500 ease-in-out transform space-y-5">
                                <div className='shadow md:w-2xl p-3 rounded-xl space-y-2'>
                                    <h4 className='text-xl font-semibold mb-5 flex items-center gap-1'><BadgeCheck size={20} />Account Verification</h4>
                                    <p>
                                        {user.emailVerified === false && <p className='bg-red-100 text-[12px] inline-block text-red-600 py-1 px-3 rounded-full'>
                                            Your account is not verified
                                        </p>}
                                    </p>
                                    <button onClick={() => handelVerify()} className='btn mt- bg-violet-500 text-white
                                    rounded-full'>{user.emailVerified === true ? 'Verified' : 'Verify'}</button>
                                </div>

                                <div className='shadow md:w-2xl p-3 rounded-xl space-y-2'>
                                    <h4 className='text-xl font-semibold mb-5 flex items-center gap-1'><Lock size={20} />Change Password</h4>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        {/* Old Password */}
                                        <div className="relative">
                                            <label className="block text-sm font-medium mb-1">Old Password</label>
                                            <input
                                                type={showOld ? "text" : "password"}
                                                placeholder="Enter old password"
                                                {...register("oldPassword", { required: "Old password is required" })}
                                                className="input input-bordered w-full pr-10 border-gray-200"
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
                                                className="input input-bordered w-full pr-10 border-gray-200"
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
                                                className="input input-bordered w-full pr-10 border-gray-200"
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
                                        <button type="submit" className="btn bg-violet-500 text-white mt-3 px-10 rounded-full">
                                            Save
                                        </button>
                                    </form>
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
            </Container>
        </div>
    );
};

export default Settings;