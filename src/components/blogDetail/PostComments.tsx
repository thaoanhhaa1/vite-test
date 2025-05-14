import { useState } from 'react';
import { motion } from 'framer-motion';

interface Comment {
    id: string;
    author: string;
    avatar: string;
    content: string;
    publishedAt: string;
    likes: number;
    replies?: Comment[];
}

interface PostCommentsProps {
    comments: Comment[];
}

const PostComments: React.FC<PostCommentsProps> = ({ comments }) => {
    const [newComment, setNewComment] = useState('');
    const [allComments, setAllComments] = useState(comments);

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim()) return;

        // Thêm bình luận mới
        const comment: Comment = {
            id: `new-${Date.now()}`,
            author: 'Bạn',
            avatar: 'https://i.pravatar.cc/150?img=5', // Avatar mặc định
            content: newComment,
            publishedAt: new Date().toLocaleDateString('vi-VN'),
            likes: 0,
        };

        setAllComments([...allComments, comment]);
        setNewComment('');
    };

    const handleLike = (commentId: string) => {
        setAllComments((prevComments) =>
            prevComments.map((comment) => {
                if (comment.id === commentId) {
                    return { ...comment, likes: comment.likes + 1 };
                }

                if (comment.replies) {
                    return {
                        ...comment,
                        replies: comment.replies.map((reply) =>
                            reply.id === commentId
                                ? { ...reply, likes: reply.likes + 1 }
                                : reply,
                        ),
                    };
                }

                return comment;
            }),
        );
    };

    return (
        <div className='mt-12'>
            <h3 className='text-2xl font-bold mb-6 text-dark-300 dark:text-light-100 font-mono'>
                Bình luận (
                {allComments.reduce(
                    (count, comment) =>
                        count + 1 + (comment.replies?.length || 0),
                    0,
                )}
                )
            </h3>

            {/* Form bình luận mới */}
            <form onSubmit={handleSubmitComment} className='mb-8'>
                <div className='flex space-x-4'>
                    <img
                        src='https://i.pravatar.cc/150?img=5'
                        alt='Your avatar'
                        className='w-10 h-10 rounded-full object-cover'
                    />
                    <div className='flex-grow'>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder='Viết bình luận của bạn...'
                            className='w-full p-3 rounded-lg bg-light-200 dark:bg-dark-300 text-dark-300 dark:text-light-100 focus:outline-none focus:ring-2 focus:ring-accent-blue dark:focus:ring-accent-pink resize-none min-h-[100px]'
                        />
                        <div className='flex justify-end mt-2'>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type='submit'
                                className='px-4 py-2 bg-accent-blue dark:bg-accent-pink text-white rounded-lg font-medium hover:opacity-90 transition-opacity'
                            >
                                Đăng bình luận
                            </motion.button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Danh sách bình luận */}
            <div className='space-y-6'>
                {allComments.map((comment) => (
                    <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className='bg-light-100 dark:bg-dark-200 rounded-lg p-4 shadow-sm'
                    >
                        <div className='flex space-x-3'>
                            <img
                                src={comment.avatar}
                                alt={comment.author}
                                className='w-10 h-10 rounded-full object-cover'
                            />
                            <div className='flex-grow'>
                                <div className='flex items-center justify-between'>
                                    <h4 className='font-medium text-dark-300 dark:text-light-100'>
                                        {comment.author}
                                    </h4>
                                    <span className='text-sm text-dark-200 dark:text-light-300'>
                                        {comment.publishedAt}
                                    </span>
                                </div>
                                <p className='mt-2 text-dark-300 dark:text-light-200'>
                                    {comment.content}
                                </p>
                                <div className='mt-3 flex items-center space-x-4'>
                                    <button
                                        onClick={() => handleLike(comment.id)}
                                        className='flex items-center space-x-1 text-dark-200 dark:text-light-300 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'
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
                                                strokeWidth={1.5}
                                                d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
                                            />
                                        </svg>
                                        <span>{comment.likes}</span>
                                    </button>
                                    <button className='text-dark-200 dark:text-light-300 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'>
                                        Trả lời
                                    </button>
                                </div>

                                {/* Phần trả lời */}
                                {comment.replies &&
                                    comment.replies.length > 0 && (
                                        <div className='mt-4 pl-4 border-l-2 border-light-300 dark:border-dark-300 space-y-4'>
                                            {comment.replies.map((reply) => (
                                                <div
                                                    key={reply.id}
                                                    className='flex space-x-3'
                                                >
                                                    <img
                                                        src={reply.avatar}
                                                        alt={reply.author}
                                                        className='w-8 h-8 rounded-full object-cover'
                                                    />
                                                    <div>
                                                        <div className='flex items-center space-x-2'>
                                                            <h5 className='font-medium text-dark-300 dark:text-light-100'>
                                                                {reply.author}
                                                            </h5>
                                                            <span className='text-xs text-dark-200 dark:text-light-300'>
                                                                {
                                                                    reply.publishedAt
                                                                }
                                                            </span>
                                                        </div>
                                                        <p className='mt-1 text-dark-300 dark:text-light-200 text-sm'>
                                                            {reply.content}
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                handleLike(
                                                                    reply.id,
                                                                )
                                                            }
                                                            className='mt-2 flex items-center space-x-1 text-sm text-dark-200 dark:text-light-300 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'
                                                        >
                                                            <svg
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                className='h-4 w-4'
                                                                fill='none'
                                                                viewBox='0 0 24 24'
                                                                stroke='currentColor'
                                                            >
                                                                <path
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                    strokeWidth={
                                                                        1.5
                                                                    }
                                                                    d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
                                                                />
                                                            </svg>
                                                            <span>
                                                                {reply.likes}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PostComments;
