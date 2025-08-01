import { Building2, MoveRight, Search, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

const heroStats = [
    { icon: Users, lable: 'Active User', value: '2.4M+' },
    { icon: Building2, lable: 'Companies', value: '50K+' },
    { icon: TrendingUp, lable: 'Jobs Posted', value: '150K+' }
]

const Hero = () => {
    return (
        <section className='min-h-[90vh] flex items-center justify-center x'>
            <div className='space-y-6'>
                <div className="text-center mt-40">
                    <motion.h1
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className='text-4xl lg:text-5xl xl:text-6xl font-bold'
                    >
                        Find Your Dream Job or
                        <span className='block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                            Perfect Hire
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className='leading-relaxed text-center mt-4'
                    >
                        Connect talented professionals with innovative companies. Your next career <br />
                        move or Perfect candidate is just one click away.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    className='flex justify-center gap-5 mt-20'
                >
                    <button className='flex items-center gap-2 btn bg-gradient-to-r from-blue-500 to-purple-500 text-white h-13 px-7 rounded-xl'>
                        <Search size={18} /> Find Jobs <MoveRight size={18} />
                    </button>
                    <button className='btn h-13 px-7 rounded-xl'>Post a Job</button>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className='grid grid-cols-3 md:grid-cols-3 gap-6 mt-20'
                >
                    {heroStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { y: 40, opacity: 0 },
                                visible: { y: 0, opacity: 1 }
                            }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className='text-center space-y-1'
                        >
                            <div className='mx-auto w-fit rounded-xl text-blue-800 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-3'>
                                <stat.icon />
                            </div>
                            <p className='text-2xl font-bold'>{stat.value}</p>
                            <p>{stat.lable}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;