import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../blog/Layout';
import AuthorInfo from './AuthorInfo';
import TableOfContents from './TableOfContents';
import ShareButtons from './ShareButtons';
import ContentRenderer from './ContentRenderer';
import TagBadge from '../blog/TagBadge';
import PostComments from './PostComments';
import RelatedPosts from './RelatedPosts';

// Giả lập dữ liệu bài viết
const MOCK_POST = {
    id: '1',
    title: 'Tối ưu hiệu suất React với useMemo và useCallback',
    excerpt:
        'Tìm hiểu cách sử dụng các hooks useMemo và useCallback để tránh render không cần thiết và tối ưu ứng dụng React của bạn.',
    coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2',
    content: `
  # Tối ưu hiệu suất React với useMemo và useCallback

  React Hooks đã thay đổi cách chúng ta viết các component trong React. Trong số các hooks được cung cấp, \`useMemo\` và \`useCallback\` là hai hooks quan trọng giúp tối ưu hiệu suất ứng dụng.

  ## Vấn đề với Re-renders

  Trong React, mỗi khi state hoặc props thay đổi, component sẽ được render lại. Điều này có thể dẫn đến các vấn đề hiệu suất nếu component của bạn thực hiện các tính toán phức tạp hoặc render nhiều phần tử.

  ## useMemo - Ghi nhớ giá trị tính toán

  \`useMemo\` cho phép bạn "ghi nhớ" kết quả của một hàm tính toán, và chỉ tính toán lại khi một trong các dependencies thay đổi.

  ### Ví dụ sử dụng useMemo:

  \`\`\`special:useMemo-example\`\`\`

  ## useCallback - Ghi nhớ hàm callback

  \`useCallback\` tương tự như \`useMemo\`, nhưng nó được sử dụng để ghi nhớ các hàm callback thay vì giá trị tính toán.

  ### Ví dụ sử dụng useCallback:

  \`\`\`special:useCallback-example\`\`\`

  ## Khi nào nên sử dụng useMemo và useCallback?

  Không phải lúc nào cũng cần sử dụng \`useMemo\` và \`useCallback\`. Chỉ nên sử dụng chúng khi:

  1. Bạn có các tính toán phức tạp, tốn nhiều thời gian
  2. Bạn truyền hàm callback xuống các component con được tối ưu với React.memo
  3. Bạn cần đảm bảo tham chiếu không thay đổi giữa các lần render

  ## Kết luận

  \`useMemo\` và \`useCallback\` là các công cụ mạnh mẽ để tối ưu hiệu suất trong React. Tuy nhiên, hãy nhớ rằng việc sử dụng quá mức có thể làm code phức tạp hơn mà không mang lại lợi ích đáng kể về hiệu suất.
  `,
    publishedAt: '2023-05-15',
    author: {
        name: 'Nguyễn Văn A',
        avatar: 'https://i.pravatar.cc/150?img=12',
        bio: 'Senior Frontend Developer với hơn 5 năm kinh nghiệm làm việc với React và các công nghệ JavaScript hiện đại.',
        twitter: '@nguyenvana',
        github: 'nguyenvana',
    },
    tags: ['React', 'Hooks', 'Performance', 'JavaScript', 'Frontend'],
    comments: [
        {
            id: 'c1',
            author: 'Trần Thị B',
            avatar: 'https://i.pravatar.cc/150?img=25',
            content:
                'Bài viết rất hữu ích! Tôi đã áp dụng useMemo cho một component có tính toán phức tạp và thấy hiệu suất cải thiện đáng kể.',
            publishedAt: '2023-05-16',
            likes: 5,
        },
        {
            id: 'c2',
            author: 'Lê Văn C',
            avatar: 'https://i.pravatar.cc/150?img=67',
            content:
                'Tôi thường gặp khó khăn khi quyết định khi nào nên sử dụng useMemo và useCallback. Bài viết này đã giúp tôi hiểu rõ hơn. Cảm ơn tác giả!',
            publishedAt: '2023-05-17',
            likes: 3,
            replies: [
                {
                    id: 'r1',
                    author: 'Nguyễn Văn A',
                    avatar: 'https://i.pravatar.cc/150?img=12',
                    content:
                        'Rất vui khi bài viết có ích cho bạn! Nếu bạn có thắc mắc gì thêm, đừng ngại hỏi nhé.',
                    publishedAt: '2023-05-17',
                    likes: 2,
                },
            ],
        },
    ],
    relatedPosts: [
        {
            id: '2',
            title: 'Hiểu sâu về React Fiber và cơ chế Reconciliation',
            excerpt:
                'Tìm hiểu cách React Fiber hoạt động và cải thiện hiệu suất ứng dụng của bạn.',
            coverImage:
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
            tags: ['React', 'Performance', 'Advanced'],
        },
        {
            id: '3',
            title: 'Tối ưu bundle size với code splitting trong React',
            excerpt:
                'Học cách giảm kích thước bundle và cải thiện thời gian tải trang với React.lazy và Suspense.',
            coverImage:
                'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8',
            tags: ['React', 'Performance', 'Webpack'],
        },
        {
            id: '4',
            title: 'Custom Hooks trong React: Tái sử dụng logic một cách hiệu quả',
            excerpt:
                'Tạo và sử dụng custom hooks để tái sử dụng logic giữa các components.',
            coverImage:
                'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
            tags: ['React', 'Hooks', 'JavaScript'],
        },
    ],
};

const PostDetail: React.FC = () => {
    // const { id } = useParams<{ id: string }>();
    const id = '1';
    const [post, setPost] = useState(MOCK_POST);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Giả lập việc tải dữ liệu
        const timer = setTimeout(() => {
            // Trong thực tế, bạn sẽ fetch dữ liệu từ API dựa vào id
            setPost(MOCK_POST);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    if (isLoading) {
        return (
            <Layout showSidebar={false}>
                <div className='flex justify-center items-center min-h-[60vh]'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-blue dark:border-accent-pink'></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout showSidebar={false}>
            {/* Hero section với ảnh bìa và tiêu đề */}
            <div className='relative h-[50vh] min-h-[400px] bg-dark-300'>
                <div className='absolute inset-0 overflow-hidden'>
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className='w-full h-full object-cover opacity-40'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-dark-300'></div>
                </div>

                <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='container mx-auto px-4 text-center'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-mono'>
                                {post.title}
                            </h1>
                            <p className='text-xl text-light-200 mb-6 max-w-3xl mx-auto'>
                                {post.excerpt}
                            </p>
                            <div className='flex items-center justify-center space-x-4 text-light-300'>
                                <span>
                                    {new Date(
                                        post.publishedAt,
                                    ).toLocaleDateString('vi-VN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                                <span>•</span>
                                <span>5 phút đọc</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-4 py-12'>
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Sidebar */}
                    <div className='lg:w-1/4 order-2 lg:order-1'>
                        <div className='sticky top-24 space-y-8'>
                            <AuthorInfo author={post.author} />
                            <TableOfContents content={post.content} />
                            <ShareButtons title={post.title} />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className='lg:w-3/4 order-1 lg:order-2'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Render markdown content */}
                            <div className='mb-12'>
                                <ContentRenderer content={post.content} />
                            </div>

                            {/* Tags */}
                            <div className='border-t border-b border-light-200 dark:border-dark-300 py-6 my-8'>
                                <div className='flex flex-wrap gap-2'>
                                    {post.tags.map((tag) => (
                                        <TagBadge key={tag} tag={tag} />
                                    ))}
                                </div>
                            </div>

                            {/* Comments */}
                            <PostComments comments={post.comments} />
                        </motion.div>
                    </div>
                </div>

                {/* Related Posts */}
                <div className='mt-16'>
                    <RelatedPosts posts={post.relatedPosts} />
                </div>
            </div>
        </Layout>
    );
};

export default PostDetail;
