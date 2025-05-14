import {
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    MapIcon,
    TagIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

function WorkshopInfo() {
    // Giả sử workshop object có cấu trúc như sau
    const {
        date = '28/03/2025',
        time = '09:00 - 17:00',
        location = 'Tòa nhà Innovation, 123 Nguyễn Huệ, Quận 1, TP.HCM',
        participants = {
            current: 42,
            max: 50,
        },
        price = '1.200.000 VNĐ',
        benefits = [
            'Tài liệu workshop đầy đủ',
            'Chứng chỉ hoàn thành khóa học',
            'Cơ hội networking với chuyên gia',
            'Tea break & ăn trưa',
        ],
        tags = ['UX/UI', 'Design', 'Workshop'],
    } = {};

    // Tính phần trăm số người đã đăng ký
    const registrationPercentage = Math.round(
        (participants.current / participants.max) * 100,
    );

    return (
        <div className='space-y-6 animate-fadeIn'>
            {/* Thời gian và ngày tháng */}
            <div className='flex items-start space-x-3'>
                <CalendarIcon className='w-6 h-6 text-[#E11E39] flex-shrink-0' />
                <div>
                    <h4 className='font-medium text-gray-900'>Ngày diễn ra</h4>
                    <p className='text-gray-700'>{date}</p>
                </div>
            </div>

            {/* Thời gian */}
            <div className='flex items-start space-x-3'>
                <ClockIcon className='w-6 h-6 text-[#E11E39] flex-shrink-0' />
                <div>
                    <h4 className='font-medium text-gray-900'>Thời gian</h4>
                    <p className='text-gray-700'>{time}</p>
                </div>
            </div>

            {/* Địa điểm */}
            <div className='flex items-start space-x-3'>
                <MapIcon className='w-6 h-6 text-[#E11E39] flex-shrink-0' />
                <div>
                    <h4 className='font-medium text-gray-900'>Địa điểm</h4>
                    <p className='text-gray-700'>{location}</p>
                    <button className='mt-2 text-sm text-[#E11E39] hover:underline flex items-center'>
                        <span>Xem bản đồ</span>
                        <svg
                            className='w-4 h-4 ml-1'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Số lượng người tham gia */}
            <div className='flex items-start space-x-3'>
                <UserGroupIcon className='w-6 h-6 text-[#E11E39] flex-shrink-0' />
                <div className='w-full'>
                    <h4 className='font-medium text-gray-900'>
                        Số lượng tham gia
                    </h4>
                    <p className='text-gray-700'>
                        {participants.current}/{participants.max} người đã đăng
                        ký
                    </p>

                    {/* Progress bar */}
                    <div className='w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden'>
                        <div
                            className='h-full bg-[#E11E39] rounded-full transition-all duration-1000 ease-out'
                            style={{ width: `${registrationPercentage}%` }}
                        ></div>
                    </div>

                    {/* Remaining slots */}
                    <p className='text-sm text-gray-500 mt-1'>
                        {participants.max - participants.current} slot còn lại
                    </p>
                </div>
            </div>

            {/* Học phí */}
            <div className='flex items-start space-x-3'>
                <TagIcon className='w-6 h-6 text-[#E11E39] flex-shrink-0' />
                <div>
                    <h4 className='font-medium text-gray-900'>Học phí</h4>
                    <p className='text-gray-700'>{price}</p>
                    <p className='text-sm text-gray-500'>(Đã bao gồm VAT)</p>
                </div>
            </div>

            {/* Divider */}
            <hr className='border-gray-200' />

            {/* Quyền lợi tham gia */}
            <div>
                <h4 className='font-medium text-gray-900 mb-3'>
                    Quyền lợi tham gia
                </h4>
                <ul className='space-y-2'>
                    {benefits.map((benefit: string, index: number) => (
                        <li
                            key={index}
                            className='flex items-start space-x-2 group'
                        >
                            <CheckCircleIcon className='w-5 h-5 text-[#E11E39] flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300' />
                            <span className='text-gray-700'>{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 pt-2'>
                {tags.map((tag: string, index: number) => (
                    <span
                        key={index}
                        className='px-3 py-1 bg-[#E11E39]/10 text-[#E11E39] rounded-full text-sm font-medium
                      transform transition-all duration-300 hover:scale-105 hover:bg-[#E11E39]/20'
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default WorkshopInfo;
