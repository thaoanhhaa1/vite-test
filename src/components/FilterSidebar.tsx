import React from 'react';
import { motion } from 'framer-motion';

const FilterSidebar = ({ selectedCategory, onCategoryChange }) => {
    const categories = [
        { id: 'all', name: 'Tất cả danh mục' },
        { id: 'design', name: 'Thiết kế' },
        { id: 'programming', name: 'Lập trình' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'soft-skills', name: 'Kỹ năng mềm' },
        { id: 'business', name: 'Kinh doanh' },
        { id: 'other', name: 'Khác' },
    ];

    return (
        <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-bold text-gray-800 mb-4 border-b pb-2'>
                Bộ lọc
            </h3>

            <div className='mb-6'>
                <h4 className='font-medium text-gray-700 mb-3'>Danh mục</h4>
                <div className='space-y-2'>
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            className='flex items-center'
                        >
                            <input
                                type='radio'
                                id={`category-${category.id}`}
                                name='category'
                                checked={selectedCategory === category.id}
                                onChange={() => onCategoryChange(category.id)}
                                className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                            />
                            <label
                                htmlFor={`category-${category.id}`}
                                className={`ml-2 text-sm ${
                                    selectedCategory === category.id
                                        ? 'font-medium text-[#E11E39]'
                                        : 'text-gray-700'
                                }`}
                            >
                                {category.name}
                            </label>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className='mb-6'>
                <h4 className='font-medium text-gray-700 mb-3'>Giá</h4>
                <div className='space-y-2'>
                    <motion.div
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center'
                    >
                        <input
                            type='checkbox'
                            id='price-free'
                            className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                        />
                        <label
                            htmlFor='price-free'
                            className='ml-2 text-sm text-gray-700'
                        >
                            Miễn phí
                        </label>
                    </motion.div>
                    <motion.div
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center'
                    >
                        <input
                            type='checkbox'
                            id='price-paid'
                            className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                        />
                        <label
                            htmlFor='price-paid'
                            className='ml-2 text-sm text-gray-700'
                        >
                            Có phí
                        </label>
                    </motion.div>
                </div>
            </div>

            <div className='mb-6'>
                <h4 className='font-medium text-gray-700 mb-3'>Thời gian</h4>
                <div className='space-y-2'>
                    <motion.div
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center'
                    >
                        <input
                            type='checkbox'
                            id='time-this-week'
                            className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                        />
                        <label
                            htmlFor='time-this-week'
                            className='ml-2 text-sm text-gray-700'
                        >
                            Tuần này
                        </label>
                    </motion.div>
                    <motion.div
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center'
                    >
                        <input
                            type='checkbox'
                            id='time-this-month'
                            className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                        />
                        <label
                            htmlFor='time-this-month'
                            className='ml-2 text-sm text-gray-700'
                        >
                            Tháng này
                        </label>
                    </motion.div>
                    <motion.div
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex items-center'
                    >
                        <input
                            type='checkbox'
                            id='time-next-month'
                            className='h-4 w-4 text-[#E11E39] focus:ring-[#E11E39]'
                        />
                        <label
                            htmlFor='time-next-month'
                            className='ml-2 text-sm text-gray-700'
                        >
                            Tháng sau
                        </label>
                    </motion.div>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm'
            >
                Xóa bộ lọc
            </motion.button>
        </div>
    );
};

export default FilterSidebar;
