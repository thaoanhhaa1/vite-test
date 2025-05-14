import { XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const WorkshopModal = ({ isOpen, onClose, majorId }: any) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        isFree: true,
        price: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic tạo workshop
        console.log('Workshop data:', { ...formData, majorId });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className='bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center p-6 border-b'>
                            <h2 className='text-2xl font-bold text-gray-800'>
                                Tạo Workshop Mới
                            </h2>
                            <button
                                onClick={onClose}
                                className='text-gray-500 hover:text-gray-700 transition-colors'
                            >
                                <XMarkIcon className='h-6 w-6' />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='p-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                                <div>
                                    <label
                                        htmlFor='title'
                                        className='block text-gray-700 font-medium mb-2'
                                    >
                                        Tên workshop
                                    </label>
                                    <input
                                        type='text'
                                        id='title'
                                        name='title'
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                                        placeholder='Nhập tên workshop'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='image'
                                        className='block text-gray-700 font-medium mb-2'
                                    >
                                        Hình ảnh
                                    </label>
                                    <input
                                        type='file'
                                        id='image'
                                        name='image'
                                        onChange={handleChange}
                                        accept='image/*'
                                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='date'
                                        className='block text-gray-700 font-medium mb-2'
                                    >
                                        Ngày diễn ra
                                    </label>
                                    <input
                                        type='date'
                                        id='date'
                                        name='date'
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor='time'
                                        className='block text-gray-700 font-medium mb-2'
                                    >
                                        Thời gian
                                    </label>
                                    <input
                                        type='time'
                                        id='time'
                                        name='time'
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                                    />
                                </div>

                                <div className='md:col-span-2'>
                                    <label
                                        htmlFor='location'
                                        className='block text-gray-700 font-medium mb-2'
                                    >
                                        Địa điểm
                                    </label>
                                    <input
                                        type='text'
                                        id='location'
                                        name='location'
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                                        placeholder='Nhập địa điểm tổ chức'
                                    />
                                </div>

                                <div className='md:col-span-2'>
                                    <label
                                        htmlFor='description'
                                        className='block text-gray-700 font-medium mb-2'
                                    >
                                        Mô tả
                                    </label>
                                    <textarea
                                        id='description'
                                        name='description'
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows='4'
                                        required
                                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all resize-none'
                                        placeholder='Mô tả chi tiết về workshop'
                                    />
                                </div>

                                <div>
                                    <div className='flex items-center mb-2'>
                                        <input
                                            type='checkbox'
                                            id='isFree'
                                            name='isFree'
                                            checked={formData.isFree}
                                            onChange={handleChange}
                                            className='h-5 w-5 text-[#E11E39] rounded focus:ring-[#E11E39]'
                                        />
                                        <label
                                            htmlFor='isFree'
                                            className='ml-2 text-gray-700 font-medium'
                                        >
                                            Miễn phí tham dự
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor='price'
                                        className='block text-gray-700 font-medium mb-2'
                                    >
                                        Giá vé (VNĐ)
                                    </label>
                                    <input
                                        type='number'
                                        id='price'
                                        name='price'
                                        value={formData.price}
                                        onChange={handleChange}
                                        disabled={formData.isFree}
                                        className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-500'
                                        placeholder='Nhập giá vé'
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end space-x-4'>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type='button'
                                    onClick={onClose}
                                    className='px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors'
                                >
                                    Hủy bỏ
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type='submit'
                                    className='px-6 py-3 rounded-lg bg-[#E11E39] text-white font-medium hover:bg-[#c91930] transition-colors'
                                >
                                    Tạo workshop
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WorkshopModal;
