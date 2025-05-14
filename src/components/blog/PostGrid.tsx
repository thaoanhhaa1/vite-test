import { useState } from 'react';
import PostCard from './PostCard';

// Giả lập dữ liệu bài viết
const MOCK_POSTS = [
    {
        id: '1',
        title: 'Tối ưu hiệu suất React với useMemo và useCallback',
        excerpt:
            'Tìm hiểu cách sử dụng các hooks useMemo và useCallback để tránh render không cần thiết và tối ưu ứng dụng React của bạn.',
        coverImage:
            'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2',
        tags: ['React', 'Performance', 'Hooks'],
        date: '15/05/2023',
        readTime: '8',
    },
    {
        id: '2',
        title: 'TypeScript Generic Types cho người mới bắt đầu',
        excerpt:
            'Hướng dẫn toàn diện về Generic Types trong TypeScript và cách áp dụng chúng để viết code linh hoạt hơn.',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        tags: ['TypeScript', 'Generic', 'Tutorial'],
        date: '02/06/2023',
        readTime: '10',
    },
    // Thêm nhiều bài viết khác...
];

const PostGrid: React.FC = () => {
    const [posts, setPosts] = useState(MOCK_POSTS);
    const [isLoading, setIsLoading] = useState(false);

    // Giả lập việc tải thêm bài viết
    const loadMorePosts = () => {
        setIsLoading(true);

        // Giả lập API call
        setTimeout(() => {
            const newPosts = [
                ...posts,
                ...MOCK_POSTS.map((post) => ({
                    ...post,
                    id: `${parseInt(post.id) + posts.length}`,
                })),
            ];

            setPosts(newPosts);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <section className='py-16 bg-light-100 dark:bg-dark-100'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold mb-8 text-dark-300 dark:text-light-100 font-mono'>
                    Bài viết mới nhất
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {posts.map((post) => (
                        <PostCard key={post.id} {...post} />
                    ))}
                </div>

                <div className='mt-12 text-center'>
                    <button
                        onClick={loadMorePosts}
                        disabled={isLoading}
                        className='px-6 py-3 rounded-lg bg-dark-200 dark:bg-light-200 text-light-100 dark:text-dark-100 font-medium hover:bg-dark-300 dark:hover:bg-light-300 transition-colors disabled:opacity-50'
                    >
                        {isLoading ? (
                            <span className='flex items-center justify-center'>
                                <svg
                                    className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                >
                                    <circle
                                        className='opacity-25'
                                        cx='12'
                                        cy='12'
                                        r='10'
                                        stroke='currentColor'
                                        strokeWidth='4'
                                    ></circle>
                                    <path
                                        className='opacity-75'
                                        fill='currentColor'
                                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                    ></path>
                                </svg>
                                Đang tải...
                            </span>
                        ) : (
                            'Xem thêm bài viết'
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PostGrid;
