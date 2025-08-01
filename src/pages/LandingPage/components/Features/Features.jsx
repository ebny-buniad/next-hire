import React from 'react';
import { motion } from 'framer-motion';
import { jobSeekerFeatures, employerFeatures } from '../../../../utils/data.js';

console.log(jobSeekerFeatures);
console.log(employerFeatures);


const Features = () => {
    return (
        <div>
            <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='text-4xl lg:text-5xl xl:text-6xl font-bold text-center'
            >
                Everything You Need to
                <span className='block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                    Succeed
                </span>
            </motion.h1>

            <div className='md:grid grid-cols-2 gap-5 mt-10'>
                <div>
                    <div data-aos="fade-up">
                        <h2 className='text-center my-5 text-3xl font-bold'>For Jobseekers</h2>
                        <p className='border-2 mx-auto w-20 border-blue-500 mb-10'></p>
                    </div>
                    {jobSeekerFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div data-aos="fade-up" key={index} className="flex items-start gap-4 p-4 mb-3
                             hover:bg-gray-100 rounded-xl transition ease-in-out cursor-pointer">
                                <div className='rounded-md px-3 py-3 bg-blue-100'>
                                    <Icon className="text-blue-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div data-aos="fade-up">
                        <h2 className='text-center my-5 text-3xl font-bold'>For Employers</h2>
                        <p className='border-2 mx-auto w-20 border-purple-500 mb-10'></p>
                    </div>
                    {employerFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div data-aos="fade-up" key={index} className="flex items-start gap-4 p-4 mb-3
                             hover:bg-gray-100 rounded-xl transition ease-in-out cursor-pointer">
                                <div className='rounded-md px-3 py-3 bg-purple-100'>
                                    <Icon className="text-purple-600 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Features;