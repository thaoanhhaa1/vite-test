import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.98]);
    const headerBlur = useTransform(scrollY, [0, 50], [0, 8]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            style={{
                opacity: headerOpacity,
                backdropFilter: `blur(${headerBlur}px)`,
            }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-light-100/80 dark:bg-dark-100/80 shadow-md'
                    : 'bg-transparent'
            }`}
        >
            <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
                <a href='/' className='flex items-center'>
                    <motion.div whileHover={{ rotate: 5 }} className='mr-2'>
                        <svg
                            className='w-8 h-8 text-accent-purple dark:text-accent-pink'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                        >
                            <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
                        </svg>
                    </motion.div>
                    <span className='text-xl font-mono font-bold bg-gradient-to-r from-accent-blue to-accent-purple dark:from-accent-purple dark:to-accent-pink text-transparent bg-clip-text'>
                        DevBlog
                    </span>
                </a>

                <nav className='hidden md:flex items-center space-x-6'>
                    <a
                        href='/category/react'
                        className='font-medium text-dark-300 dark:text-light-200 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'
                    >
                        React
                    </a>
                    <a
                        href='/category/typescript'
                        className='font-medium text-dark-300 dark:text-light-200 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'
                    >
                        TypeScript
                    </a>
                    <a
                        href='/category/nodejs'
                        className='font-medium text-dark-300 dark:text-light-200 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'
                    >
                        Node.js
                    </a>
                    <a
                        href='/about'
                        className='font-medium text-dark-300 dark:text-light-200 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'
                    >
                        About
                    </a>
                </nav>

                <div className='flex items-center space-x-4'>
                    <SearchBar />
                    <ThemeToggle />
                    <button className='md:hidden'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 text-dark-300 dark:text-light-200'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
