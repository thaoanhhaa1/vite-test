import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface CodeBlockProps {
    code: string;
    language: string;
    fileName?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, fileName }) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [code, language]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    // Xác định ngôn ngữ cho Prism
    const getLanguageClass = () => {
        const langMap: Record<string, string> = {
            jsx: 'language-jsx',
            tsx: 'language-tsx',
            js: 'language-javascript',
            ts: 'language-typescript',
            html: 'language-html',
            css: 'language-css',
            json: 'language-json',
        };

        return (
            langMap[language.toLowerCase()] ||
            `language-${language.toLowerCase()}`
        );
    };

    return (
        <div className='relative my-8 rounded-lg overflow-hidden border border-dark-300 dark:border-light-300/20 shadow-lg'>
            {/* Header với tên file và ngôn ngữ */}
            <div className='flex items-center justify-between px-4 py-3 bg-gradient-to-r from-dark-300 to-dark-200 dark:from-dark-200 dark:to-dark-300 text-light-100'>
                <div className='flex items-center space-x-2'>
                    {/* Icon dựa vào loại file */}
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-accent-blue dark:text-accent-pink'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                    >
                        <path
                            fillRule='evenodd'
                            d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z'
                            clipRule='evenodd'
                        />
                    </svg>

                    {/* Tên file nếu có */}
                    <span className='text-sm font-mono font-medium'>
                        {fileName || `example.${language.toLowerCase()}`}
                    </span>
                </div>

                <div className='flex items-center space-x-2'>
                    <span className='text-xs font-mono px-2 py-1 rounded-full bg-accent-blue/20 dark:bg-accent-pink/20 text-accent-blue dark:text-accent-pink'>
                        {language.toUpperCase()}
                    </span>

                    <button
                        onClick={copyToClipboard}
                        className='text-sm flex items-center space-x-1 hover:text-accent-blue dark:hover:text-accent-pink transition-colors'
                        aria-label='Copy code'
                    >
                        {isCopied ? (
                            <>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-4 w-4'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                                <span>Đã sao chép!</span>
                            </>
                        ) : (
                            <>
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
                                        strokeWidth={2}
                                        d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
                                    />
                                </svg>
                                <span>Sao chép</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code content với line numbers */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='relative overflow-hidden'
            >
                {/* Đánh dấu các dòng quan trọng */}
                <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
                    <div className='bg-accent-blue/10 dark:bg-accent-pink/10 h-[24px] transform translate-y-[48px]'></div>
                    <div className='bg-accent-blue/10 dark:bg-accent-pink/10 h-[24px] transform translate-y-[72px]'></div>
                </div>

                <pre className='line-numbers text-sm m-0 p-0 bg-light-100 dark:bg-dark-200'>
                    <code
                        className={`${getLanguageClass()} block p-4 overflow-x-auto`}
                    >
                        {code}
                    </code>
                </pre>

                {/* Chú thích cho code */}
                <div className='px-4 py-2 bg-light-200 dark:bg-dark-300 text-dark-200 dark:text-light-300 text-xs italic border-t border-light-300 dark:border-dark-100'>
                    <span className='font-medium text-accent-blue dark:text-accent-pink'>
                        Lưu ý:
                    </span>{' '}
                    Dòng được highlight là phần quan trọng cần chú ý.
                </div>
            </motion.div>
        </div>
    );
};

export default CodeBlock;
