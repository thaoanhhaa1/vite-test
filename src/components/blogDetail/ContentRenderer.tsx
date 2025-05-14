import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/atom-one-dark.css';
import CodeBlock from './CodeBlock';
import HighlightedCodeBlock from './HighlightedCodeBlock';
import Prism from 'prismjs';

interface ContentRendererProps {
    content: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
    // Kích hoạt Prism.js sau khi component được render
    useEffect(() => {
        Prism.highlightAll();
    }, [content]);

    // Xử lý các khối code đặc biệt trước khi render markdown
    const processedContent = processSpecialCodeBlocks(content);

    return (
        <div className='prose prose-lg dark:prose-invert max-w-none'>
            <ReactMarkdown
                rehypePlugins={[
                    rehypeRaw,
                    rehypeSlug,
                    [rehypeHighlight, { ignoreMissing: true }],
                ]}
                remarkPlugins={[remarkGfm]}
                components={{
                    // Tùy chỉnh cách render các thẻ code
                    code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';
                        const codeContent = String(children).replace(/\n$/, '');

                        // Kiểm tra xem đây có phải là code block đặc biệt đã được xử lý không
                        if (codeContent.includes('SPECIAL_CODE_BLOCK:')) {
                            const id = codeContent
                                .replace('SPECIAL_CODE_BLOCK:', '')
                                .trim();
                            return renderSpecialCodeBlock(id);
                        }

                        // Nếu là code block thông thường
                        if (language) {
                            return (
                                <CodeBlock
                                    code={codeContent}
                                    language={language}
                                    fileName={`example.${language}`}
                                />
                            );
                        }

                        // Fallback cho code không có ngôn ngữ cụ thể
                        return (
                            <code
                                className='px-1.5 py-0.5 bg-light-200 dark:bg-dark-300 rounded text-accent-blue dark:text-accent-pink font-mono'
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },

                    // Tùy chỉnh cách render các thẻ h2
                    h2({ children, ...props }) {
                        return (
                            <h2
                                className='text-2xl font-bold mt-8 mb-4 text-dark-300 dark:text-light-100 font-mono border-b border-light-300 dark:border-dark-300 pb-2'
                                {...props}
                            >
                                {children}
                            </h2>
                        );
                    },

                    // Tùy chỉnh cách render các thẻ h3
                    h3({ children, ...props }) {
                        return (
                            <h3
                                className='text-xl font-bold mt-6 mb-3 text-dark-300 dark:text-light-100 font-mono'
                                {...props}
                            >
                                {children}
                            </h3>
                        );
                    },

                    // Tùy chỉnh cách render các thẻ a
                    a({ children, href, ...props }) {
                        return (
                            <a
                                href={href}
                                className='text-accent-blue dark:text-accent-pink hover:underline'
                                target={
                                    href?.startsWith('http')
                                        ? '_blank'
                                        : undefined
                                }
                                rel={
                                    href?.startsWith('http')
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                {...props}
                            >
                                {children}
                            </a>
                        );
                    },

                    // Tùy chỉnh cách render các thẻ blockquote
                    blockquote({ children, ...props }) {
                        return (
                            <blockquote
                                className='border-l-4 border-accent-blue dark:border-accent-pink pl-4 italic text-dark-200 dark:text-light-300 my-4'
                                {...props}
                            >
                                {children}
                            </blockquote>
                        );
                    },

                    // Tùy chỉnh cách render các thẻ ul
                    ul({ children, ...props }) {
                        return (
                            <ul
                                className='list-disc pl-6 my-4 space-y-2'
                                {...props}
                            >
                                {children}
                            </ul>
                        );
                    },
                }}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    );
};

// Danh sách các khối code đặc biệt
const specialCodeBlocks: Record<
    string,
    {
        code: string;
        language: string;
        title: string;
        description: string;
    }
> = {
    'useMemo-example': {
        code: `import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ list, filter }) {
  // Sử dụng useMemo để tránh tính toán lại khi component re-render
  // nhưng list và filter không thay đổi
  const filteredList = useMemo(() => {
    console.log('Filtering list...');
    return list.filter(item => item.includes(filter));
  }, [list, filter]); // Chỉ tính toán lại khi list hoặc filter thay đổi
  
  return (
    <ul>
      {filteredList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}`,
        language: 'jsx',
        title: 'Tối ưu hiệu suất với useMemo',
        description:
            'Ví dụ về cách sử dụng useMemo để tránh tính toán lại không cần thiết',
    },
    'useCallback-example': {
        code: `import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Sử dụng useCallback để tránh tạo lại hàm khi component re-render
  const handleClick = useCallback(() => {
    console.log('Button clicked!');
    setCount(prevCount => prevCount + 1);
  }, []); // Mảng dependencies rỗng, hàm chỉ được tạo một lần
  
  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

// Sử dụng React.memo để tránh render lại component con
const ChildComponent = React.memo(({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click me</button>;
});`,
        language: 'jsx',
        title: 'Tối ưu hiệu suất với useCallback',
        description: 'Ví dụ về cách sử dụng useCallback kết hợp với React.memo',
    },
};

// Hàm xử lý các khối code đặc biệt
const processSpecialCodeBlocks = (content: string): string => {
    // Tìm các khối code đặc biệt trong nội dung
    const specialBlockRegex = /```special:([a-zA-Z-]+)(.*?)```/gs;

    return content.replace(specialBlockRegex, (match, blockId) => {
        console.log('🚀 ~ returncontent.replace ~ blockId:', blockId);
        console.log('🚀 ~ returncontent.replace ~ match:', match);
        // Thay thế bằng marker đặc biệt để xử lý sau
        return `\`\`\`text\nSPECIAL_CODE_BLOCK:${blockId}\n\`\`\``;
    });
};

// Hàm render khối code đặc biệt
const renderSpecialCodeBlock = (blockId: string) => {
    const blockData = specialCodeBlocks[blockId];

    if (!blockData) {
        return (
            <div className='bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg my-4'>
                Không tìm thấy khối code đặc biệt với ID: {blockId}
            </div>
        );
    }

    return (
        <HighlightedCodeBlock
            code={blockData.code}
            language={blockData.language}
            title={blockData.title}
            description={blockData.description}
        />
    );
};

export default ContentRenderer;
