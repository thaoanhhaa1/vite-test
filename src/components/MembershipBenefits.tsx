import React from 'react';
import { motion } from 'framer-motion';
import {
    AcademicCapIcon,
    UserGroupIcon,
    VideoCameraIcon,
    DocumentTextIcon,
    PhoneArrowDownLeftIcon,
} from '@heroicons/react/24/outline';
import { BadgeCheckIcon } from 'lucide-react';

const MembershipBenefits = () => {
    const benefits = [
        {
            id: 1,
            title: 'Thư viện tài liệu độc quyền',
            description:
                'Truy cập vào kho tài liệu chất lượng cao, được cập nhật thường xuyên với các nội dung mới nhất.',
            icon: DocumentTextIcon,
            color: 'bg-blue-100 text-blue-600',
        },
        {
            id: 2,
            title: 'Workshop chuyên sâu',
            description:
                'Tham gia các buổi workshop do chuyên gia hàng đầu trong ngành tổ chức, học hỏi kiến thức và kỹ năng thực tế.',
            icon: UserGroupIcon,
            color: 'bg-purple-100 text-purple-600',
        },
        {
            id: 3,
            title: 'Khóa học trực tuyến',
            description:
                'Tiếp cận các khóa học chất lượng cao với nội dung được thiết kế riêng cho từng cấp độ.',
            icon: AcademicCapIcon,
            color: 'bg-green-100 text-green-600',
        },
        {
            id: 4,
            title: 'Webinar hàng tháng',
            description:
                'Tham gia các buổi webinar với các chuyên gia trong ngành, cập nhật xu hướng và kiến thức mới nhất.',
            icon: VideoCameraIcon,
            color: 'bg-yellow-100 text-yellow-600',
        },
        {
            id: 5,
            title: 'Chứng chỉ có giá trị',
            description:
                'Nhận chứng chỉ hoàn thành khóa học được công nhận rộng rãi trong ngành.',
            icon: BadgeCheckIcon,
            color: 'bg-red-100 text-red-600',
        },
        {
            id: 6,
            title: 'Hỗ trợ 24/7',
            description:
                'Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng giải đáp mọi thắc mắc của bạn.',
            icon: PhoneArrowDownLeftIcon,
            color: 'bg-indigo-100 text-indigo-600',
        },
    ];

    return (
        <div className='py-16 bg-white'>
            <div className='container mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='text-center mb-12'
                >
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                        Đặc quyền thành viên
                    </h2>
                    <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                        Khám phá những lợi ích độc quyền khi trở thành thành
                        viên của chúng tôi
                    </p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 },
                            }}
                            className='bg-white rounded-xl shadow-md p-6 border border-gray-100'
                        >
                            <div
                                className={`w-14 h-14 ${benefit.color} rounded-full flex items-center justify-center mb-4`}
                            >
                                <benefit.icon className='h-7 w-7' />
                            </div>

                            <h3 className='text-xl font-bold text-gray-800 mb-3'>
                                {benefit.title}
                            </h3>
                            <p className='text-gray-600'>
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MembershipBenefits;
