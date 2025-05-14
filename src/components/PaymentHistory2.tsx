import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    AlertCircle,
    Ban,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    CreditCard,
    Download,
    Filter,
    Receipt,
    Search,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';

const PaymentHistory2 = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);

    const payments = [
        {
            id: 1,
            date: '2024-02-11',
            time: '14:30:25',
            amount: '2,500,000 ₫',
            type: 'Chuyển khoản',
            status: 'Thành công',
            description: 'Thanh toán hóa đơn điện tháng 2',
            receiver: 'Công ty Điện lực',
            receiverAccount: '0123456789',
            receiverBank: 'Vietcombank',
            transactionId: 'TRX123456789',
            category: 'Hóa đơn & Tiện ích',
            note: 'Thanh toán tiền điện tháng 2/2024',
            icon: Ban,
        },
        {
            id: 2,
            date: '2024-02-10',
            time: '09:15:10',
            amount: '1,800,000 ₫',
            type: 'Ví điện tử',
            status: 'Thành công',
            description: 'Thanh toán tiền nước',
            receiver: 'Công ty Cấp nước',
            receiverAccount: '9876543210',
            receiverBank: 'BIDV',
            transactionId: 'TRX987654321',
            category: 'Hóa đơn & Tiện ích',
            note: 'Thanh toán hóa đơn nước Q1/2024',
            icon: Wallet,
        },
        {
            id: 3,
            date: '2024-02-09',
            time: '16:45:30',
            amount: '500,000 ₫',
            type: 'QR Pay',
            status: 'Đang xử lý',
            description: 'Thanh toán internet',
            receiver: 'FPT Telecom',
            receiverAccount: '5432109876',
            receiverBank: 'Techcombank',
            transactionId: 'TRX543210987',
            category: 'Hóa đơn & Tiện ích',
            note: 'Thanh toán cước internet tháng 2',
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

    const getStatusIcon = (status: any) => {
        switch (status) {
            case 'Thành công':
                return <CheckCircle2 className='h-5 w-5 text-emerald-600' />;
            case 'Đang xử lý':
                return <AlertCircle className='h-5 w-5 text-amber-600' />;
            default:
                return null;
        }
    };

    const TransactionDetail = ({ payment }: any) => (
        <div className='space-y-6'>
            <div className='flex items-center justify-center py-4'>
                <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center'>
                    {payment.icon && (
                        <payment.icon className='h-8 w-8 text-indigo-600' />
                    )}
                </div>
            </div>

            <div className='text-center'>
                <h3 className='text-2xl font-bold text-gray-900'>
                    {payment.amount}
                </h3>
                <div className='mt-2 flex items-center justify-center gap-2'>
                    {getStatusIcon(payment.status)}
                    <Badge
                        className={`${getStatusStyle(
                            payment.status,
                        )} px-3 py-1`}
                    >
                        {payment.status}
                    </Badge>
                </div>
            </div>

            <div className='space-y-4'>
                <div className='bg-gray-50 rounded-xl p-4 space-y-3'>
                    <DetailItem
                        icon={Clock}
                        label='Thời gian'
                        value={`${payment.date} ${payment.time}`}
                    />
                    <DetailItem
                        icon={Receipt}
                        label='Mã giao dịch'
                        value={payment.transactionId}
                    />
                    <DetailItem
                        icon={Building2}
                        label='Loại giao dịch'
                        value={payment.type}
                    />
                </div>

                <div className='bg-gray-50 rounded-xl p-4 space-y-3'>
                    <h4 className='font-semibold text-gray-900'>
                        Thông tin người nhận
                    </h4>
                    <DetailItem
                        icon={Building2}
                        label='Đơn vị'
                        value={payment.receiver}
                    />
                    <DetailItem
                        icon={Ban}
                        label='Ngân hàng'
                        value={payment.receiverBank}
                    />
                    <DetailItem
                        icon={CreditCard}
                        label='Số tài khoản'
                        value={payment.receiverAccount}
                    />
                </div>

                <div className='bg-gray-50 rounded-xl p-4 space-y-3'>
                    <DetailItem
                        icon={Receipt}
                        label='Nội dung'
                        value={payment.note}
                    />
                    <DetailItem
                        icon={Wallet}
                        label='Danh mục'
                        value={payment.category}
                    />
                </div>
            </div>
        </div>
    );

    const DetailItem = ({ icon: Icon, label, value }: any) => (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 text-gray-600'>
                <Icon className='h-4 w-4' />
                <span>{label}</span>
            </div>
            <span className='font-medium text-gray-900'>{value}</span>
        </div>
    );

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6'>
            <Card className='w-full max-w-4xl mx-auto shadow-xl'>
                <CardHeader className='border-b bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-xl'>
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
                            <button className='flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 backdrop-blur-sm'>
                                <Calendar className='h-4 w-4' />
                                <span>Thời gian</span>
                            </button>
                            <button className='flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 backdrop-blur-sm'>
                                <Filter className='h-4 w-4' />
                                <span>Bộ lọc</span>
                            </button>
                            <button className='flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-200 backdrop-blur-sm'>
                                <Download className='h-4 w-4' />
                                <span>Xuất</span>
                            </button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className='p-6'>
                    <div className='space-y-4'>
                        {payments.map((payment: any) => {
                            const PaymentIcon = payment.icon;
                            return (
                                <div
                                    key={payment.id}
                                    className='group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 cursor-pointer'
                                    onClick={() => setSelectedPayment(payment)}
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
                                                    <span>{payment.time}</span>
                                                    <span>•</span>
                                                    <span>{payment.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-4'>
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
                                            <ChevronRight className='h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity' />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Dialog
                open={selectedPayment !== null}
                onOpenChange={() => setSelectedPayment(null)}
            >
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle>Chi tiết giao dịch</DialogTitle>
                    </DialogHeader>
                    {selectedPayment && (
                        <TransactionDetail payment={selectedPayment} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PaymentHistory2;
