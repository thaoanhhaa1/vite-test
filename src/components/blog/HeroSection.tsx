import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
    const parallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!parallaxRef.current) return;

            const x = (window.innerWidth - e.pageX) / 100;
            const y = (window.innerHeight - e.pageY) / 100;

            parallaxRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-light-100 to-light-200 dark:from-dark-100 dark:to-dark-200'>
            {/* Hình nền với hiệu ứng parallax */}
            <div className='absolute inset-0 opacity-10 dark:opacity-20'>
                <div ref={parallaxRef} className='absolute inset-0'>
                    <svg
                        width='100%'
                        height='100%'
                        viewBox='0 0 100 100'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <defs>
                            <pattern
                                id='grid'
                                width='10'
                                height='10'
                                patternUnits='userSpaceOnUse'
                            >
                                <path
                                    d='M 10 0 L 0 0 0 10'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='0.5'
                                />
                            </pattern>
                        </defs>
                        <rect
                            width='100%'
                            height='100%'
                            fill='url(#grid)'
                            className='text-accent-blue dark:text-accent-purple'
                        />
                    </svg>
                </div>
            </div>

            <div className='container mx-auto px-4 z-10'>
                <div className='max-w-3xl mx-auto text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className='text-4xl md:text-6xl font-bold mb-6 font-mono'>
                            <span className='bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-transparent bg-clip-text'>
                                Coding Insights
                            </span>
                            <span className='text-dark-300 dark:text-light-100'>
                                {' '}
                                for Modern Developers
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className='text-lg md:text-xl text-dark-200 dark:text-light-200 mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Khám phá các bài viết chuyên sâu về React, TypeScript,
                        và các công nghệ web hiện đại. Nâng cao kỹ năng lập
                        trình của bạn với những hướng dẫn thực tế và mẹo chuyên
                        nghiệp.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='flex flex-col sm:flex-row justify-center gap-4'
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-8 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple dark:from-accent-purple dark:to-accent-pink text-white font-medium shadow-lg hover:shadow-xl transition-all'
                        >
                            Khám phá bài viết
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-8 py-3 rounded-lg border-2 border-dark-200 dark:border-light-200 text-dark-300 dark:text-light-100 font-medium hover:bg-dark-100/5 dark:hover:bg-light-100/5 transition-all'
                        >
                            Đăng ký nhận tin
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Hình minh họa phía dưới */}
            <motion.div
                className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-light-100 dark:from-dark-100 to-transparent'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
            />
        </div>
    );
};

export default HeroSection;
