import { motion } from 'framer-motion';
import LazyImage from './LazyImage';
import TagBadge from './TagBadge';

interface PostCardProps {
    id: string;
    title: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
    date: string;
    readTime: string;
}

const PostCard: React.FC<PostCardProps> = ({
    id,
    title,
    excerpt,
    coverImage,
    tags,
    date,
    readTime,
}) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.4 }}
            className='bg-light-100 dark:bg-dark-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300'
        >
            <a href={`/post/${id}`} className='block'>
                <div className='relative h-48 overflow-hidden'>
                    <LazyImage
                        src={coverImage}
                        alt={title}
                        className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                    />
                    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50' />
                </div>

                <div className='p-6'>
                    <div className='flex flex-wrap gap-2 mb-3'>
                        {tags.map((tag) => (
                            <TagBadge key={tag} tag={tag} />
                        ))}
                    </div>

                    <h3 className='text-xl font-bold mb-2 text-dark-300 dark:text-light-100 font-mono'>
                        {title}
                    </h3>

                    <p className='text-dark-200 dark:text-light-300 mb-4 line-clamp-2'>
                        {excerpt}
                    </p>

                    <div className='flex items-center justify-between text-sm text-dark-200 dark:text-light-300'>
                        <span>{date}</span>
                        <span>{readTime} phút đọc</span>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

export default PostCard;
