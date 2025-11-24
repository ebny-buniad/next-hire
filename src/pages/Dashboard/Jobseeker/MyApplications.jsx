import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const MyApplications = ({ onFilter }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const { data: myApplications = {}, isPending } = useQuery({
        queryKey: ['my-application', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/applications?email=${user?.email}`);
            return res.data.data;
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ search, category, status });
    };

    if (isPending) {
        return <Loading></Loading>
    }

    console.log(myApplications)


    return (
        <div>
            <h3 className='text-2xl font-bold my-5 text-gray-600'>My applications</h3>

            <div>
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
            </div>

            {/* My applications list */}

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Companay Name</th>
                            <th>Job Title</th>
                            <th>Applied</th>
                            <th>Position</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            myApplications.map((application, idx) => {
                                const { _id, jobTitle, companyInfo, appliedAt, jobLevel, status } = application;
                                return (
                                    <tr key={_id}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={`${companyInfo[0].logo}`}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{companyInfo[0].companyName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{jobTitle}</td>
                                        <td>
                                            {new Date(appliedAt).toLocaleString()}
                                        </td>
                                        <td>{jobLevel} Level</td>
                                        <td className='uppercase'>{status}</td>
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

export default MyApplications;