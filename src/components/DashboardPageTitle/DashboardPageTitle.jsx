import React from 'react';

const DashboardPageTitle = ({children}) => {
    return (
        <div>
            <h3 className='text-2xl font-semibold text-gray-500 mb-5'>{children}</h3>
        </div>
    );
};

export default DashboardPageTitle;