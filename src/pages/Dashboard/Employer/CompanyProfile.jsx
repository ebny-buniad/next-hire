import React from 'react';
import { Link, Navigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import { SquarePen, Globe, Phone, MapPin, Building2, Users, Calendar } from 'lucide-react';
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaTiktok, FaInstagram } from "react-icons/fa6";


import Container from '../../../components/Container/Container';

const CompanyProfile = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: companyInfo = {}, isPending } = useQuery({
        queryKey: ['company-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/company?email=${user?.email}`);
            return res.data
        }
    })

    if (isPending) {
        return <Loading></Loading>
    }

    console.log(companyInfo);
    const { companyName, logo, banner, about, website, socialLinks, size, industry, founded, address, phone } = companyInfo


    return (
        <div>
            {
                !companyInfo && <>
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
                </>
            }

            <div className='flex justify-end py-5'>
                <Link to='/' className='btn border-0 rounded-full text-white bg-violet-500
                font-normal'><SquarePen size={15} />Edit Profile</Link>
            </div>
            <div>
                <Container>
                    <div className="relative w-full h-68">
                        <img
                            src={banner}
                            alt="Company Banner"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute -bottom-12 left-10">
                            <div>
                                <img className='rounded-full w-26 h-26 border-4 border-white object-cover' src={logo} alt="" />
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-6xl mx-auto mt-12">
                        <h1 className="text-3xl font-bold text-gray-800 mt-15 mb-5">{companyName}</h1>

                        {/* About Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-2">About Us</h2>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                {about}
                            </p>
                        </div>

                        {/* Company Details */}
                        <div className="">
                            <h2 className="text-xl font-semibold mb-4">Company Details</h2>
                            <div className="grid md:grid-cols-2 gap-4 text-gray-700 border-b pb-5 border-gray-200">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> <span><strong>Founded Year:</strong> {founded}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4" /> <span><strong>Website:</strong> <Link className='underline' target='_blank' to={website}>{website}</Link></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" /> <span><strong>Industry:</strong> {industry}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" /> <span><strong>Company Size:</strong> {size} employees</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> <span><strong>Phone:</strong> {phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} /> <span><strong>Address:</strong> {address}</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-5 flex items-center gap-4 text-gray-600">
                                <span className="font-semibold">Social Links:</span>
                                <div className="flex gap-3">
                                    {
                                        socialLinks.map((social, index) => {
                                            return <div key={index}>

                                                {social.platform === 'Facebook' && <Link target='_blank' to={`${social.url}`}>
                                                    <FaFacebookF /></Link>}
                                                {social.platform === 'Linkedin' && <Link target='_blank' to={`${social.url}`}>
                                                    <FaLinkedinIn /></Link>}
                                                {social.platform === 'X' && <Link target='_blank' to={`${social.url}`}>
                                                    <FaXTwitter /></Link>}
                                                {social.platform === 'Instagram' && <Link target='_blank' to={`${social.url}`}>
                                                    <FaInstagram /></Link>}
                                                {social.platform === 'Tiktok' && <Link target='_blank' to={`${social.url}`}>
                                                    <FaTiktok /></Link>}

                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default CompanyProfile;