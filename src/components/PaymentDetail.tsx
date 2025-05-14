import React, { useState } from 'react';
import { motion } from 'framer-motion';

function PaymentDetail() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Billing Details Submitted:', formData);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='bg-white p-8 rounded-xl shadow-2xl w-full max-w-md'
            >
                {/* Membership Information */}
                <div className='mb-8'>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className='text-3xl font-bold text-gray-800 mb-6 text-center'
                    >
                        Premium Membership
                    </motion.h2>
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className='bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg shadow-md'
                    >
                        <h3 className='text-xl font-semibold'>Premium Plan</h3>
                        <p className='text-4xl font-bold mt-2'>$19.99</p>
                        <p className='text-sm opacity-80'>Billed Monthly</p>
                        <ul className='mt-4 space-y-3 text-sm'>
                            {[
                                'Unlimited access to all content',
                                'Priority customer support',
                                'Exclusive monthly webinars',
                            ].map((benefit, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                        delay: 0.3 + index * 0.1,
                                        duration: 0.4,
                                    }}
                                    className='flex items-center'
                                >
                                    <svg
                                        className='w-5 h-5 text-green-300 mr-2'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M5 13l4 4L19 7'
                                        />
                                    </svg>
                                    {benefit}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Billing Address Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <h3 className='text-lg font-semibold text-gray-700 mb-4'>
                        Billing Address
                    </h3>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <input
                            type='text'
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder='Full Name'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
                        />
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
                        />
                        <input
                            type='text'
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            placeholder='Address'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
                        />
                        <div className='grid grid-cols-2 gap-4'>
                            <input
                                type='text'
                                name='city'
                                value={formData.city}
                                onChange={handleChange}
                                placeholder='City'
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
                            />
                            <input
                                type='text'
                                name='state'
                                value={formData.state}
                                onChange={handleChange}
                                placeholder='State'
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
                            />
                        </div>
                        <input
                            type='text'
                            name='zip'
                            value={formData.zip}
                            onChange={handleChange}
                            placeholder='ZIP Code'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
                        />

                        {/* Payment Button */}
                        <motion.button
                            type='submit'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 flex items-center justify-center gap-2'
                        >
                            <svg
                                className='w-6 h-6'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-4-2h8m-8 0H4m8-7v14'
                                />
                            </svg>
                            Pay $19.99 Now
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default PaymentDetail;
