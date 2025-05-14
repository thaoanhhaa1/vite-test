import AnimatedSection from './AnimatedSection';
import Banner from './Banner';
import RegisterButton from './RegisterButton';
import WorkshopDetails from './WorkshopDetails';
import WorkshopInfo from './WorkshopInfo';

const WorkshopPage = () => {
    return (
        <div className='min-h-screen bg-gray-50'>
            <Banner imageUrl='/images/workshop-banner.jpg' />

            <div className='container mx-auto px-4 lg:px-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2'>
                        <AnimatedSection>
                            <WorkshopDetails
                                title='Workshop Thiết kế UX/UI Hiện đại'
                                category='Thiết kế'
                                organizer={{
                                    name: 'Nguyễn Văn A',
                                    position: 'Senior UX Designer',
                                    company: 'Creative Studio',
                                    avatar: '/images/avatar.jpg',
                                }}
                                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                            />
                        </AnimatedSection>
                    </div>

                    <div className='lg:col-span-1'>
                        <div className='sticky top-8'>
                            <AnimatedSection>
                                <div className='bg-white rounded-lg shadow-lg p-6'>
                                    <h3 className='text-xl font-bold mb-4'>
                                        Thông tin Workshop
                                    </h3>
                                    <WorkshopInfo />
                                    <RegisterButton />
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkshopPage;
