import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import { SquarePen, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import CompanyInfo from './CompanyInfo';
import Swal from 'sweetalert2';

const CompanyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const Navigate = useNavigate();
    const { data: companyInfo = {}, isPending } = useQuery({
        queryKey: ['company-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/company?email=${user?.email}`);
            return res.data.data
        }
    })

    if (isPending) {
        return <Loading></Loading>
    }

    const handelProfileDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/api/company?email=${user?.email}`);
                if (res.data.data.deletedCount === 1) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    setTimeout(() => {
                        Navigate('/dashboard/create-company-profile');
                    }, 1500);
                }
            }
        });
    }

    return (
        <div>
            {companyInfo === null ?
                <div className="flex flex-col h-[97.7vh] items-center justify-center text-center py-16 px-6
             bg-gray-50 rounded-lg border border-gray-200">
                    <img
                        src="https://static.wixstatic.com/media/59f3f9_3deb69f20ae640b68f61a78728104e7a~mv2.png/v1/fill/w_568,h_320,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/59f3f9_3deb69f20ae640b68f61a78728104e7a~mv2.pngg"
                        alt="No company profile"
                        className="w- mb-6"
                    />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        You don’t have a company profile yet
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-md">
                        Create your company profile to represent your business and attract the right candidates.
                    </p>
                    <Link to="/dashboard/create-company-profile"
                        className='btn bg-gradient-to-r from-blue-500 to-purple-500 py-6 px-10 rounded-full font-normal text-white'
                    >Create company profile</Link>
                </div>
                :
                <CompanyInfo companyInfo={companyInfo}></CompanyInfo>
            }

            {
                companyInfo && <div className='flex justify-center gap-3 mt-15'>
                    <Link to='/dashboard/update-company-profile' className='btn border-0 rounded-full text-white bg-violet-500
                font-normal'><SquarePen size={15} />Edit Profile</Link>
                    <button onClick={() => handelProfileDelete()} className='btn border-0 rounded-full text-white bg-sky-500
                font-normal'><Trash2 size={15} />Delete Profile</button>
                </div>
            }
        </div>
    );
};

export default CompanyProfile;