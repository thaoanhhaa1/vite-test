import React from 'react';

const InteractiveElement = ({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) => {
    return (
        <div className='group flex items-center space-x-2 p-2 rounded-md transition-all duration-300 hover:bg-gray-100'>
            <span className='text-gray-500 group-hover:text-[#E11E39] transition-colors duration-300'>
                {icon}
            </span>
            <span className='text-gray-700 group-hover:text-gray-900 transition-colors duration-300'>
                {text}
            </span>
        </div>
    );
};

export default InteractiveElement;
