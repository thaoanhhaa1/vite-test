import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

const MembershipCard = ({ plan, index, onSelect }) => {
    const isPopular = plan.popular;
    const textColor = isPopular ? 'text-white' : 'text-gray-800';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transition: { duration: 0.2 },
            }}
            className={`rounded-2xl overflow-hidden shadow-lg relative ${
                plan.color
            } ${isPopular ? 'ring-4 ring-[#E11E39]/20' : ''}`}
        >
            {isPopular && (
                <div className='absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg'>
                    PHỔ BIẾN NHẤT
                </div>
            )}

            <div className='p-8'>
                <h3 className={`text-2xl font-bold mb-2 ${textColor}`}>
                    {plan.name}
                </h3>
                <div className='flex items-baseline mb-4'>
                    <span className={`text-4xl font-bold ${textColor}`}>
                        {plan.price}đ
                    </span>
                    <span
                        className={`text-sm ml-2 ${
                            isPopular ? 'text-white/80' : 'text-gray-500'
                        }`}
                    >
                        /{plan.period}
                    </span>
                </div>

                <p
                    className={`mb-6 ${
                        isPopular ? 'text-white/90' : 'text-gray-600'
                    }`}
                >
                    {plan.description}
                </p>

                <ul className='space-y-3 mb-8'>
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className='flex items-start'>
                            <CheckIcon
                                className={`h-5 w-5 mr-2 flex-shrink-0 ${
                                    isPopular ? 'text-white' : 'text-[#E11E39]'
                                }`}
                            />
                            <span
                                className={
                                    isPopular
                                        ? 'text-white/90'
                                        : 'text-gray-600'
                                }
                            >
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onSelect}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                        isPopular
                            ? 'bg-white text-[#E11E39] hover:bg-gray-100'
                            : 'bg-[#E11E39] text-white hover:bg-[#c91930]'
                    }`}
                >
                    Đăng ký ngay
                </motion.button>
            </div>
        </motion.div>
    );
};

export default MembershipCard;
