import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MajorCard from './MajorCard';

const MajorList = () => {
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        // Giả lập API call để lấy danh sách ngành
        const fetchMajors = async () => {
            setLoading(true);
            try {
                // Thay thế bằng API call thực tế
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Dữ liệu mẫu
                const sampleMajors = [
                    {
                        id: 1,
                        name: 'Công nghệ thông tin',
                        shortDescription:
                            'Chuyên ngành đào tạo về lập trình, phát triển phần mềm và quản trị hệ thống CNTT.',
                        image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2',
                        category: 'technology',
                        students: 1250,
                        duration: '4 năm',
                        featured: true,
                    },
                    {
                        id: 2,
                        name: 'Thiết kế đồ họa',
                        shortDescription:
                            'Đào tạo chuyên sâu về thiết kế, sáng tạo nội dung và xây dựng thương hiệu.',
                        image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9',
                        category: 'design',
                        students: 850,
                        duration: '4 năm',
                        featured: true,
                    },
                    {
                        id: 3,
                        name: 'Quản trị kinh doanh',
                        shortDescription:
                            'Trang bị kiến thức và kỹ năng quản lý, điều hành doanh nghiệp hiệu quả.',
                        image: 'https://images.unsplash.com/photo-1664575599736-c5197c684128',
                        category: 'business',
                        students: 1100,
                        duration: '4 năm',
                        featured: false,
                    },
                    {
                        id: 4,
                        name: 'Marketing số',
                        shortDescription:
                            'Đào tạo chuyên gia marketing trong thời đại công nghệ số và truyền thông đa phương tiện.',
                        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312',
                        category: 'business',
                        students: 920,
                        duration: '4 năm',
                        featured: true,
                    },
                    {
                        id: 5,
                        name: 'Khoa học dữ liệu',
                        shortDescription:
                            'Chuyên ngành về phân tích dữ liệu, trí tuệ nhân tạo và học máy.',
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
                        category: 'technology',
                        students: 780,
                        duration: '4 năm',
                        featured: false,
                    },
                    {
                        id: 6,
                        name: 'Ngôn ngữ Anh',
                        shortDescription:
                            'Đào tạo kỹ năng ngôn ngữ Anh chuyên sâu cho công việc quốc tế.',
                        image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d',
                        category: 'language',
                        students: 950,
                        duration: '4 năm',
                        featured: false,
                    },
                    {
                        id: 7,
                        name: 'Kỹ thuật phần mềm',
                        shortDescription:
                            'Chuyên sâu về quy trình phát triển phần mềm chuyên nghiệp và quản lý dự án.',
                        image: 'https://images.unsplash.com/photo-1573495627361-d9b87960b12d',
                        category: 'technology',
                        students: 890,
                        duration: '4 năm',
                        featured: false,
                    },
                    {
                        id: 8,
                        name: 'Truyền thông đa phương tiện',
                        shortDescription:
                            'Đào tạo sản xuất nội dung số, phim ảnh và truyền thông hiện đại.',
                        image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
                        category: 'media',
                        students: 720,
                        duration: '4 năm',
                        featured: true,
                    },
                ];

                setMajors(sampleMajors);
            } catch (error) {
                console.error('Error fetching majors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMajors();
    }, []);

    const filteredMajors =
        activeFilter === 'all'
            ? majors
            : majors.filter((major) => major.category === activeFilter);

    const categories = [
        { id: 'all', name: 'Tất cả ngành' },
        { id: 'technology', name: 'Công nghệ' },
        { id: 'business', name: 'Kinh doanh' },
        { id: 'design', name: 'Thiết kế' },
        { id: 'media', name: 'Truyền thông' },
        { id: 'language', name: 'Ngôn ngữ' },
    ];

    return (
        <div className='py-12 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='text-center mb-12'
                >
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                        Khám Phá Các Ngành Học
                    </h2>
                    <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                        Tìm hiểu về các ngành đào tạo chất lượng cao, đáp ứng
                        nhu cầu nhân lực trong thời đại số
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='flex flex-wrap justify-center gap-3 mb-10'
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 17,
                            }}
                            onClick={() => setActiveFilter(category.id)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeFilter === category.id
                                    ? 'bg-[#E11E39] text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Majors Grid */}
                {loading ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {[...Array(8)].map((_, index) => (
                            <div
                                key={index}
                                className='bg-white rounded-xl shadow-md overflow-hidden h-80 animate-pulse'
                            >
                                <div className='h-40 bg-gray-200'></div>
                                <div className='p-5 space-y-3'>
                                    <div className='h-6 bg-gray-200 rounded w-3/4'></div>
                                    <div className='h-4 bg-gray-200 rounded'></div>
                                    <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                                    <div className='h-8 bg-gray-200 rounded w-1/3 mt-4'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {filteredMajors.map((major, index) => (
                            <MajorCard
                                key={major.id}
                                major={major}
                                index={index}
                            />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredMajors.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='text-center py-16'
                    >
                        <svg
                            className='mx-auto h-16 w-16 text-gray-400'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={1.5}
                                d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        <h3 className='mt-4 text-lg font-medium text-gray-900'>
                            Không tìm thấy ngành nào
                        </h3>
                        <p className='mt-2 text-gray-500'>
                            Vui lòng thử chọn danh mục khác.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MajorList;
