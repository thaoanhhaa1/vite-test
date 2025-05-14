import React from 'react';
import { motion } from 'framer-motion';

const OrderSummary = () => {
    const orderItems = [
        { id: 1, name: 'Sản phẩm A', price: 1200000, quantity: 1 },
        { id: 2, name: 'Sản phẩm B', price: 800000, quantity: 2 },
    ];

    const subtotal = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );
    const tax = subtotal * 0.1; // 10% thuế
    const shipping = 50000; // Phí vận chuyển
    const total = subtotal + tax + shipping;

    // Hàm định dạng tiền tệ VND
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    return (
        <motion.div
            className='bg-white rounded-lg shadow-md p-6 animate-fade-in'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className='text-xl font-semibold mb-6 text-secondary'>
                Thông tin đơn hàng
            </h2>

            <div className='space-y-4 mb-6'>
                {orderItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className='flex justify-between items-center pb-4 border-b border-gray-100'
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div className='flex items-center'>
                            <div className='w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4'>
                                <span className='text-primary text-lg font-bold'>
                                    {item.id}
                                </span>
                            </div>
                            <div>
                                <h3 className='font-medium'>{item.name}</h3>
                                <p className='text-sm text-gray-500'>
                                    SL: {item.quantity}
                                </p>
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className='font-medium'>
                                {formatCurrency(item.price)}
                            </p>
                            <p className='text-sm text-gray-500'>
                                {formatCurrency(item.price * item.quantity)}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className='space-y-3 pt-2 border-t border-gray-200'>
                <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Tạm tính:</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Thuế (10%):</span>
                    <span>{formatCurrency(tax)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Phí vận chuyển:</span>
                    <span>{formatCurrency(shipping)}</span>
                </div>
                <div className='flex justify-between font-semibold text-lg pt-3 border-t border-gray-200'>
                    <span>Tổng cộng:</span>
                    <span className='text-primary'>
                        {formatCurrency(total)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderSummary;
