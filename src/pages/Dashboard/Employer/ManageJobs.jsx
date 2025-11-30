import React, { useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';

const ManageJobs = ({ onFilter }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    // Load posted jobs
    const { data: myPostJobs = {}, isPending } = useQuery({
        queryKey: ['my-posted-jobs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/applications?employerEmail=${user?.email}`);
            return res.data.data
        }
    })

    console.log(myPostJobs)
    if (isPending) {
        return <Loading></Loading>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ search, category, status });
    };

    return (
        <div>
            <div className='flex justify-between items-center my-5'>
                <div className='space-y-3'>
                    <h3 className='text-2xl font-semibold'>Job Management</h3>
                    <p>Manage your job posting and track application</p>
                </div>
                <Link to='/dashboard/post-job' className='btn bg-blue-500 text-white px-10 py-6 font-normal rounded-2xl'>Add New Job</Link>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded-xl shadow-md  mb-6"
            >

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    {/* Search Field */}
                    <input
                        type="text"
                        placeholder="Search by job title..."
                        className="col-span-2 w-full border border-gray-200 rounded-lg p-3 focus:border-violet-500 focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Category Dropdown */}
                    <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Management">Management</option>
                    </select>

                    {/* Status Dropdown */}
                    <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    {/* Filter Button */}
                    <button className="btn bg-linear-to-r from-violet-500 to-blue-500 text-white py-6" type="submit">
                        Search
                    </button>

                </div>
            </form>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>JOB TITLE</th>
                            <th>STATUS</th>
                            <th>APPLICANTS</th>
                            <th>JOB LEVEL</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            myPostJobs.map((application, idx) => {
                                const { _id, jobTitle, appliedAt, jobLevel, jobStatus } = application;
                                return (
                                    <tr key={_id}>
                                        <td>{idx + 1}</td>
                                        <td className='font-semibold'>{jobTitle}</td>
                                        <td className='uppercase'>{jobStatus === 'active' ?
                                            <span className='bg-green-200 px-4 py-1 rounded-full border-green-300 border'>{`${jobStatus}`}
                                            </span> : <span className='bg-red-200 px-4 py-1 rounded-full border-red-300 border'>{jobStatus}</span>}</td>
                                        <td>
                                            {new Date(appliedAt).toLocaleString()}
                                        </td>
                                        <td>{jobLevel}</td>

                                    </tr>
                                )
                            })
                        }



                    </tbody>

                </table>
            </div>


        </div>
    );
};

export default ManageJobs;