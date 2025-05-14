import { motion } from 'framer-motion';
import LazyImage from '../blog/LazyImage';

interface RelatedPost {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
}

interface RelatedPostsProps {
    posts: RelatedPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
    return (
        <section>
            <h2 className='text-2xl font-bold mb-6 text-dark-300 dark:text-light-100 font-mono'>
                Bài viết liên quan
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className='bg-light-100 dark:bg-dark-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow'
                    >
                        <a href={`/post/${post.id}`} className='block'>
                            <div className='h-40 overflow-hidden'>
                                <LazyImage
                                    src={post.coverImage}
                                    alt={post.title}
                                    className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                                />
                            </div>

                            <div className='p-4'>
                                <h3 className='text-lg font-bold mb-2 text-dark-300 dark:text-light-100 line-clamp-2'>
                                    {post.title}
                                </h3>
                                <p className='text-dark-200 dark:text-light-300 text-sm line-clamp-2 mb-3'>
                                    {post.excerpt}
                                </p>
                                <div className='flex flex-wrap gap-1'>
                                    {post.tags.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag}
                                            className='text-xs px-2 py-1 bg-light-200 dark:bg-dark-300 rounded-full text-dark-300 dark:text-light-200'
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {post.tags.length > 2 && (
                                        <span className='text-xs px-2 py-1 bg-light-200 dark:bg-dark-300 rounded-full text-dark-300 dark:text-light-200'>
                                            +{post.tags.length - 2}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RelatedPosts;
