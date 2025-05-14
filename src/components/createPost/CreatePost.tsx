import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ContentRenderer from '../blogDetail/ContentRenderer';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Danh sách category mẫu
    const categories = [
        'Công nghệ',
        'Lập trình',
        'React',
        'JavaScript',
        'TypeScript',
        'Khác',
    ];

    const handleEditorChange = (content: string) => {
        setContent(content);
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim() || !category) {
            toast.error('Vui lòng điền đầy đủ tiêu đề, nội dung và danh mục');
            return;
        }

        try {
            setIsSubmitting(true);

            // Tạo đối tượng bài viết
            const postData = {
                title,
                content,
                description,
                category,
                tags,
                createdAt: new Date().toISOString(),
                author: {
                    id: '1', // Giả định ID người dùng hiện tại
                    name: 'Người dùng hiện tại',
                    avatar: '/images/avatar-default.png',
                },
            };

            // Gọi API để tạo bài viết
            console.log('🚀 ~ handleSubmit ~ postData:', postData);

            toast.success('Đã tạo bài viết thành công!');
        } catch (error) {
            console.error('Lỗi khi tạo bài viết:', error);
            toast.error(
                'Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại sau.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='container mx-auto py-8 px-4'>
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
                <h1 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>
                    Tạo bài viết mới
                </h1>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='title'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Tiêu đề bài viết{' '}
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='description'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Mô tả ngắn
                        </label>
                        <textarea
                            id='description'
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='category'
                            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                        >
                            Danh mục <span className='text-red-500'>*</span>
                        </label>
                        <select
                            id='category'
                            name='category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                            required
                        >
                            <option value=''>Chọn danh mục</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                            Thẻ (tags)
                        </label>
                        <div className='flex items-center mb-2'>
                            <input
                                type='text'
                                id='tag'
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === 'Enter' &&
                                    (e.preventDefault(), handleAddTag())
                                }
                                className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                                placeholder='Nhập tag và nhấn Enter'
                            />
                            <button
                                type='button'
                                onClick={handleAddTag}
                                className='px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            >
                                Thêm
                            </button>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                >
                                    {tag}
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveTag(tag)}
                                        className='ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none'
                                    >
                                        <svg
                                            className='w-3 h-3'
                                            fill='currentColor'
                                            viewBox='0 0 20 20'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                                clipRule='evenodd'
                                            ></path>
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                            Nội dung bài viết{' '}
                            <span className='text-red-500'>*</span>
                        </label>
                        <div className='border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden'>
                            <MDEditor value={content} onChange={setContent} />
                            <ContentRenderer content={content} />
                            {/* <Editor
                                apiKey='qdzwn4z73l7n60iajw46vaa7eh6w9u02oajafsgrpr4hicrc' // Thay thế bằng API key của bạn
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'advlist',
                                        'autolink',
                                        'lists',
                                        'link',
                                        'image',
                                        'charmap',
                                        'preview',
                                        'anchor',
                                        'searchreplace',
                                        'visualblocks',
                                        'code',
                                        'fullscreen',
                                        'insertdatetime',
                                        'media',
                                        'table',
                                        'code',
                                        'help',
                                        'wordcount',
                                    ],
                                    toolbar:
                                        'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style:
                                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                }}
                                value={content}
                                onEditorChange={handleEditorChange}
                            /> */}
                        </div>
                    </div>

                    <div className='flex justify-between pt-4'>
                        <button
                            type='button'
                            className='px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                        >
                            Hủy
                        </button>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className={`px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isSubmitting
                                    ? 'opacity-70 cursor-not-allowed'
                                    : ''
                            }`}
                        >
                            {isSubmitting ? 'Đang tạo...' : 'Tạo bài viết'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
