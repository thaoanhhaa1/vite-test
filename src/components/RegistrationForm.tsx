import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RegistrationForm = ({ isVisible, selectedPlan, plans }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        plan: selectedPlan || 'basic',
        paymentMethod: 'credit-card',
        agreeTerms: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (selectedPlan) {
            setFormData((prev) => ({ ...prev, plan: selectedPlan }));
        }
    }, [selectedPlan]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form sau khi submit thành công
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            plan: selectedPlan || 'basic',
            paymentMethod: 'credit-card',
            agreeTerms: false,
        });
    };

    const selectedPlanDetails = plans.find((p) => p.id === formData.plan);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className='max-w-3xl mx-auto'
                >
                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className='bg-white rounded-2xl shadow-xl p-8 text-center'
                        >
                            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <svg
                                    className='w-10 h-10 text-green-500'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M5 13l4 4L19 7'
                                    ></path>
                                </svg>
                            </div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-4'>
                                Đăng ký thành công!
                            </h3>
                            <p className='text-gray-600 mb-6'>
                                Cảm ơn bạn đã đăng ký thành viên. Chúng tôi đã
                                gửi email xác nhận đến địa chỉ email của bạn với
                                các bước tiếp theo.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className='bg-[#E11E39] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#c91930] transition-colors'
                            >
                                Đăng ký thêm
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className='bg-white rounded-2xl shadow-xl overflow-hidden'
                        >
                            <div className='p-8'>
                                <form onSubmit={handleSubmit}>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                                        <div className='md:col-span-2'>
                                            <label className='block text-gray-700 font-medium mb-2'>
                                                Gói thành viên đã chọn
                                            </label>
                                            <div className='flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200'>
                                                <div className='flex-1'>
                                                    <h4 className='font-bold text-gray-800'>
                                                        {selectedPlanDetails?.name ||
                                                            'Cơ bản'}
                                                    </h4>
                                                    <p className='text-gray-600 text-sm'>
                                                        {selectedPlanDetails?.price ||
                                                            '299.000'}
                                                        đ/
                                                        {selectedPlanDetails?.period ||
                                                            'tháng'}
                                                    </p>
                                                </div>
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                'plans',
                                                            )
                                                            .scrollIntoView({
                                                                behavior:
                                                                    'smooth',
                                                            })
                                                    }
                                                    className='text-[#E11E39] text-sm font-medium hover:underline'
                                                >
                                                    Thay đổi
                                                </button>
                                            </div>
                                        </div>

                                        <div className='md:col-span-2'>
                                            <label
                                                htmlFor='fullName'
                                                className='block text-gray-700 font-medium mb-2'
                                            >
                                                Họ và tên
                                            </label>
                                            <input
                                                type='text'
                                                id='fullName'
                                                name='fullName'
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                                                placeholder='Nhập họ và tên của bạn'
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor='email'
                                                className='block text-gray-700 font-medium mb-2'
                                            >
                                                Email
                                            </label>
                                            <input
                                                type='email'
                                                id='email'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                                                placeholder='example@email.com'
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor='phone'
                                                className='block text-gray-700 font-medium mb-2'
                                            >
                                                Số điện thoại
                                            </label>
                                            <input
                                                type='tel'
                                                id='phone'
                                                name='phone'
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                                                placeholder='0xxxxxxxxx'
                                            />
                                        </div>

                                        <div className='md:col-span-2'>
                                            <label className='block text-gray-700 font-medium mb-2'>
                                                Phương thức thanh toán
                                            </label>
                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                                <div
                                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                        formData.paymentMethod ===
                                                        'credit-card'
                                                            ? 'border-[#E11E39] bg-[#E11E39]/5'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                    onClick={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            paymentMethod:
                                                                'credit-card',
                                                        }))
                                                    }
                                                >
                                                    <div className='flex items-center'>
                                                        <input
                                                            type='radio'
                                                            id='credit-card'
                                                            name='paymentMethod'
                                                            value='credit-card'
                                                            checked={
                                                                formData.paymentMethod ===
                                                                'credit-card'
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                                                        />
                                                        <label
                                                            htmlFor='credit-card'
                                                            className='ml-2 font-medium text-gray-700 cursor-pointer'
                                                        >
                                                            Thẻ tín dụng
                                                        </label>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                        formData.paymentMethod ===
                                                        'bank-transfer'
                                                            ? 'border-[#E11E39] bg-[#E11E39]/5'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                    onClick={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            paymentMethod:
                                                                'bank-transfer',
                                                        }))
                                                    }
                                                >
                                                    <div className='flex items-center'>
                                                        <input
                                                            type='radio'
                                                            id='bank-transfer'
                                                            name='paymentMethod'
                                                            value='bank-transfer'
                                                            checked={
                                                                formData.paymentMethod ===
                                                                'bank-transfer'
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                                                        />
                                                        <label
                                                            htmlFor='bank-transfer'
                                                            className='ml-2 font-medium text-gray-700 cursor-pointer'
                                                        >
                                                            Chuyển khoản
                                                        </label>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                        formData.paymentMethod ===
                                                        'e-wallet'
                                                            ? 'border-[#E11E39] bg-[#E11E39]/5'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                    onClick={() =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            paymentMethod:
                                                                'e-wallet',
                                                        }))
                                                    }
                                                >
                                                    <div className='flex items-center'>
                                                        <input
                                                            type='radio'
                                                            id='e-wallet'
                                                            name='paymentMethod'
                                                            value='e-wallet'
                                                            checked={
                                                                formData.paymentMethod ===
                                                                'e-wallet'
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                                                        />
                                                        <label
                                                            htmlFor='e-wallet'
                                                            className='ml-2 font-medium text-gray-700 cursor-pointer'
                                                        >
                                                            Ví điện tử
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='md:col-span-2 mt-4'>
                                            <div className='flex items-center'>
                                                <input
                                                    type='checkbox'
                                                    id='agreeTerms'
                                                    name='agreeTerms'
                                                    checked={
                                                        formData.agreeTerms
                                                    }
                                                    onChange={handleChange}
                                                    required
                                                    className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                                                />
                                                <label
                                                    htmlFor='agreeTerms'
                                                    className='ml-2 text-gray-700'
                                                >
                                                    Tôi đồng ý với{' '}
                                                    <a
                                                        href='#'
                                                        className='text-[#E11E39] hover:underline'
                                                    >
                                                        Điều khoản sử dụng
                                                    </a>{' '}
                                                    và{' '}
                                                    <a
                                                        href='#'
                                                        className='text-[#E11E39] hover:underline'
                                                    >
                                                        Chính sách bảo mật
                                                    </a>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-end mt-8'>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            type='submit'
                                            disabled={isSubmitting}
                                            className='bg-[#E11E39] text-white font-medium px-8 py-3 rounded-lg hover:bg-[#c91930] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center'
                                        >
                                            {isSubmitting ? (
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
                                                    Đang xử lý...
                                                </>
                                            ) : (
                                                'Hoàn tất đăng ký'
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationForm;
