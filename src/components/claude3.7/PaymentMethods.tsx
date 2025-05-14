import React from 'react';
import { motion } from 'framer-motion';
import {
    CreditCardIcon,
    CurrencyDollarIcon,
    QrCodeIcon,
} from '@heroicons/react/24/outline';
import { CalendarSearch } from 'lucide-react';

const PaymentMethods = ({ selectedMethod, onMethodChange }) => {
    const methods = [
        {
            id: 'credit-card',
            name: 'Thẻ tín dụng/ghi nợ',
            icon: CreditCardIcon,
            description: 'Thanh toán an toàn với Visa, Mastercard, JCB',
        },
        {
            id: 'vnpay',
            name: 'VnPay',
            icon: QrCodeIcon,
            description: 'Quét mã QR hoặc thanh toán qua ứng dụng ngân hàng',
        },
        {
            id: 'e-wallet',
            name: 'Ví điện tử',
            icon: CalendarSearch,
            description: 'Thanh toán qua MoMo, ZaloPay, ShopeePay',
        },
        {
            id: 'crypto',
            name: 'Tiền điện tử',
            icon: CurrencyDollarIcon,
            description: 'Thanh toán bằng Bitcoin, Ethereum, USDT',
        },
    ];

    return (
        <div className='p-6 border-b border-gray-100'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {methods.map((method) => (
                    <motion.div
                        key={method.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onMethodChange(method.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedMethod === method.id
                                ? 'border-[#E11E39] bg-[#E11E39]/5 ring-2 ring-[#E11E39]/20'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className='flex items-center'>
                            <input
                                type='radio'
                                id={method.id}
                                name='paymentMethod'
                                checked={selectedMethod === method.id}
                                onChange={() => onMethodChange(method.id)}
                                className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                            />

                            <label
                                htmlFor={method.id}
                                className='ml-3 flex items-center cursor-pointer'
                            >
                                <method.icon
                                    className={`h-5 w-5 mr-2 ${
                                        selectedMethod === method.id
                                            ? 'text-[#E11E39]'
                                            : 'text-gray-500'
                                    }`}
                                />
                                <span className='font-medium text-gray-800'>
                                    {method.name}
                                </span>
                            </label>
                        </div>

                        <p className='text-sm text-gray-500 mt-2 ml-7'>
                            {method.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethods;
