import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Xử lý click bên ngoài để thu gọn thanh tìm kiếm
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Xử lý khi người dùng nhấn Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            // Thực hiện tìm kiếm
            console.log('Searching for:', searchQuery);
            // Ở đây bạn có thể chuyển hướng đến trang kết quả tìm kiếm
            // history.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className='relative' ref={inputRef}>
            <motion.div
                animate={{ width: isExpanded ? '200px' : '40px' }}
                transition={{ duration: 0.3 }}
                className='relative flex items-center'
            >
                <motion.input
                    initial={false}
                    animate={{
                        width: isExpanded ? '100%' : '0%',
                        padding: isExpanded
                            ? '0.5rem 2.5rem 0.5rem 0.75rem'
                            : '0.5rem 0',
                        opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    type='text'
                    placeholder='Tìm kiếm...'
                    className='bg-light-200 dark:bg-dark-300 rounded-full text-dark-300 dark:text-light-100 focus:outline-none focus:ring-2 focus:ring-accent-blue dark:focus:ring-accent-pink'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        setIsExpanded(!isExpanded);
                        if (!isExpanded) {
                            setTimeout(() => inputRef.current?.focus(), 300);
                        }
                    }}
                    className={`absolute ${
                        isExpanded ? 'right-2' : 'right-0'
                    } p-2 rounded-full text-dark-300 dark:text-light-200 hover:text-accent-blue dark:hover:text-accent-pink transition-colors`}
                    aria-label='Search'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                    </svg>
                </motion.button>
            </motion.div>

            {/* Dropdown kết quả tìm kiếm */}
            <AnimatePresence>
                {isExpanded && searchQuery.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className='absolute right-0 mt-2 w-64 bg-light-100 dark:bg-dark-200 rounded-lg shadow-lg overflow-hidden z-10'
                    >
                        <div className='p-2 text-sm text-dark-200 dark:text-light-300'>
                            Đang tìm kiếm "{searchQuery}"...
                        </div>
                        {/* Kết quả tìm kiếm sẽ được hiển thị ở đây */}
                        {/* Ví dụ:
            <div className="border-t border-light-200 dark:border-dark-300">
              <a href="#" className="block p-2 hover:bg-light-200 dark:hover:bg-dark-300 transition-colors">
                <div className="font-medium text-dark-300 dark:text-light-100">Kết quả tìm kiếm 1</div>
                <div className="text-sm text-dark-200 dark:text-light-300">Mô tả ngắn về kết quả...</div>
              </a>
            </div>
            */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
