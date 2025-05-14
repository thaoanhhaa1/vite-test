import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { FilterIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import FilterSidebar from './FilterSidebar';
import WorkshopCard from './WorkshopCard';
import WorkshopModal from './WorkshopModal';

const WorkshopList2 = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        // Giả lập API call để lấy danh sách workshop
        const fetchWorkshops = async () => {
            setLoading(true);
            try {
                // Thay thế bằng API call thực tế
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Dữ liệu mẫu
                const sampleWorkshops = [
                    {
                        id: 1,
                        title: 'Thiết kế UX/UI cho người mới bắt đầu',
                        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
                        date: '15/08/2023',
                        time: '09:00 - 12:00',
                        location:
                            'Tòa nhà Innovation, 123 Nguyễn Huệ, Q.1, TP.HCM',
                        category: 'design',
                        attendees: 45,
                        isFree: true,
                        price: 0,
                        status: 'upcoming',
                        description:
                            'Workshop giới thiệu các nguyên tắc cơ bản về thiết kế UX/UI, công cụ và quy trình làm việc cho người mới bắt đầu.',
                    },
                    {
                        id: 2,
                        title: 'Lập trình Web với React và TailwindCSS',
                        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
                        date: '20/08/2023',
                        time: '14:00 - 17:00',
                        location:
                            'Không gian sáng tạo CreativeHub, 456 Lê Lợi, Q.1, TP.HCM',
                        category: 'programming',
                        attendees: 30,
                        isFree: false,
                        price: 300000,
                        status: 'upcoming',
                        description:
                            'Workshop thực hành về cách xây dựng giao diện web hiện đại với React và TailwindCSS, từ cơ bản đến nâng cao.',
                    },
                    {
                        id: 3,
                        title: 'Digital Marketing cho doanh nghiệp nhỏ',
                        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                        date: '25/08/2023',
                        time: '09:00 - 16:00',
                        location:
                            'Trung tâm đào tạo MarketingPro, 789 Điện Biên Phủ, Q.3, TP.HCM',
                        category: 'marketing',
                        attendees: 50,
                        isFree: false,
                        price: 500000,
                        status: 'upcoming',
                        description:
                            'Workshop toàn diện về chiến lược Digital Marketing hiệu quả cho doanh nghiệp nhỏ và vừa với ngân sách hạn chế.',
                    },
                    {
                        id: 4,
                        title: 'Kỹ năng thuyết trình chuyên nghiệp',
                        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
                        date: '10/09/2023',
                        time: '14:00 - 17:00',
                        location:
                            'Trung tâm hội nghị Riverside, 159 Bến Vân Đồn, Q.4, TP.HCM',
                        category: 'soft-skills',
                        attendees: 35,
                        isFree: false,
                        price: 400000,
                        status: 'upcoming',
                        description:
                            'Workshop rèn luyện kỹ năng thuyết trình, giao tiếp và xử lý tình huống trước đám đông một cách chuyên nghiệp.',
                    },
                    {
                        id: 5,
                        title: 'Thiết kế đồ họa với Adobe Illustrator',
                        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d',
                        date: '05/09/2023',
                        time: '09:00 - 12:00',
                        location:
                            'Studio Design Hub, 258 Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM',
                        category: 'design',
                        attendees: 25,
                        isFree: false,
                        price: 350000,
                        status: 'upcoming',
                        description:
                            'Workshop thực hành về thiết kế đồ họa với Adobe Illustrator, từ cơ bản đến các kỹ thuật nâng cao.',
                    },
                    {
                        id: 6,
                        title: 'Phát triển ứng dụng di động với Flutter',
                        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
                        date: '12/09/2023',
                        time: '14:00 - 17:00',
                        location:
                            'Không gian làm việc chung CoderSpace, 369 Cách Mạng Tháng 8, Q.10, TP.HCM',
                        category: 'programming',
                        attendees: 30,
                        isFree: false,
                        price: 450000,
                        status: 'upcoming',
                        description:
                            'Workshop thực hành về phát triển ứng dụng di động đa nền tảng với Flutter framework.',
                    },
                ];

                setWorkshops(sampleWorkshops);
            } catch (error) {
                console.error('Error fetching workshops:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshops();
    }, []);

    const filteredWorkshops = workshops.filter((workshop) => {
        const matchesSearch =
            workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workshop.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === 'all' ||
            workshop.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleCreateWorkshop = (newWorkshop) => {
        setWorkshops((prev) => [
            {
                id: prev.length + 1,
                ...newWorkshop,
                attendees: 0,
                status: 'upcoming',
            },
            ...prev,
        ]);
        setShowModal(false);
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Banner */}
            <div className='bg-gradient-to-r from-[#E11E39] to-[#FF4D6D] text-white'>
                <div className='container mx-auto px-4 py-16 md:py-24'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                            Workshop Sắp Diễn Ra
                        </h1>
                        <p className='text-xl md:text-2xl opacity-90 max-w-2xl'>
                            Khám phá và tham gia các workshop chất lượng để nâng
                            cao kỹ năng và mở rộng mạng lưới của bạn
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className='container mx-auto px-4 py-12'>
                {/* Search and Filter Bar */}
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
                    <div className='relative w-full md:w-1/2'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            type='text'
                            placeholder='Tìm kiếm workshop...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-[#E11E39] focus:ring-2 focus:ring-[#E11E39]/20 outline-none transition-all'
                        />
                    </div>

                    <div className='flex gap-4 w-full md:w-auto'>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowFilters(!showFilters)}
                            className='flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors'
                        >
                            <FilterIcon className='h-5 w-5 text-gray-600' />
                            <span className='font-medium text-gray-700'>
                                Bộ lọc
                            </span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowModal(true)}
                            className='flex items-center gap-2 px-4 py-3 rounded-lg bg-[#E11E39] text-white hover:bg-[#c91930] transition-colors ml-auto'
                        >
                            <PlusIcon className='h-5 w-5' />
                            <span className='font-medium'>Tạo Workshop</span>
                        </motion.button>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-8'>
                    {/* Sidebar Filters - Hiển thị trên mobile khi click vào nút Filter */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className='w-full md:w-64 md:sticky md:top-24 h-fit'
                        >
                            <FilterSidebar
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                            />
                        </motion.div>
                    )}

                    {/* Workshop Grid */}
                    <div className={`flex-1 ${showFilters ? 'md:ml-4' : ''}`}>
                        {loading ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[...Array(6)].map((_, index) => (
                                    <div
                                        key={index}
                                        className='bg-white rounded-lg shadow-md p-4 h-96 animate-pulse'
                                    >
                                        <div className='bg-gray-200 h-48 rounded-lg mb-4'></div>
                                        <div className='bg-gray-200 h-6 rounded w-3/4 mb-3'></div>
                                        <div className='bg-gray-200 h-4 rounded w-1/2 mb-2'></div>
                                        <div className='bg-gray-200 h-4 rounded w-2/3 mb-2'></div>
                                        <div className='bg-gray-200 h-4 rounded w-1/3 mb-4'></div>
                                        <div className='flex justify-between items-center'>
                                            <div className='bg-gray-200 h-8 rounded w-1/4'></div>
                                            <div className='bg-gray-200 h-10 rounded w-1/3'></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredWorkshops.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                            >
                                {filteredWorkshops.map((workshop, index) => (
                                    <WorkshopCard
                                        key={workshop.id}
                                        workshop={workshop}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <div className='text-center py-16 bg-white rounded-lg shadow-sm'>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <svg
                                        className='mx-auto h-16 w-16 text-gray-400'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={1.5}
                                            d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                        />
                                    </svg>
                                    <h3 className='mt-4 text-lg font-medium text-gray-900'>
                                        Không tìm thấy workshop nào
                                    </h3>
                                    <p className='mt-2 text-gray-500'>
                                        Thử thay đổi bộ lọc hoặc từ khóa tìm
                                        kiếm của bạn.
                                    </p>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal tạo workshop */}
            <WorkshopModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreateWorkshop}
            />
        </div>
    );
};

export default WorkshopList2;
