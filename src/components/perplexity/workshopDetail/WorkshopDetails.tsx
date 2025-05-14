const WorkshopDetails = ({
    title,
    category,
    organizer,
    description,
}: {
    title: string;
    category: string;
    organizer: {
        avatar: string;
        name: string;
        position: string;
        company: string;
    };
    description: string;
}) => {
    return (
        <div className='max-w-4xl mx-auto px-4 py-8 -mt-16 relative z-10'>
            <div className='bg-white rounded-lg shadow-xl p-6 md:p-8 transform transition-all duration-500 hover:shadow-2xl'>
                <div className='animate-fadeIn'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
                        {title}
                    </h1>
                    <div className='inline-block px-3 py-1 rounded-full bg-[#E11E39]/10 text-[#E11E39] font-medium text-sm mb-6'>
                        {category}
                    </div>

                    <div className='flex items-center mb-6'>
                        <img
                            src={organizer.avatar}
                            alt={organizer.name}
                            className='w-12 h-12 rounded-full mr-4 border-2 border-[#E11E39]'
                        />
                        <div>
                            <h3 className='font-medium text-gray-800'>
                                {organizer.name}
                            </h3>
                            <p className='text-gray-600 text-sm'>
                                {organizer.position} tại {organizer.company}
                            </p>
                        </div>
                    </div>

                    <div className='prose max-w-none'>{description}</div>
                </div>
            </div>
        </div>
    );
};

export default WorkshopDetails;
