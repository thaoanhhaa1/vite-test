import { motion } from 'framer-motion';

const categories = [
    { name: 'React', count: 24 },
    { name: 'TypeScript', count: 18 },
    { name: 'Node.js', count: 12 },
    { name: 'Next.js', count: 9 },
    { name: 'GraphQL', count: 7 },
    { name: 'TailwindCSS', count: 5 },
];

const popularTags = [
    'JavaScript',
    'React',
    'TypeScript',
    'Node.js',
    'CSS',
    'HTML',
    'Frontend',
    'Backend',
    'Web Development',
    'API',
    'Performance',
];

const featuredPosts = [
    { id: '1', title: 'Tối ưu hiệu suất React với useMemo và useCallback' },
    { id: '2', title: 'TypeScript Generic Types cho người mới bắt đầu' },
    { id: '3', title: 'Xây dựng API với Node.js và Express' },
    { id: '4', title: 'CSS Grid vs Flexbox: Khi nào sử dụng cái nào?' },
];

const Sidebar: React.FC = () => {
    return (
        <aside className='w-full lg:w-80 space-y-8'>
            {/* Phần tìm kiếm */}
            <div className='bg-light-100 dark:bg-dark-200 p-6 rounded-xl shadow-md'>
                <h3 className='text-xl font-bold mb-4 text-dark-300 dark:text-light-100 font-mono'>
                    Tìm kiếm
                </h3>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Tìm kiếm bài viết...'
                        className='w-full px-4 py-2 rounded-lg bg-light-200 dark:bg-dark-300 text-dark-300 dark:text-light-100 focus:outline-none focus:ring-2 focus:ring-accent-blue dark:focus:ring-accent-pink'
                    />
                    <button className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 text-dark-200 dark:text-light-200'
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
                    </button>
                </div>
            </div>

            {/* Danh mục */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='bg-light-100 dark:bg-dark-200 p-6 rounded-xl shadow-md'
            >
                <h3 className='text-xl font-bold mb-4 text-dark-300 dark:text-light-100 font-mono'>
                    Danh mục
                </h3>
                <ul className='space-y-2'>
                    {categories.map((category) => (
                        <li key={category.name}>
                            <a
                                href={`/category/${category.name.toLowerCase()}`}
                                className='flex items-center justify-between py-2 text-dark-200 dark:text-light-200 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'
                            >
                                <span>{category.name}</span>
                                <span className='bg-light-200 dark:bg-dark-300 px-2 py-1 rounded-full text-xs'>
                                    {category.count}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Tags phổ biến */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className='bg-light-100 dark:bg-dark-200 p-6 rounded-xl shadow-md'
            >
                <h3 className='text-xl font-bold mb-4 text-dark-300 dark:text-light-100 font-mono'>
                    Tags phổ biến
                </h3>
                <div className='flex flex-wrap gap-2'>
                    {popularTags.map((tag) => (
                        <a
                            key={tag}
                            href={`/tag/${tag.toLowerCase()}`}
                            className='px-3 py-1 bg-light-200 dark:bg-dark-300 rounded-full text-sm text-dark-300 dark:text-light-200 hover:bg-accent-blue hover:text-white dark:hover:bg-accent-pink transition-colors'
                        >
                            {tag}
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Bài viết nổi bật */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className='bg-light-100 dark:bg-dark-200 p-6 rounded-xl shadow-md'
            >
                <h3 className='text-xl font-bold mb-4 text-dark-300 dark:text-light-100 font-mono'>
                    Bài viết nổi bật
                </h3>
                <ul className='space-y-4'>
                    {featuredPosts.map((post) => (
                        <li key={post.id}>
                            <a
                                href={`/post/${post.id}`}
                                className='block text-dark-300 dark:text-light-200 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'
                            >
                                <div className='text-sm font-medium line-clamp-2'>
                                    {post.title}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </aside>
    );
};

export default Sidebar;
