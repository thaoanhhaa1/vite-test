import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Ban,
    Calendar,
    CreditCard,
    Download,
    Filter,
    Search,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';

const PaymentHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const payments = [
        {
            id: 1,
            date: '2024-02-11',
            amount: '2,500,000 ₫',
            type: 'Chuyển khoản',
            status: 'Thành công',
            description: 'Thanh toán hóa đơn điện tháng 2',
            receiver: 'Công ty Điện lực',
            icon: Ban,
        },
        {
            id: 2,
            date: '2024-02-10',
            amount: '1,800,000 ₫',
            type: 'Ví điện tử',
            status: 'Thành công',
            description: 'Thanh toán tiền nước',
            receiver: 'Công ty Cấp nước',
            icon: Wallet,
        },
        {
            id: 3,
            date: '2024-02-09',
            amount: '500,000 ₫',
            type: 'QR Pay',
            status: 'Đang xử lý',
            description: 'Thanh toán internet',
            receiver: 'FPT Telecom',
            icon: CreditCard,
        },
    ];

    const getStatusStyle = (status: any) => {
        switch (status) {
            case 'Thành công':
                return 'bg-gradient-to-r from-emerald-500/10 to-emerald-500/20 text-emerald-700';
            case 'Đang xử lý':
                return 'bg-gradient-to-r from-amber-500/10 to-amber-500/20 text-amber-700';
            default:
                return 'bg-gradient-to-r from-gray-500/10 to-gray-500/20 text-gray-700';
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6'>
            <Card className='w-full max-w-4xl mx-auto shadow-xl'>
                <CardHeader className='border-b bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl'>
                    <CardTitle className='text-2xl font-bold'>
                        Lịch sử thanh toán
                    </CardTitle>

                    <div className='flex flex-col md:flex-row gap-4 mt-6'>
                        <div className='flex-1 relative'>
                            <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                            <Input
                                placeholder='Tìm kiếm giao dịch...'
                                className='pl-10 bg-white/90 border-0 placeholder:text-gray-400 focus:ring-2 focus:ring-white'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className='flex gap-2'>
                            <button className='flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200'>
                                <Calendar className='h-4 w-4' />
                                <span>Thời gian</span>
                            </button>
                            <button className='flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200'>
                                <Filter className='h-4 w-4' />
                                <span>Bộ lọc</span>
                            </button>
                            <button className='flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200'>
                                <Download className='h-4 w-4' />
                                <span>Xuất</span>
                            </button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className='p-6'>
                    <div className='space-y-4'>
                        {payments.map((payment) => {
                            const PaymentIcon = payment.icon;
                            return (
                                <div
                                    key={payment.id}
                                    className='p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100'
                                >
                                    <div className='flex justify-between items-start'>
                                        <div className='flex gap-4'>
                                            <div className='mt-1'>
                                                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center'>
                                                    <PaymentIcon className='h-5 w-5 text-indigo-600' />
                                                </div>
                                            </div>
                                            <div className='space-y-1'>
                                                <p className='font-semibold text-gray-900'>
                                                    {payment.description}
                                                </p>
                                                <p className='text-sm text-gray-600'>
                                                    {payment.receiver}
                                                </p>
                                                <div className='flex items-center gap-2 text-sm text-gray-500'>
                                                    <span>{payment.date}</span>
                                                    <span>•</span>
                                                    <span>{payment.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <p className='font-bold text-gray-900'>
                                                {payment.amount}
                                            </p>
                                            <Badge
                                                className={`mt-2 ${getStatusStyle(
                                                    payment.status,
                                                )} px-3 py-1`}
                                            >
                                                {payment.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentHistory;
