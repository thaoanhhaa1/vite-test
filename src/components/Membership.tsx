import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MembershipBenefits from './MembershipBenefits';
import MembershipCard from './MembershipCard';
import RegistrationForm from './RegistrationForm';
import Testimonials from './Testimonials';

const Membership = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const membershipPlans = [
        {
            id: 'basic',
            name: 'Cơ bản',
            price: '299.000',
            period: 'tháng',
            description:
                'Dành cho người mới bắt đầu, muốn khám phá các tính năng cơ bản.',
            features: [
                'Truy cập thư viện tài liệu cơ bản',
                'Tham gia 2 workshop mỗi tháng',
                'Hỗ trợ qua email',
                'Cập nhật tin tức ngành',
            ],
            color: 'bg-white',
            popular: false,
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '599.000',
            period: 'tháng',
            description:
                'Dành cho người dùng muốn trải nghiệm đầy đủ các tính năng cao cấp.',
            features: [
                'Tất cả tính năng của gói Cơ bản',
                'Truy cập không giới hạn thư viện tài liệu',
                'Tham gia không giới hạn workshop',
                'Hỗ trợ ưu tiên 24/7',
                'Tư vấn 1-1 với chuyên gia (2 giờ/tháng)',
                'Chứng chỉ khóa học có giá trị',
            ],
            color: 'bg-gradient-to-br from-[#E11E39] to-[#FF4D6D]',
            popular: true,
        },
        {
            id: 'enterprise',
            name: 'Doanh nghiệp',
            price: '1.299.000',
            period: 'tháng',
            description:
                'Giải pháp toàn diện cho doanh nghiệp với nhiều người dùng.',
            features: [
                'Tất cả tính năng của gói Premium',
                'Đào tạo riêng cho doanh nghiệp',
                'Quản lý tài khoản tập trung',
                'Báo cáo phân tích chi tiết',
                'Tùy chỉnh theo nhu cầu doanh nghiệp',
                'Hỗ trợ triển khai và tích hợp',
            ],
            color: 'bg-white',
            popular: false,
        },
    ];

    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
        setShowForm(true);

        // Cuộn đến form đăng ký
        setTimeout(() => {
            document.getElementById('registration-form').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 100);
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Banner */}
            <div className='bg-gradient-to-r from-[#E11E39] to-[#FF4D6D] text-white'>
                <div className='container mx-auto px-4 py-16 md:py-24'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className='max-w-3xl mx-auto text-center'
                    >
                        <h1 className='text-4xl md:text-5xl font-bold mb-6'>
                            Nâng Tầm Trải Nghiệm Với Membership
                        </h1>
                        <p className='text-xl opacity-90 mb-8'>
                            Trở thành thành viên để mở khóa đặc quyền độc đáo và
                            tối ưu hóa hành trình học tập của bạn
                        </p>
                        <motion.a
                            href='#plans'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='inline-flex items-center bg-white text-[#E11E39] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
                        >
                            Khám phá các gói thành viên
                            <ChevronDownIcon className='h-5 w-5 ml-2 animate-bounce' />
                        </motion.a>
                    </motion.div>
                </div>

                {/* Wave divider */}
                <div className='w-full'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 1440 120'
                        className='w-full h-auto fill-gray-50'
                    >
                        <path d='M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z'></path>
                    </svg>
                </div>
            </div>

            {/* Membership Benefits */}
            <MembershipBenefits />

            {/* Membership Plans */}
            <div id='plans' className='py-16 bg-white'>
                <div className='container mx-auto px-4'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className='text-center mb-12'
                    >
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                            Chọn Gói Phù Hợp Với Bạn
                        </h2>
                        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                            Chúng tôi cung cấp nhiều lựa chọn để đáp ứng nhu cầu
                            và ngân sách của bạn
                        </p>
                    </motion.div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                        {membershipPlans.map((plan, index) => (
                            <MembershipCard
                                key={plan.id}
                                plan={plan}
                                index={index}
                                onSelect={() => handlePlanSelect(plan.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <Testimonials />

            {/* Registration Form */}
            <div id='registration-form' className='py-16 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className='text-center mb-12'
                    >
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                            Đăng Ký Thành Viên
                        </h2>
                        <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                            Hoàn tất thông tin đăng ký để bắt đầu trải nghiệm
                            đặc quyền thành viên
                        </p>
                    </motion.div>

                    <RegistrationForm
                        isVisible={showForm}
                        selectedPlan={selectedPlan}
                        plans={membershipPlans}
                    />
                </div>
            </div>

            {/* FAQ Section */}
            <div className='py-16 bg-white'>
                <div className='container mx-auto px-4 max-w-4xl'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className='text-center mb-12'
                    >
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                            Câu Hỏi Thường Gặp
                        </h2>
                        <p className='text-lg text-gray-600'>
                            Giải đáp những thắc mắc phổ biến về chương trình
                            thành viên
                        </p>
                    </motion.div>

                    <div className='space-y-4'>
                        <FaqItem
                            question='Tôi có thể nâng cấp hoặc hạ cấp gói thành viên không?'
                            answer='Có, bạn có thể dễ dàng nâng cấp hoặc hạ cấp gói thành viên bất kỳ lúc nào. Việc nâng cấp sẽ có hiệu lực ngay lập tức, trong khi hạ cấp sẽ có hiệu lực vào kỳ thanh toán tiếp theo.'
                        />
                        <FaqItem
                            question='Chính sách hoàn tiền như thế nào?'
                            answer='Chúng tôi cung cấp chính sách hoàn tiền trong vòng 7 ngày đầu tiên sau khi đăng ký. Nếu bạn không hài lòng với dịch vụ, bạn có thể yêu cầu hoàn tiền đầy đủ trong thời gian này.'
                        />
                        <FaqItem
                            question='Tôi có thể hủy đăng ký bất kỳ lúc nào không?'
                            answer='Có, bạn có thể hủy đăng ký bất kỳ lúc nào. Sau khi hủy, bạn vẫn có thể sử dụng dịch vụ cho đến hết kỳ thanh toán hiện tại.'
                        />
                        <FaqItem
                            question='Gói doanh nghiệp có giới hạn số lượng người dùng không?'
                            answer='Gói doanh nghiệp cơ bản bao gồm 10 người dùng. Nếu doanh nghiệp của bạn cần thêm người dùng, chúng tôi cung cấp các gói mở rộng với giá ưu đãi. Vui lòng liên hệ với đội ngũ bán hàng để biết thêm chi tiết.'
                        />
                        <FaqItem
                            question='Làm thế nào để tôi có thể nhận hỗ trợ kỹ thuật?'
                            answer='Tất cả các thành viên đều có quyền truy cập vào hỗ trợ kỹ thuật qua email. Các thành viên Premium và Doanh nghiệp được hưởng hỗ trợ ưu tiên 24/7 qua chat trực tuyến và điện thoại.'
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className='bg-gradient-to-r from-[#E11E39] to-[#FF4D6D] text-white py-16'>
                <div className='container mx-auto px-4 text-center'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                            Sẵn sàng nâng cấp trải nghiệm của bạn?
                        </h2>
                        <p className='text-xl opacity-90 mb-8 max-w-3xl mx-auto'>
                            Đăng ký ngay hôm nay và khám phá thế giới đặc quyền
                            dành riêng cho thành viên
                        </p>
                        <motion.a
                            href='#plans'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='inline-flex items-center bg-white text-[#E11E39] font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
                        >
                            Trở thành thành viên ngay
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className='border border-gray-200 rounded-lg overflow-hidden'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex justify-between items-center w-full px-6 py-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition-colors'
            >
                <span>{question}</span>
                <ChevronDownIcon
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                />
            </button>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className='overflow-hidden'
            >
                <div className='px-6 py-4 bg-gray-50 text-gray-600'>
                    {answer}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Membership;
