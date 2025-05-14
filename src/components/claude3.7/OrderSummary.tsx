import React from 'react';
import { motion } from 'framer-motion';

const OrderSummary = ({ orderData, loading }) => {
    // Format số tiền thành định dạng tiền tệ Việt Nam
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    if (loading) {
        return (
            <div className='bg-white rounded-xl shadow-md p-6 animate-pulse'>
                <div className='h-6 bg-gray-200 rounded w-1/3 mb-6'></div>

                <div className='space-y-4 mb-6'>
                    <div className='h-20 bg-gray-200 rounded'></div>
                    <div className='h-20 bg-gray-200 rounded'></div>
                </div>

                <div className='border-t border-gray-100 pt-4 space-y-3'>
                    <div className='flex justify-between'>
                        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                        <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                    </div>
                    <div className='flex justify-between pt-3 border-t border-gray-100'>
                        <div className='h-6 bg-gray-200 rounded w-1/4'></div>
                        <div className='h-6 bg-gray-200 rounded w-1/4'></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div className='bg-white rounded-xl shadow-md p-6'>
                <p className='text-gray-500 text-center'>
                    Không tìm thấy thông tin đơn hàng
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-xl shadow-md p-6'
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-gray-800'>
                    Thông tin đơn hàng
                </h2>
                <span className='text-sm text-gray-500'>
                    Mã đơn: {orderData.orderId}
                </span>
            </div>

            <div className='space-y-4 mb-6'>
                {orderData.items.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className='flex justify-between p-4 bg-gray-50 rounded-lg'
                    >
                        <div>
                            <h3 className='font-medium text-gray-800'>
                                {item.name}
                            </h3>
                            <p className='text-sm text-gray-500'>
                                {item.description}
                            </p>
                            <div className='text-sm text-gray-600 mt-1'>
                                Số lượng: {item.quantity}
                            </div>
                        </div>
                        <div className='text-right'>
                            <div className='font-medium text-gray-800'>
                                {formatCurrency(item.price)}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className='border-t border-gray-100 pt-4 space-y-3'>
                <div className='flex justify-between text-gray-600'>
                    <span>Tạm tính</span>
                    <span>{formatCurrency(orderData.subtotal)}</span>
                </div>

                {orderData.discount > 0 && (
                    <div className='flex justify-between text-gray-600'>
                        <span>Giảm giá</span>
                        <span className='text-green-600'>
                            -{formatCurrency(orderData.discount)}
                        </span>
                    </div>
                )}

                <div className='flex justify-between text-gray-600'>
                    <span>Thuế (VAT 10%)</span>
                    <span>{formatCurrency(orderData.tax)}</span>
                </div>

                <div className='flex justify-between pt-3 border-t border-gray-100'>
                    <span className='font-bold text-gray-800'>Tổng cộng</span>
                    <span className='font-bold text-[#E11E39] text-xl'>
                        {formatCurrency(orderData.total)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderSummary;
