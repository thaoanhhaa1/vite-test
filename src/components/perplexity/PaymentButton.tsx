import React from 'react';
import { motion } from 'framer-motion';

const PaymentButton = ({ onClick, isProcessing }) => {
    return (
        <motion.button
            type='button'
            className='w-full bg-primary text-white py-4 px-6 rounded-lg font-medium text-lg shadow-md hover:shadow-lg focus:outline-none'
            onClick={onClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={isProcessing}
        >
            <div className='flex items-center justify-center'>
                {isProcessing ? (
                    <>
                        <svg
                            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                            ></circle>
                            <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                        </svg>
                        <span>Đang xử lý...</span>
                    </>
                ) : (
                    <>
                        <span>Xác nhận thanh toán</span>
                        <svg
                            className='ml-2 h-5 w-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M14 5l7 7m0 0l-7 7m7-7H3'
                            />
                        </svg>
                    </>
                )}
            </div>
        </motion.button>
    );
};

export default PaymentButton;
