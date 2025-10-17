import { Plus, Wallet } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const BillingsTab = ({setTabIndex}) => {
    return (
        <div className='transition-all duration-500 ease-in-out transform space-y-10'>
            <div className='space-y-2'>
                <h4 className='text-xl font-semibold mb-5 flex items-center gap-1'><Wallet size={20} />Billings</h4>

                <div className='lg:flex justify-between items-center border px-3 py-4 rounded-lg border-gray-200'>
                    <div className='space-y-2'>
                        <p className='font-semibold'>Your application is currently on the Basic plan</p>
                        <p>Higher plans offer higher message request limit, addditional features, and much more.</p>
                    </div>
                    <div className='gap-3 flex mt-5 lg:mt-0'>
                        <Link to='' className='btn p-5 font-medium rounded-full'>Chat to Us</Link>
                        <button onClick={() => setTabIndex(2)} className='btn bg-gradient-to-r from-blue-500 to-purple-500 text-white
                         p-5 font-medium rounded-full'>View plans</button>
                    </div>
                </div>

                <div className='flex justify-between items-center border-b border-t border-gray-200 px-3 py-10 mt-8'>
                    <div className='space-y-2'>
                        <h6 className='text-xl font-semibold'>Payments methods</h6>
                        <p>Manage your default payment method</p>
                        <button className='btn mt-5 p-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                        font-normal'> <Plus size={18} />Payment method</button>
                    </div>
                    <div>
                        card
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingsTab;