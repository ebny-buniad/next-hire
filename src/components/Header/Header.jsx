import React from 'react';
import logo from '../../assets/next-logo.svg'
import { Link, NavLink } from 'react-router';
import Container from '../Container/Container';
import { motion } from 'framer-motion';


const Header = () => {
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
                        <Link className='flex items-end'>
                            <img className='w-26 h-11' src={logo} alt="Logo" />
                            <span className='text-xl'>hire</span>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>

                    <div className="navbar-end gap-3">
                        <Link to='' className=''>Login</Link>
                        <Link to=''
                            className='px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:text-black transition transform'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </Container>
        </motion.div>
    );
};

export default Header;