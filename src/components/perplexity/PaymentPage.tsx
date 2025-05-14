import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderSummary from './OrderSummary';
import PaymentMethods from './PaymentMethods';
import PaymentForm from './PaymentForm';
import PaymentButton from './PaymentButton';

const PaymentPage = () => {
    const [selectedMethod, setSelectedMethod] = useState('credit-card');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        // Giả lập quá trình xử lý thanh toán
        setTimeout(() => {
            setIsProcessing(false);
            alert('Thanh toán thành công!');
        }, 2000);
    };

    return (
        <div className='min-h-screen bg-neutral'>
            {/* Header */}
            <header className='bg-white shadow-sm'>
                <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
                    <div className='text-2xl font-bold text-primary'>
                        Brand<span className='text-secondary'>Pay</span>
                    </div>
                    <div className='text-sm text-gray-500'>
                        Thanh toán an toàn & bảo mật
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className='container mx-auto px-4 py-8'>
                <motion.h1
                    className='text-3xl font-bold text-center mb-8 text-secondary'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Chi Tiết Thanh Toán
                </motion.h1>

                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Order Summary Section */}
                    <motion.div
                        className='lg:w-2/5'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <OrderSummary />
                    </motion.div>

                    {/* Payment Section */}
                    <motion.div
                        className='lg:w-3/5 bg-white rounded-lg shadow-md p-6'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className='text-xl font-semibold mb-6 text-secondary'>
                            Phương thức thanh toán
                        </h2>

                        <PaymentMethods
                            selectedMethod={selectedMethod}
                            setSelectedMethod={setSelectedMethod}
                        />

                        <PaymentForm selectedMethod={selectedMethod} />

                        <PaymentButton
                            onClick={handlePayment}
                            isProcessing={isProcessing}
                        />
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className='bg-secondary text-white mt-12 py-6'>
                <div className='container mx-auto px-4 text-center'>
                    <p className='mb-2'>
                        © 2025 BrandPay. Tất cả các quyền được bảo lưu.
                    </p>
                    <div className='flex justify-center space-x-4 mt-4'>
                        <span className='flex items-center text-sm'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 mr-1'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                                    clipRule='evenodd'
                                />
                            </svg>
                            Thanh toán bảo mật
                        </span>
                        <span className='flex items-center text-sm'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5 mr-1'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                            >
                                <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                            </svg>
                            Hỗ trợ 24/7
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PaymentPage;
