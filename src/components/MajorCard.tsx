import {
    ArrowRightIcon,
    ClockIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MajorCard = ({ major, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -8,
                boxShadow:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transition: { duration: 0.2 },
            }}
            className='bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col relative group'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Badge cho ngành nổi bật */}
            {major.featured && (
                <div className='absolute top-3 right-3 z-10'>
                    <span className='bg-[#E11E39] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md'>
                        Nổi bật
                    </span>
                </div>
            )}

            {/* Phần hình ảnh */}
            <div className='relative h-48 overflow-hidden'>
                <motion.img
                    src={major.image}
                    alt={major.name}
                    className='w-full h-full object-cover'
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.4 }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>

            {/* Phần nội dung */}
            <div className='p-5 flex-1 flex flex-col'>
                <div className='flex-1'>
                    <h3 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-[#E11E39] transition-colors duration-300'>
                        {major.name}
                    </h3>
                    <p className='text-gray-600 text-sm mb-4'>
                        {major.shortDescription}
                    </p>

                    <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                        <div className='flex items-center'>
                            <UserGroupIcon className='h-4 w-4 mr-1 text-[#E11E39]' />
                            <span>{major.students} sinh viên</span>
                        </div>
                        <div className='flex items-center'>
                            <ClockIcon className='h-4 w-4 mr-1 text-[#E11E39]' />
                            <span>{major.duration}</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    animate={{
                        y: isHovered ? 0 : 10,
                        opacity: isHovered ? 1 : 0,
                    }}
                    initial={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='mt-auto'
                >
                    <motion.a
                        href={`/majors/${major.id}`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className='inline-flex items-center text-[#E11E39] font-medium text-sm'
                    >
                        Xem chi tiết
                        <ArrowRightIcon className='h-4 w-4 ml-1 transition-transform group-hover:translate-x-1' />
                    </motion.a>
                </motion.div>
            </div>

            {/* Overlay khi hover */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className='absolute bottom-0 left-0 right-0 h-1 bg-[#E11E39]'
            ></motion.div>
        </motion.div>
    );
};

export default MajorCard;
