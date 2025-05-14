import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentForm = ({ selectedMethod }) => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validation theo thời gian thực
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case 'cardNumber':
                if (!/^\d{0,16}$/.test(value)) {
                    newErrors.cardNumber = 'Số thẻ phải có 16 chữ số';
                } else if (value.length > 0 && value.length < 16) {
                    newErrors.cardNumber = 'Số thẻ chưa đủ 16 chữ số';
                } else {
                    delete newErrors.cardNumber;
                }
                break;
            case 'cardHolder':
                if (value.length > 0 && value.length < 3) {
                    newErrors.cardHolder =
                        'Tên chủ thẻ phải có ít nhất 3 ký tự';
                } else {
                    delete newErrors.cardHolder;
                }
                break;
            case 'expiryDate':
                if (
                    !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value) &&
                    value.length > 0
                ) {
                    newErrors.expiryDate = 'Định dạng phải là MM/YY';
                } else {
                    delete newErrors.expiryDate;
                }
                break;
            case 'cvv':
                if (!/^\d{0,3}$/.test(value)) {
                    newErrors.cvv = 'CVV phải có 3 chữ số';
                } else if (value.length > 0 && value.length < 3) {
                    newErrors.cvv = 'CVV chưa đủ 3 chữ số';
                } else {
                    delete newErrors.cvv;
                }
                break;
            case 'email':
                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
                    value.length > 0
                ) {
                    newErrors.email = 'Email không hợp lệ';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'phone':
                if (!/^(0|\+84)[0-9]{9}$/.test(value) && value.length > 0) {
                    newErrors.phone = 'Số điện thoại không hợp lệ';
                } else {
                    delete newErrors.phone;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleFocus = (field) => {
        setFocused(field);
    };

    const handleBlur = () => {
        setFocused(null);
    };

    // Định dạng số thẻ tín dụng
    const formatCardNumber = (value) => {
        return value
            .replace(/\s/g, '')
            .replace(/(\d{4})/g, '$1 ')
            .trim();
    };

    // Định dạng ngày hết hạn
    const formatExpiryDate = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1/$2')
            .substr(0, 5);
    };

    const renderCreditCardForm = () => (
        <div className='space-y-4'>
            <div className='grid grid-cols-1 gap-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Số thẻ
                    </label>
                    <motion.div
                        className={`relative rounded-md shadow-sm ${
                            focused === 'cardNumber'
                                ? 'ring-2 ring-primary'
                                : ''
                        }`}
                        animate={
                            focused === 'cardNumber'
                                ? { scale: 1.02 }
                                : { scale: 1 }
                        }
                        transition={{ duration: 0.2 }}
                    >
                        <input
                            type='text'
                            name='cardNumber'
                            value={formatCardNumber(formData.cardNumber)}
                            onChange={(e) =>
                                handleChange({
                                    target: {
                                        name: 'cardNumber',
                                        value: e.target.value.replace(
                                            /\s/g,
                                            '',
                                        ),
                                    },
                                })
                            }
                            onFocus={() => handleFocus('cardNumber')}
                            onBlur={handleBlur}
                            placeholder='1234 5678 9012 3456'
                            className={`block w-full px-4 py-3 rounded-md border ${
                                errors.cardNumber
                                    ? 'border-red-300'
                                    : 'border-gray-300'
                            } focus:outline-none focus:ring-0 focus:border-primary`}
                            maxLength='19'
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                            <svg
                                className='h-5 w-5 text-gray-400'
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
                        </div>
                    </motion.div>
                    {errors.cardNumber && (
                        <p className='mt-1 text-sm text-red-600'>
                            {errors.cardNumber}
                        </p>
                    )}
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Tên chủ thẻ
                    </label>
                    <motion.div
                        className={`relative rounded-md shadow-sm ${
                            focused === 'cardHolder'
                                ? 'ring-2 ring-primary'
                                : ''
                        }`}
                        animate={
                            focused === 'cardHolder'
                                ? { scale: 1.02 }
                                : { scale: 1 }
                        }
                        transition={{ duration: 0.2 }}
                    >
                        <input
                            type='text'
                            name='cardHolder'
                            value={formData.cardHolder}
                            onChange={handleChange}
                            onFocus={() => handleFocus('cardHolder')}
                            onBlur={handleBlur}
                            placeholder='NGUYEN VAN A'
                            className={`block w-full px-4 py-3 rounded-md border ${
                                errors.cardHolder
                                    ? 'border-red-300'
                                    : 'border-gray-300'
                            } focus:outline-none focus:ring-0 focus:border-primary`}
                        />
                    </motion.div>
                    {errors.cardHolder && (
                        <p className='mt-1 text-sm text-red-600'>
                            {errors.cardHolder}
                        </p>
                    )}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Ngày hết hạn
                        </label>
                        <motion.div
                            className={`relative rounded-md shadow-sm ${
                                focused === 'expiryDate'
                                    ? 'ring-2 ring-primary'
                                    : ''
                            }`}
                            animate={
                                focused === 'expiryDate'
                                    ? { scale: 1.02 }
                                    : { scale: 1 }
                            }
                            transition={{ duration: 0.2 }}
                        >
                            <input
                                type='text'
                                name='expiryDate'
                                value={formData.expiryDate}
                                onChange={(e) =>
                                    handleChange({
                                        target: {
                                            name: 'expiryDate',
                                            value: formatExpiryDate(
                                                e.target.value,
                                            ),
                                        },
                                    })
                                }
                                onFocus={() => handleFocus('expiryDate')}
                                onBlur={handleBlur}
                                placeholder='MM/YY'
                                className={`block w-full px-4 py-3 rounded-md border ${
                                    errors.expiryDate
                                        ? 'border-red-300'
                                        : 'border-gray-300'
                                } focus:outline-none focus:ring-0 focus:border-primary`}
                                maxLength='5'
                            />
                        </motion.div>
                        {errors.expiryDate && (
                            <p className='mt-1 text-sm text-red-600'>
                                {errors.expiryDate}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            CVV
                        </label>
                        <motion.div
                            className={`relative rounded-md shadow-sm ${
                                focused === 'cvv' ? 'ring-2 ring-primary' : ''
                            }`}
                            animate={
                                focused === 'cvv'
                                    ? { scale: 1.02 }
                                    : { scale: 1 }
                            }
                            transition={{ duration: 0.2 }}
                        >
                            <input
                                type='text'
                                name='cvv'
                                value={formData.cvv}
                                onChange={handleChange}
                                onFocus={() => handleFocus('cvv')}
                                onBlur={handleBlur}
                                placeholder='123'
                                className={`block w-full px-4 py-3 rounded-md border ${
                                    errors.cvv
                                        ? 'border-red-300'
                                        : 'border-gray-300'
                                } focus:outline-none focus:ring-0 focus:border-primary`}
                                maxLength='3'
                            />
                            <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                                <svg
                                    className='h-5 w-5 text-gray-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                </svg>
                            </div>
                        </motion.div>
                        {errors.cvv && (
                            <p className='mt-1 text-sm text-red-600'>
                                {errors.cvv}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderVnpayForm = () => (
        <div className='space-y-4'>
            <div className='p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4'>
                <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3'>
                        <span className='font-bold'>VN</span>
                    </div>
                    <div>
                        <h3 className='font-medium text-blue-800'>
                            Thanh toán qua VnPay
                        </h3>
                        <p className='text-sm text-blue-600'>
                            Bạn sẽ được chuyển đến cổng thanh toán VnPay
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email
                </label>
                <motion.div
                    className={`relative rounded-md shadow-sm ${
                        focused === 'email' ? 'ring-2 ring-primary' : ''
                    }`}
                    animate={
                        focused === 'email' ? { scale: 1.02 } : { scale: 1 }
                    }
                    transition={{ duration: 0.2 }}
                >
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        placeholder='example@gmail.com'
                        className={`block w-full px-4 py-3 rounded-md border ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-0 focus:border-primary`}
                    />
                </motion.div>
                {errors.email && (
                    <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
                )}
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Số điện thoại
                </label>
                <motion.div
                    className={`relative rounded-md shadow-sm ${
                        focused === 'phone' ? 'ring-2 ring-primary' : ''
                    }`}
                    animate={
                        focused === 'phone' ? { scale: 1.02 } : { scale: 1 }
                    }
                    transition={{ duration: 0.2 }}
                >
                    <input
                        type='text'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => handleFocus('phone')}
                        onBlur={handleBlur}
                        placeholder='0912345678'
                        className={`block w-full px-4 py-3 rounded-md border ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-0 focus:border-primary`}
                    />
                </motion.div>
                {errors.phone && (
                    <p className='mt-1 text-sm text-red-600'>{errors.phone}</p>
                )}
            </div>
        </div>
    );

    const renderMomoForm = () => (
        <div className='space-y-4'>
            <div className='p-4 bg-purple-50 rounded-lg border border-purple-100 mb-4'>
                <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mr-3'>
                        <span className='font-bold'>M</span>
                    </div>
                    <div>
                        <h3 className='font-medium text-purple-800'>
                            Thanh toán qua MoMo
                        </h3>
                        <p className='text-sm text-purple-600'>
                            Quét mã QR hoặc nhập số điện thoại MoMo
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mb-4'>
                <div className='w-48 h-48 bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center'>
                    <div className='w-full h-full bg-purple-50 flex items-center justify-center'>
                        {' '}
                        <span className='text-purple-600 font-medium'>
                            Mã QR MoMo
                        </span>{' '}
                    </div>{' '}
                </div>{' '}
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Số điện thoại MoMo
                </label>
                <motion.div
                    className={`relative rounded-md shadow-sm ${
                        focused === 'phone' ? 'ring-2 ring-primary' : ''
                    }`}
                    animate={
                        focused === 'phone' ? { scale: 1.02 } : { scale: 1 }
                    }
                    transition={{ duration: 0.2 }}
                >
                    <input
                        type='text'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => handleFocus('phone')}
                        onBlur={handleBlur}
                        placeholder='0912345678'
                        className={`block w-full px-4 py-3 rounded-md border ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                        } focus:outline-none focus:ring-0 focus:border-purple-600`}
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                        <svg
                            className='h-5 w-5 text-purple-500'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                            />
                        </svg>
                    </div>
                </motion.div>
                {errors.phone && (
                    <p className='mt-1 text-sm text-red-600'>{errors.phone}</p>
                )}
            </div>
        </div>
    );

    const renderCryptoForm = () => (
        <div className='space-y-4'>
            <div className='p-4 bg-yellow-50 rounded-lg border border-yellow-100 mb-4'>
                <div className='flex items-center'>
                    <div className='w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center mr-3'>
                        <svg
                            className='h-5 w-5'
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
                    </div>
                    <div>
                        <h3 className='font-medium text-yellow-800'>
                            Thanh toán bằng Cryptocurrency
                        </h3>
                        <p className='text-sm text-yellow-600'>
                            Chuyển tiền đến ví của chúng tôi
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mb-4'>
                <div className='w-48 h-48 bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center'>
                    <div className='w-full h-full bg-yellow-50 flex items-center justify-center'>
                        <span className='text-yellow-600 font-medium'>
                            Mã QR Crypto
                        </span>
                    </div>
                </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                <h4 className='font-medium mb-2'>Địa chỉ ví:</h4>
                <div className='flex items-center'>
                    <input
                        type='text'
                        readOnly
                        value='0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t'
                        className='block w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-100 text-sm'
                    />
                    <button className='ml-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors'>
                        <svg
                            className='h-5 w-5 text-gray-600'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                            />
                        </svg>
                    </button>
                </div>
                <p className='text-sm text-gray-500 mt-2'>
                    Hỗ trợ: BTC, ETH, USDT, BNB
                </p>
            </div>
        </div>
    );
    return (
        <div className='mt-6 mb-8'>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={selectedMethod}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {selectedMethod === 'credit-card' && renderCreditCardForm()}
                    {selectedMethod === 'vnpay' && renderVnpayForm()}
                    {selectedMethod === 'momo' && renderMomoForm()}
                    {selectedMethod === 'crypto' && renderCryptoForm()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default PaymentForm;
