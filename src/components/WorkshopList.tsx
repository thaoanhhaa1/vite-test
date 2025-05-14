import {
    CalendarIcon,
    ClockIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { LocateIcon } from 'lucide-react';

const WorkshopList = ({ workshops }) => {
    if (!workshops || workshops.length === 0) {
        return (
            <div className='text-center py-12 bg-gray-50 rounded-lg'>
                <p className='text-gray-500 text-lg'>
                    Hiện chưa có workshop nào được lên lịch.
                </p>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {workshops.map((workshop, index) => (
                <motion.div
                    key={workshop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{
                        y: -5,
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                    className='bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 transition-all'
                >
                    <div className='relative h-48 overflow-hidden'>
                        <img
                            src={workshop.image}
                            alt={workshop.title}
                            className='w-full h-full object-cover transition-transform duration-500 hover:scale-110'
                        />
                        <div className='absolute top-0 right-0 bg-[#E11E39] text-white px-3 py-1 m-3 rounded-full text-sm font-medium'>
                            {workshop.status === 'upcoming'
                                ? 'Sắp diễn ra'
                                : 'Đã kết thúc'}
                        </div>
                    </div>

                    <div className='p-6'>
                        <h3 className='text-xl font-bold mb-3 text-gray-800 line-clamp-2'>
                            {workshop.title}
                        </h3>

                        <div className='space-y-2 mb-4'>
                            <div className='flex items-center text-gray-600'>
                                <CalendarIcon className='h-5 w-5 mr-2 text-[#E11E39]' />
                                <span>{workshop.date}</span>
                            </div>

                            <div className='flex items-center text-gray-600'>
                                <ClockIcon className='h-5 w-5 mr-2 text-[#E11E39]' />
                                <span>{workshop.time}</span>
                            </div>

                            <div className='flex items-center text-gray-600'>
                                <LocateIcon className='h-5 w-5 mr-2 text-[#E11E39]' />
                                <span>{workshop.location}</span>
                            </div>

                            <div className='flex items-center text-gray-600'>
                                <UserGroupIcon className='h-5 w-5 mr-2 text-[#E11E39]' />
                                <span>{workshop.attendees} người tham dự</span>
                            </div>
                        </div>

                        <p className='text-gray-600 mb-6 line-clamp-3'>
                            {workshop.description}
                        </p>

                        <div className='flex justify-between items-center'>
                            <span className='text-[#E11E39] font-medium'>
                                {workshop.isFree
                                    ? 'Miễn phí'
                                    : `${workshop.price.toLocaleString()} VNĐ`}
                            </span>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='bg-[#E11E39] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#c91930] transition-colors'
                            >
                                Đăng ký tham gia
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default WorkshopList;
