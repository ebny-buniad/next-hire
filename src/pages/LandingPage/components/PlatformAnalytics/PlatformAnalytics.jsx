import React from 'react';
import { analyticsData } from '../../../../utils/data.js'

const PlatformAnalytics = () => {
    return (
        <div className='my-15'>
            <h1 data-aos="fade-up" className='py-8 text-4xl lg:text-5xl xl:text-6xl font-bold text-center'>Platform <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>Analytics</span>
            </h1>
            <p data-aos="fade-up" className='text-center'>Real-time insights and data-driven results that showcase the power of
                our platform in <span className='block'>connecting talent with opportunits.</span>
            </p>

            <div data-aos="fade-up" className='grid md:grid-cols-3 lg:grid-cols-4 my-20 gap-5'>
                {
                    analyticsData.map((data, index) => {
                        const Icon = data.icon;
                        return (
                            <div key={index} className='shadow rounded-xl p-5 space-y-3'>
                                <div className='flex items-center justify-between'>
                                    <div className='p-2 rounded bg-purple-100'>
                                        <Icon className="w-6 h-6 text-purple-500" /></div>
                                    <p className='bg-green-200 text-xs px-2 py-1 font-bold rounded-full'>{data.percent}</p>
                                </div>
                                <h2 className='text-3xl font-bold'>{data.number}</h2>
                                <p>{data.text}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PlatformAnalytics;