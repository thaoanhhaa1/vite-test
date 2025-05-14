import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const FeaturedMajors = ({ majors }) => {
    const featuredMajors = majors.filter((major) => major.featured).slice(0, 3);

    if (featuredMajors.length === 0) return null;

    return (
        <div className='py-12 bg-white'>
            <div className='container mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='mb-10'
                >
                    <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                        Ngành Học Nổi Bật
                    </h2>
                    <div className='w-20 h-1 bg-[#E11E39]'></div>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {featuredMajors.map((major, index) => (
                        <motion.div
                            key={major.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className='relative overflow-hidden rounded-xl group'
                        >
                            <div className='aspect-w-16 aspect-h-9 overflow-hidden'>
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    src={major.image}
                                    alt={major.name}
                                    className='w-full h-full object-cover'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>
                            </div>

                            <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                                <h3 className='text-2xl font-bold mb-2 group-hover:text-[#E11E39] transition-colors'>
                                    {major.name}
                                </h3>
                                <p className='text-white/80 mb-4 line-clamp-2'>
                                    {major.shortDescription}
                                </p>

                                <motion.a
                                    href={`/majors/${major.id}`}
                                    whileHover={{ x: 5 }}
                                    className='inline-flex items-center text-white font-medium group'
                                >
                                    Khám phá ngay
                                    <ArrowRightIcon className='h-5 w-5 ml-2 transition-transform group-hover:translate-x-1' />
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedMajors;
