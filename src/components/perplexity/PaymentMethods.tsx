import React from 'react';
import { motion } from 'framer-motion';

const PaymentMethods = ({ selectedMethod, setSelectedMethod }) => {
    const methods = [
        { id: 'credit-card', name: 'Thẻ tín dụng/ghi nợ', icon: 'credit-card' },
        { id: 'vnpay', name: 'VnPay', icon: 'vnpay' },
        { id: 'momo', name: 'Ví MoMo', icon: 'momo' },
        { id: 'crypto', name: 'Cryptocurrency', icon: 'crypto' },
    ];

    // Icon components (đơn giản hóa)
    const icons = {
        'credit-card': (
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
                    strokeWidth={2}
                    d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                />
            </svg>
        ),
        vnpay: (
            <div className='w-6 h-6 flex items-center justify-center font-bold text-primary'>
                VN
            </div>
        ),
        momo: (
            <div className='w-6 h-6 flex items-center justify-center font-bold text-purple-600'>
                M
            </div>
        ),
        crypto: (
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
                    strokeWidth={2}
                    d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                />
            </svg>
        ),
    };

    return (
        <div className='mb-8'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {methods.map((method) => (
                    <motion.div
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            selectedMethod === method.id
                                ? 'border-primary bg-red-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedMethod(method.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className='flex flex-col items-center justify-center space-y-2'>
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    selectedMethod === method.id
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-600'
                                }`}
                            >
                                {icons[method.icon]}
                            </div>
                            <span className='text-sm font-medium text-center'>
                                {method.name}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethods;
