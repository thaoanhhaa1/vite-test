import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { XIcon } from 'lucide-react';

const SuccessModal = ({ isOpen, orderId, onClose }) => {
    // Đóng modal khi nhấn ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50'
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className='bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
                        >
                            <XIcon className='h-6 w-6' />
                        </button>

                        <div className='text-center'>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    damping: 10,
                                    delay: 0.2,
                                }}
                                className='mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6'
                            >
                                <CheckCircleIcon className='h-14 w-14 text-green-600' />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className='text-2xl font-bold text-gray-800 mb-2'
                            >
                                Thanh toán thành công!
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className='text-gray-600 mb-6'
                            >
                                Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đã
                                được xác nhận.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className='bg-gray-50 p-4 rounded-lg mb-6'
                            >
                                <p className='text-gray-500 text-sm'>
                                    Mã đơn hàng
                                </p>
                                <p className='text-gray-800 font-medium'>
                                    {orderId}
                                </p>
                            </motion.div>

                            <div className='flex flex-col sm:flex-row gap-3'>
                                <motion.a
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    href='/orders'
                                    className='flex-1 bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors'
                                >
                                    Xem đơn hàng
                                </motion.a>

                                <motion.a
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    href='/'
                                    className='flex-1 bg-[#E11E39] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#c91930] transition-colors'
                                >
                                    Tiếp tục mua sắm
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SuccessModal;
