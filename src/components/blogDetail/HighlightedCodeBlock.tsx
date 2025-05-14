import { motion } from 'framer-motion';
import CodeBlock from './CodeBlock';

interface HighlightedCodeBlockProps {
    code: string;
    language: string;
    title: string;
    description: string;
}

const HighlightedCodeBlock: React.FC<HighlightedCodeBlockProps> = ({
    code,
    language,
    title,
    description,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='my-8 rounded-xl overflow-hidden border-2 border-accent-blue dark:border-accent-pink shadow-lg'
        >
            {/* Header với tiêu đề */}
            <div className='bg-accent-blue dark:bg-accent-pink text-white p-4'>
                <h4 className='text-lg font-bold font-mono'>{title}</h4>
                <p className='text-sm opacity-90'>{description}</p>
            </div>

            {/* Code block */}
            <div className='border-t-0'>
                <CodeBlock
                    code={code}
                    language={language}
                    fileName={`example.${language}`}
                />
            </div>

            {/* Footer với giải thích thêm */}
            <div className='bg-light-200 dark:bg-dark-300 p-4 border-t border-light-300 dark:border-dark-100'>
                <div className='flex items-start space-x-3'>
                    <div className='flex-shrink-0 mt-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5 text-accent-blue dark:text-accent-pink'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                        >
                            <path
                                fillRule='evenodd'
                                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </div>
                    <p className='text-sm text-dark-300 dark:text-light-200'>
                        Đoạn code này minh họa cách sử dụng{' '}
                        <code className='px-1 py-0.5 bg-light-300 dark:bg-dark-100 rounded text-accent-blue dark:text-accent-pink font-mono'>
                            useMemo
                        </code>{' '}
                        để tối ưu hiệu suất bằng cách tránh tính toán lại khi
                        các dependencies không thay đổi.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default HighlightedCodeBlock;
