import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PaymentForm = ({ method, onSubmit, isProcessing, orderTotal }) => {
    const [formData, setFormData] = useState({
        // Thẻ tín dụng
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        // VnPay
        bankCode: '',
        // Ví điện tử
        walletType: 'momo',
        phoneNumber: '',
        // Crypto
        cryptoType: 'btc',
        // Chung
        savePaymentInfo: false,
    });

    const [errors, setErrors] = useState({});

    // Format số thẻ tín dụng
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    // Format ngày hết hạn
    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }

        return v;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let formattedValue = value;

        // Format các trường đặc biệt
        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : formattedValue,
        }));

        // Xóa lỗi khi người dùng bắt đầu nhập
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (method === 'credit-card') {
            if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
                newErrors.cardNumber = 'Số thẻ không hợp lệ';
            }
            if (!formData.cardName.trim()) {
                newErrors.cardName = 'Vui lòng nhập tên chủ thẻ';
            }
            if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
                newErrors.expiryDate = 'Định dạng MM/YY';
            }
            if (!formData.cvv.match(/^\d{3,4}$/)) {
                newErrors.cvv = 'CVV không hợp lệ';
            }
        } else if (method === 'vnpay') {
            if (!formData.bankCode) {
                newErrors.bankCode = 'Vui lòng chọn ngân hàng';
            }
        } else if (method === 'e-wallet') {
            if (!formData.phoneNumber.match(/^\d{10}$/)) {
                newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
        }
    };

    // Format số tiền thành định dạng tiền tệ Việt Nam
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <form onSubmit={handleSubmit}>
            {method === 'credit-card' && (
                <div className='space-y-4'>
                    <div>
                        <label
                            htmlFor='cardNumber'
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Số thẻ
                        </label>
                        <motion.div
                            whileFocus={{ scale: 1.01 }}
                            className='relative'
                        >
                            <input
                                type='text'
                                id='cardNumber'
                                name='cardNumber'
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder='1234 5678 9012 3456'
                                maxLength='19'
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.cardNumber
                                        ? 'border-red-500'
                                        : 'border-gray-300 focus:border-[#E11E39]'
                                } focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all`}
                            />
                            {errors.cardNumber && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.cardNumber}
                                </p>
                            )}
                        </motion.div>
                    </div>

                    <div>
                        <label
                            htmlFor='cardName'
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Tên chủ thẻ
                        </label>
                        <motion.div
                            whileFocus={{ scale: 1.01 }}
                            className='relative'
                        >
                            <input
                                type='text'
                                id='cardName'
                                name='cardName'
                                value={formData.cardName}
                                onChange={handleChange}
                                placeholder='NGUYEN VAN A'
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.cardName
                                        ? 'border-red-500'
                                        : 'border-gray-300 focus:border-[#E11E39]'
                                } focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all uppercase`}
                            />
                            {errors.cardName && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.cardName}
                                </p>
                            )}
                        </motion.div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label
                                htmlFor='expiryDate'
                                className='block text-gray-700 font-medium mb-2'
                            >
                                Ngày hết hạn
                            </label>
                            <motion.div
                                whileFocus={{ scale: 1.01 }}
                                className='relative'
                            >
                                <input
                                    type='text'
                                    id='expiryDate'
                                    name='expiryDate'
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    placeholder='MM/YY'
                                    maxLength='5'
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.expiryDate
                                            ? 'border-red-500'
                                            : 'border-gray-300 focus:border-[#E11E39]'
                                    } focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all`}
                                />
                                {errors.expiryDate && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors.expiryDate}
                                    </p>
                                )}
                            </motion.div>
                        </div>

                        <div>
                            <label
                                htmlFor='cvv'
                                className='block text-gray-700 font-medium mb-2'
                            >
                                CVV
                            </label>
                            <motion.div
                                whileFocus={{ scale: 1.01 }}
                                className='relative'
                            >
                                <input
                                    type='text'
                                    id='cvv'
                                    name='cvv'
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    placeholder='123'
                                    maxLength='4'
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.cvv
                                            ? 'border-red-500'
                                            : 'border-gray-300 focus:border-[#E11E39]'
                                    } focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all`}
                                />
                                {errors.cvv && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors.cvv}
                                    </p>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}

            {method === 'vnpay' && (
                <div className='space-y-4'>
                    <div>
                        <label
                            htmlFor='bankCode'
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Chọn ngân hàng
                        </label>
                        <select
                            id='bankCode'
                            name='bankCode'
                            value={formData.bankCode}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border ${
                                errors.bankCode
                                    ? 'border-red-500'
                                    : 'border-gray-300 focus:border-[#E11E39]'
                            } focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all`}
                        >
                            <option value=''>-- Chọn ngân hàng --</option>
                            <option value='NCB'>Ngân hàng NCB</option>
                            <option value='VIETCOMBANK'>
                                Ngân hàng VIETCOMBANK
                            </option>
                            <option value='TECHCOMBANK'>
                                Ngân hàng TECHCOMBANK
                            </option>
                            <option value='MBBANK'>Ngân hàng MBBANK</option>
                            <option value='VPBANK'>Ngân hàng VPBANK</option>
                            <option value='TPBANK'>Ngân hàng TPBANK</option>
                        </select>
                        {errors.bankCode && (
                            <p className='text-red-500 text-sm mt-1'>
                                {errors.bankCode}
                            </p>
                        )}
                    </div>

                    <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-gray-600 text-sm'>
                            Sau khi nhấn "Thanh toán", bạn sẽ được chuyển đến
                            cổng thanh toán VnPay để hoàn tất giao dịch.
                        </p>
                    </div>
                </div>
            )}

            {method === 'e-wallet' && (
                <div className='space-y-4'>
                    <div>
                        <label className='block text-gray-700 font-medium mb-2'>
                            Chọn ví điện tử
                        </label>
                        <div className='grid grid-cols-3 gap-3'>
                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        walletType: 'momo',
                                    }))
                                }
                                className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                                    formData.walletType === 'momo'
                                        ? 'border-[#E11E39] bg-[#E11E39]/5 ring-2 ring-[#E11E39]/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <img
                                    src='/images/momo.svg'
                                    alt='MoMo'
                                    className='h-8 mx-auto mb-2'
                                />
                                <span className='text-sm font-medium'>
                                    MoMo
                                </span>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        walletType: 'zalopay',
                                    }))
                                }
                                className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                                    formData.walletType === 'zalopay'
                                        ? 'border-[#E11E39] bg-[#E11E39]/5 ring-2 ring-[#E11E39]/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <img
                                    src='/images/zalopay.svg'
                                    alt='ZaloPay'
                                    className='h-8 mx-auto mb-2'
                                />
                                <span className='text-sm font-medium'>
                                    ZaloPay
                                </span>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        walletType: 'shopeepay',
                                    }))
                                }
                                className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                                    formData.walletType === 'shopeepay'
                                        ? 'border-[#E11E39] bg-[#E11E39]/5 ring-2 ring-[#E11E39]/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <img
                                    src='/images/shopeepay.svg'
                                    alt='ShopeePay'
                                    className='h-8 mx-auto mb-2'
                                />
                                <span className='text-sm font-medium'>
                                    ShopeePay
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor='phoneNumber'
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Số điện thoại
                        </label>
                        <motion.div
                            whileFocus={{ scale: 1.01 }}
                            className='relative'
                        >
                            <input
                                type='tel'
                                id='phoneNumber'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder='0912345678'
                                maxLength='10'
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.phoneNumber
                                        ? 'border-red-500'
                                        : 'border-gray-300 focus:border-[#E11E39]'
                                } focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all`}
                            />
                            {errors.phoneNumber && (
                                <p className='text-red-500 text-sm mt-1'>
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </motion.div>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-lg'>
                        <p className='text-gray-600 text-sm'>
                            Bạn sẽ nhận được thông báo thanh toán trên ứng dụng{' '}
                            {formData.walletType === 'momo'
                                ? 'MoMo'
                                : formData.walletType === 'zalopay'
                                ? 'ZaloPay'
                                : 'ShopeePay'}{' '}
                            sau khi nhấn "Thanh toán".
                        </p>
                    </div>
                </div>
            )}

            {method === 'crypto' && (
                <div className='space-y-4'>
                    <div>
                        <label className='block text-gray-700 font-medium mb-2'>
                            Chọn loại tiền điện tử
                        </label>
                        <div className='grid grid-cols-3 gap-3'>
                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        cryptoType: 'btc',
                                    }))
                                }
                                className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                                    formData.cryptoType === 'btc'
                                        ? 'border-[#E11E39] bg-[#E11E39]/5 ring-2 ring-[#E11E39]/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <img
                                    src='/images/bitcoin.svg'
                                    alt='Bitcoin'
                                    className='h-8 mx-auto mb-2'
                                />
                                <span className='text-sm font-medium'>
                                    Bitcoin
                                </span>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        cryptoType: 'eth',
                                    }))
                                }
                                className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                                    formData.cryptoType === 'eth'
                                        ? 'border-[#E11E39] bg-[#E11E39]/5 ring-2 ring-[#E11E39]/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <img
                                    src='/images/ethereum.svg'
                                    alt='Ethereum'
                                    className='h-8 mx-auto mb-2'
                                />
                                <span className='text-sm font-medium'>
                                    Ethereum
                                </span>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        cryptoType: 'usdt',
                                    }))
                                }
                                className={`p-3 border rounded-lg cursor-pointer text-center transition-all ${
                                    formData.cryptoType === 'usdt'
                                        ? 'border-[#E11E39] bg-[#E11E39]/5 ring-2 ring-[#E11E39]/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <img
                                    src='/images/usdt.svg'
                                    alt='USDT'
                                    className='h-8 mx-auto mb-2'
                                />
                                <span className='text-sm font-medium'>
                                    USDT
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-lg'>
                        <div className='mb-4'>
                            <p className='text-gray-700 font-medium mb-2'>
                                Địa chỉ ví
                            </p>
                            <div className='bg-white p-3 rounded border border-gray-200 break-all font-mono text-sm'>
                                {formData.cryptoType === 'btc' &&
                                    '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5'}
                                {formData.cryptoType === 'eth' &&
                                    '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}
                                {formData.cryptoType === 'usdt' &&
                                    'TXk8rQSAvPvBBcKqFKNHYhdbA8bmuDQd4o'}
                            </div>
                        </div>

                        <div className='text-center'>
                            <div className='bg-white p-2 inline-block rounded-lg border border-gray-200 mb-2'>
                                <img
                                    src={`/images/qr-${formData.cryptoType}.png`}
                                    alt='QR Code'
                                    className='h-32 w-32'
                                />
                            </div>
                            <p className='text-gray-600 text-sm'>
                                Quét mã QR hoặc sao chép địa chỉ ví để thanh
                                toán
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className='mt-6'>
                <div className='flex items-center mb-6'>
                    <input
                        type='checkbox'
                        id='savePaymentInfo'
                        name='savePaymentInfo'
                        checked={formData.savePaymentInfo}
                        onChange={handleChange}
                        className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                    />
                    <label
                        htmlFor='savePaymentInfo'
                        className='ml-2 text-gray-700'
                    >
                        Lưu thông tin thanh toán cho lần sau
                    </label>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type='submit'
                    disabled={isProcessing}
                    className='w-full bg-[#E11E39] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#c91930] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center'
                >
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
                            Đang xử lý...
                        </>
                    ) : (
                        <>
                            Thanh toán{' '}
                            {orderTotal
                                ? new Intl.NumberFormat('vi-VN', {
                                      style: 'currency',
                                      currency: 'VND',
                                      minimumFractionDigits: 0,
                                  }).format(orderTotal)
                                : ''}
                        </>
                    )}
                </motion.button>
            </div>
        </form>
    );
};

export default PaymentForm;
