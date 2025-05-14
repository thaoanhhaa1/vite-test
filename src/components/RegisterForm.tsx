import { motion } from 'framer-motion';
import { useState } from 'react';

const RegisterForm = ({ majorId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Giả lập API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });

        // Reset thông báo thành công sau 3 giây
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <>
            {submitted ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-green-50 p-4 rounded-lg border border-green-200 text-green-700 text-center'
                >
                    Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất có thể.
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label
                            htmlFor='name'
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Họ và tên
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                            placeholder='Nhập họ và tên của bạn'
                        />
                    </div>

                    <div className='mb-4'>
                        <label
                            htmlFor='email'
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Email
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                            placeholder='example@email.com'
                        />
                    </div>

                    <div className='mb-4'>
                        <label
                            htmlFor='phone'
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Số điện thoại
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type='tel'
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                            placeholder='0xxxxxxxxx'
                        />
                    </div>

                    <div className='mb-6'>
                        <label
                            htmlFor='message'
                            className='block text-gray-700 font-medium mb-2'
                        >
                            Lời nhắn
                        </label>
                        <motion.textarea
                            whileFocus={{ scale: 1.01 }}
                            id='message'
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            rows='4'
                            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all resize-none'
                            placeholder='Nhập câu hỏi hoặc thông tin bạn muốn tư vấn'
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full bg-[#E11E39] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#c91930] transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                        {isSubmitting ? 'Đang gửi...' : 'Đăng ký ngay'}
                    </motion.button>
                </form>
            )}
        </>
    );
};

export default RegisterForm;
