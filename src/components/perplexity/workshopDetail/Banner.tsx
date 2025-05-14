const Banner = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className='relative h-[40vh] md:h-[60vh] overflow-hidden'>
            <div
                className='absolute inset-0 bg-cover bg-center transform transition-transform duration-1000 hover:scale-105'
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/70'></div>
            </div>
        </div>
    );
};

export default Banner;
