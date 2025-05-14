import React, { useState } from 'react';

const PaymentCard = ({ payment, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-500 ease-out animate-card-entry ${
                isHovered ? 'scale-105 rotate-1' : 'scale-100 rotate-0'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className='text-lg font-semibold text-gray-900'>
                        {payment.title}
                    </h3>
                    <p className='text-sm text-gray-500 mt-1'>
                        Date: {payment.date}
                    </p>
                    <p className='text-sm text-gray-500'>
                        Amount: ${payment.amount.toFixed(2)}
                    </p>
                    <p
                        className={`text-sm font-medium mt-1 ${
                            payment.status === 'Paid'
                                ? 'text-green-500'
                                : 'text-yellow-500'
                        }`}
                    >
                        Status: {payment.status}
                    </p>
                </div>
                <button className='px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-sm hover:from-indigo-700 hover:to-blue-600 transform transition-all duration-300 active:scale-90'>
                    Details
                </button>
            </div>
        </div>
    );
};

export default PaymentCard;
