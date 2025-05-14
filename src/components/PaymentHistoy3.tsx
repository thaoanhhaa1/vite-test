import React, { useState } from 'react';
import PaymentCard from './PaymentCard';

const PaymentHistory3 = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [payments, setPayments] = useState([
        {
            id: 1,
            title: 'Netflix Subscription',
            date: '2025-02-15',
            amount: 15.99,
            status: 'Paid',
        },
        {
            id: 2,
            title: 'Spotify Subscription',
            date: '2025-02-20',
            amount: 9.99,
            status: 'Pending',
        },
    ]);

    const filteredPayments = payments.filter((payment) =>
        payment.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleLoadMore = () => {
        setPayments((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                title: `Payment ${prev.length + 1}`,
                date: '2025-02-21',
                amount: 12.99,
                status: 'Paid',
            },
        ]);
    };

    return (
        <div className='max-w-6xl mx-auto'>
            {/* Header */}
            <header className='flex flex-col sm:flex-row justify-between items-center mb-8'>
                <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight'>
                    Payment History
                </h1>
                <div className='flex gap-4 mt-4 sm:mt-0'>
                    <input
                        type='text'
                        placeholder='Search transactions...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 w-64'
                    />
                    <button className='px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl shadow-md hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 transition-all duration-300'>
                        Filters
                    </button>
                </div>
            </header>

            {/* Payment List */}
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredPayments.length ? (
                    filteredPayments.map((payment, index) => (
                        <PaymentCard
                            key={payment.id}
                            payment={payment}
                            index={index}
                        />
                    ))
                ) : (
                    <p className='col-span-full text-center text-gray-500'>
                        No payments found.
                    </p>
                )}
            </section>

            {/* Footer */}
            <footer className='mt-8 text-center'>
                <button
                    onClick={handleLoadMore}
                    className='px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl shadow-lg hover:from-indigo-700 hover:to-blue-600 transform hover:scale-105 active:scale-95 transition-all duration-300'
                >
                    Load More
                </button>
            </footer>
        </div>
    );
};

export default PaymentHistory3;
