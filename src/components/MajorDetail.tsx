import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import WorkshopList from './WorkshopList';
import RegisterForm from './RegisterForm';
import WorkshopModal from './WorkshopModal';

const MajorDetail = ({ major }) => {
    const [showModal, setShowModal] = useState(false);
    const { scrollY } = useScroll();
    const titleScale = useTransform(scrollY, [0, 200], [1, 0.8]);

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Banner với hiệu ứng fade-in */}
            <motion.div
                className='relative h-[50vh] overflow-hidden'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <img
                    src={major.bannerImage}
                    alt={major.name}
                    className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end'>
                    <motion.div
                        style={{ scale: titleScale }}
                        className='container mx-auto px-6 pb-12'
                    >
                        <h1 className='text-5xl font-bold text-white mb-4'>
                            {major.name}
                        </h1>
                        <p className='text-xl text-white/90 max-w-2xl'>
                            {major.shortDescription}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Nội dung chính */}
            <div className='container mx-auto px-6 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Thông tin ngành */}
                    <div className='lg:col-span-2'>
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className='mb-12'
                        >
                            <h2 className='text-3xl font-bold mb-6 text-gray-800 border-l-4 border-[#E11E39] pl-4'>
                                Tổng quan ngành
                            </h2>
                            <div className='prose prose-lg max-w-none'>
                                {major.overview}
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className='mb-12'
                        >
                            <h2 className='text-3xl font-bold mb-6 text-gray-800 border-l-4 border-[#E11E39] pl-4'>
                                Cơ hội nghề nghiệp
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {major.careerOpportunities.map(
                                    (career, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.03 }}
                                            className='bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg'
                                        >
                                            <h3 className='text-xl font-semibold mb-3 text-[#E11E39]'>
                                                {career.title}
                                            </h3>
                                            <p className='text-gray-700'>
                                                {career.description}
                                            </p>
                                        </motion.div>
                                    ),
                                )}
                            </div>
                        </motion.section>

                        {/* Danh sách workshop */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <div className='flex justify-between items-center mb-6'>
                                <h2 className='text-3xl font-bold text-gray-800 border-l-4 border-[#E11E39] pl-4'>
                                    Workshop sắp diễn ra
                                </h2>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowModal(true)}
                                    className='bg-[#E11E39] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#c91930] transition-colors'
                                >
                                    Tạo Workshop
                                </motion.button>
                            </div>
                            <WorkshopList workshops={major.workshops} />
                        </motion.section>
                    </div>

                    {/* Sidebar - Form đăng ký tư vấn */}
                    <div className='lg:col-span-1'>
                        <div className='sticky top-24'>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className='bg-white rounded-lg shadow-md p-6 border-t-4 border-[#E11E39]'
                            >
                                <h3 className='text-2xl font-bold mb-6 text-center text-gray-800'>
                                    Đăng ký tư vấn
                                </h3>
                                <RegisterForm majorId={major.id} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal tạo workshop */}
            <WorkshopModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                majorId={major.id}
            />
        </div>
    );
};

export default MajorDetail;
