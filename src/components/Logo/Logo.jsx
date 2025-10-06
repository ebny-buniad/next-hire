import React from 'react';
import logoImg from '../../assets/next-logo.svg';
import { Link } from 'react-router';

const Logo = () => {
    return (
        
            <Link to='/' className='flex items-end'>
                <img className='w-26 h-11' src={logoImg} alt="Logo" />
                <span className='text-xl'>hire</span>
            </Link>
        
    );
};

export default Logo;