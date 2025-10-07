import React from 'react';
import { Link, NavLink } from 'react-router';
import Container from '../Container/Container';
import { motion } from 'framer-motion';
import Logo from '../Logo/Logo';
import useAuth from '../../hooks/useAuth';
import { Headset, LayoutDashboard, LogOut, Settings, UserRoundPen } from 'lucide-react';


const Header = () => {
    const { user } = useAuth();
    const links = <>
        <li><NavLink to='/find-jobs'>Find Jobs</NavLink></li>
        <li><NavLink to='/for-employers'>For Employers</NavLink></li>
    </>
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='backdrop-blur-sm shadow-sm fixed w-full z-50'
        >
            <Container>
                <div className="navbar px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                            >
                                {links}
                            </ul>
                        </div>
                        <Logo></Logo>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>

                    <div className='navbar-end gap-3'>
                        {
                            user ? <>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-17 rounded-md">
                                            <img
                                                alt="profile"
                                                src={user.photoURL ? user.photoURL : 'https://img.freepik.com/free-photo/portrait-3d-male-doctor_23-2151107071.jpg'} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-5 w-62 p-3 shadow">
                                        <div className='flex gap-2 border-b border-gray-300 pb-2'>
                                            <img className='w-14 rounded-md'
                                                alt="profile"
                                                src={user.photoURL ? user.photoURL : 'https://img.freepik.com/free-photo/portrait-3d-male-doctor_23-2151107071.jpg'} />
                                            <div>
                                                <p className='text-xl font-semibold'>{user.displayName}</p>
                                                <Link className='text-white text-xs p-1 rounded bg-violet-500  items-center gap-2 justify-center inline-block'>Edit Profile</Link>
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-2 mt-3">
                                            <Link to="/profile" className="flex items-center gap-2">
                                                <UserRoundPen size={14} /> Profile
                                            </Link>
                                            <Link to="/dashboard" className="flex items-center gap-2">
                                                <LayoutDashboard size={14} /> Dashboard
                                            </Link>
                                            <Link to="/settings" className="flex items-center gap-2">
                                                <Settings size={14} /> Settings
                                            </Link>
                                            <Link to="/support" className="flex items-center gap-2">
                                                <Headset size={14} /> Support
                                            </Link>
                                            <hr className="border-t border-gray-300 my-2" />

                                            <button className="flex items-center gap-2 text-left">
                                                <LogOut size={14} /> Log out
                                            </button>
                                        </div>


                                    </ul>
                                </div>
                            </> : <>
                                <div>
                                    <Link to='/auth/login' className=''>Login</Link>
                                    <Link to='/auth/signup'
                                        className='px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:text-black transition transform'>
                                        Sign Up
                                    </Link>
                                </div>
                            </>
                        }
                    </div>









                </div>
            </Container>
        </motion.div>
    );
};

export default Header;