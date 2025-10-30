import React from 'react';
import { Link, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Container from '../../components/Container/Container';
import { Building2, Calendar, Globe, MapPin, Phone, Users } from 'lucide-react';
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaTiktok, FaInstagram } from "react-icons/fa6";
import Loading from '../../components/Loading/Loading';

const ViewCompanyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { company_Name } = useParams();
    const { data: companyInfo = {}, isPending } = useQuery({
        queryKey: ['view-company-details', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/api/company?companyName=${company_Name}`);
            return res.data.data;
        }
    })

    if(isPending){
        return <Loading></Loading>
    }

    const { companyName, logo, banner, about, website, socialLinks, size, industry, founded, address, phone } = companyInfo || {};

    return (
        <div className='pt-22'>
            <Container>
                <div className='shadow-md p-5 pb-15 mb-10 rounded-xl'>
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
                                    <MapPin size={22} /> <span><strong>Address:</strong> {address}</span>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-5 flex items-center gap-4 text-gray-600 border-b pb-5 border-gray-200">
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
                </div>
            </Container>
        </div>
    );
};

export default ViewCompanyProfile;