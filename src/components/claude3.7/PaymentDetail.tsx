import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrderSummary from './OrderSummary';
import { LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import PaymentMethods from './PaymentMethods';
import PaymentForm from './PaymentForm';
import SuccessModal from './SuccessModal';

const PaymentDetail = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState('credit-card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Giả lập dữ liệu đơn hàng
    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true);
            try {
                // Giả lập API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Dữ liệu mẫu
                const sampleOrderData = {
                    orderId:
                        'ORD-' + Math.floor(100000 + Math.random() * 900000),
                    date: new Date().toLocaleDateString('vi-VN'),
                    items: [
                        {
                            id: 1,
                            name: 'Khóa học Thiết kế UX/UI Chuyên sâu',
                            description: 'Khóa học 3 tháng với chứng chỉ',
                            price: 4990000,
                            quantity: 1,
                        },
                        {
                            id: 2,
                            name: 'Tài liệu bổ sung',
                            description: 'Bộ tài liệu thiết kế chuyên nghiệp',
                            price: 990000,
                            quantity: 1,
                        },
                    ],
                    subtotal: 5980000,
                    discount: 598000,
                    tax: 538200,
                    total: 5920200,
                    currency: 'VND',
                };

                setOrderData(sampleOrderData);
            } catch (error) {
                console.error('Error fetching order data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, []);

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleSubmitPayment = async (formData) => {
        setIsProcessing(true);

        try {
            // Giả lập API call xử lý thanh toán
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Hiển thị modal thành công
            setShowSuccessModal(true);
        } catch (error) {
            console.error('Payment processing error:', error);
            alert('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 py-12'>
            <div className='container mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='text-center mb-10'
                >
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
                        Chi Tiết Thanh Toán
                    </h1>
                    <p className='text-gray-600 mt-2'>
                        Hoàn tất thanh toán để tiếp tục
                    </p>
                </motion.div>

                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Cột bên trái - Thông tin đơn hàng */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='lg:w-5/12'
                    >
                        <OrderSummary orderData={orderData} loading={loading} />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className='bg-white rounded-xl shadow-md p-6 mt-6'
                        >
                            <div className='flex items-center space-x-2 text-gray-600 mb-4'>
                                <ShieldCheckIcon className='h-5 w-5 text-green-500' />
                                <span className='text-sm'>
                                    Thanh toán an toàn & bảo mật
                                </span>
                            </div>

                            <div className='flex flex-wrap gap-2'>
                                <img
                                    src='/images/visa.svg'
                                    alt='Visa'
                                    className='h-8'
                                />
                                <img
                                    src='/images/mastercard.svg'
                                    alt='Mastercard'
                                    className='h-8'
                                />
                                <img
                                    src='/images/vnpay.svg'
                                    alt='VnPay'
                                    className='h-8'
                                />
                                <img
                                    src='/images/momo.svg'
                                    alt='Momo'
                                    className='h-8'
                                />
                                <img
                                    src='/images/zalopay.svg'
                                    alt='ZaloPay'
                                    className='h-8'
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Cột bên phải - Phương thức thanh toán và form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='lg:w-7/12'
                    >
                        <div className='bg-white rounded-xl shadow-md overflow-hidden'>
                            <div className='p-6 border-b border-gray-100'>
                                <h2 className='text-xl font-bold text-gray-800'>
                                    Phương thức thanh toán
                                </h2>
                            </div>

                            <PaymentMethods
                                selectedMethod={selectedPaymentMethod}
                                onMethodChange={handlePaymentMethodChange}
                            />

                            <div className='p-6'>
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={selectedPaymentMethod}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <PaymentForm
                                            method={selectedPaymentMethod}
                                            onSubmit={handleSubmitPayment}
                                            isProcessing={isProcessing}
                                            orderTotal={orderData?.total}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className='text-center text-gray-500 text-sm mt-12'
                >
                    <div className='flex items-center justify-center mb-2'>
                        <LockClosedIcon className='h-4 w-4 mr-1 text-gray-400' />
                        <span>Thông tin của bạn được mã hóa và bảo mật</span>
                    </div>
                    <p>
                        Bằng việc hoàn tất thanh toán, bạn đồng ý với{' '}
                        <a href='#' className='text-[#E11E39] hover:underline'>
                            Điều khoản dịch vụ
                        </a>{' '}
                        và{' '}
                        <a href='#' className='text-[#E11E39] hover:underline'>
                            Chính sách bảo mật
                        </a>{' '}
                        của chúng tôi.
                    </p>
                </motion.div>
            </div>

            {/* Modal thành công */}
            <SuccessModal
                isOpen={showSuccessModal}
                orderId={orderData?.orderId}
                onClose={() => setShowSuccessModal(false)}
            />
        </div>
    );
};

export default PaymentDetail;
