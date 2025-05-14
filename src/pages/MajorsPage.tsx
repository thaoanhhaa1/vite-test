import { useEffect, useState } from 'react';
import FeaturedMajors from '../components/FeaturedMajors';
import MajorList from '../components/MajorList';

const MajorsPage = () => {
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Giả lập API call để lấy danh sách ngành
        const fetchMajors = async () => {
            setLoading(true);
            try {
                // Thay thế bằng API call thực tế
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Dữ liệu mẫu (giống như trong MajorList)
                const sampleMajors = [
                    // ... dữ liệu mẫu như trong MajorList
                ];

                setMajors(sampleMajors);
            } catch (error) {
                console.error('Error fetching majors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMajors();
    }, []);

    return (
        <div>
            <div className='bg-gradient-to-r from-[#E11E39] to-[#FF4D6D] text-white'>
                <div className='container mx-auto px-4 py-16 md:py-24'>
                    <div className='max-w-3xl'>
                        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                            Khám Phá Ngành Học
                        </h1>
                        <p className='text-xl opacity-90'>
                            Tìm hiểu về các ngành đào tạo chất lượng cao, đáp
                            ứng nhu cầu nhân lực trong thời đại số
                        </p>
                    </div>
                </div>
            </div>

            {!loading && <FeaturedMajors majors={majors} />}
            <MajorList />
        </div>
    );
};

export default MajorsPage;
