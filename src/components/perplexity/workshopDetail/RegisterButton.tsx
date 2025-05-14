import { useState } from 'react';

const RegisterButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleRegister = () => {
        setIsLoading(true);

        // Giả lập API call
        setTimeout(() => {
            setIsLoading(false);
            setStatus('success');

            // Reset status sau 3 giây
            setTimeout(() => setStatus(null), 3000);
        }, 1500);
    };

    return (
        <div className='mt-8'>
            <button
                onClick={handleRegister}
                disabled={isLoading}
                className='px-8 py-3 bg-[#E11E39] text-white font-medium rounded-lg shadow-lg
                    transform transition-all duration-300 
                    hover:scale-105 hover:shadow-xl hover:bg-[#c91b33]
                    focus:outline-none focus:ring-2 focus:ring-[#E11E39] focus:ring-opacity-50
                    disabled:opacity-70 disabled:cursor-not-allowed'
            >
                {isLoading ? (
                    <span className='flex items-center'>
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
                        Đang xử lý...
                    </span>
                ) : (
                    'Đăng ký tham gia'
                )}
            </button>

            {status === 'success' && (
                <div className='mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded animate-fadeIn'>
                    Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.
                </div>
            )}
        </div>
    );
};

export default RegisterButton;
