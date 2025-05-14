import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            role: 'Sinh viên Công nghệ thông tin',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            content:
                'Membership đã giúp tôi tiếp cận được nhiều tài liệu chất lượng cao và workshop chuyên sâu. Đặc biệt là các buổi tư vấn 1-1 với chuyên gia đã giúp tôi định hướng rõ ràng hơn cho sự nghiệp.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Trần Thị B',
            role: 'Nhà thiết kế UX/UI',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            content:
                'Tôi đã nâng cấp lên gói Premium và thực sự thấy xứng đáng với số tiền bỏ ra. Các workshop chuyên sâu về thiết kế và cộng đồng thành viên đã giúp tôi phát triển kỹ năng rất nhiều.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Lê Văn C',
            role: 'Giám đốc công ty phần mềm',
            avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
            content:
                'Gói Doanh nghiệp đã giúp công ty tôi đào tạo nhân viên hiệu quả với chi phí hợp lý. Khả năng tùy chỉnh theo nhu cầu và báo cáo phân tích chi tiết là những điểm cộng lớn.',
            rating: 4,
        },
    ];

    useEffect(() => {
        // Auto-slide testimonials
        const interval = setInterval(() => {
            setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % testimonials.length,
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className='relative overflow-hidden py-12'>
            <div className='absolute top-0 left-0 w-full h-full bg-[#E11E39]/5 -skew-y-3 transform origin-top-right z-0'></div>

            <div className='container mx-auto px-4 relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='text-center mb-12'
                >
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                        Thành viên nói gì về chúng tôi
                    </h2>
                    <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                        Khám phá trải nghiệm thực tế từ các thành viên đã tham
                        gia chương trình
                    </p>
                </motion.div>

                <div className='max-w-4xl mx-auto'>
                    <div className='relative'>
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{
                                    opacity: currentIndex === index ? 1 : 0,
                                    x: currentIndex === index ? 0 : 100,
                                    display:
                                        currentIndex === index
                                            ? 'block'
                                            : 'none',
                                }}
                                transition={{ duration: 0.5 }}
                                className='bg-white rounded-2xl shadow-xl p-8 md:p-10'
                            >
                                <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
                                    <div className='flex-shrink-0'>
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className='w-20 h-20 rounded-full object-cover border-4 border-[#E11E39]/20'
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <div className='flex items-center mb-2'>
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${
                                                        i < testimonial.rating
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                    fill='currentColor'
                                                    viewBox='0 0 20 20'
                                                >
                                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                                                </svg>
                                            ))}
                                        </div>

                                        <blockquote className='text-gray-700 text-lg italic mb-4'>
                                            "{testimonial.content}"
                                        </blockquote>

                                        <div>
                                            <h4 className='font-bold text-gray-900'>
                                                {testimonial.name}
                                            </h4>
                                            <p className='text-gray-500'>
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation dots */}
                    <div className='flex justify-center mt-6 space-x-2'>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    currentIndex === index
                                        ? 'bg-[#E11E39] w-6'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Xem đánh giá ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
