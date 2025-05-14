import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSidebar = true }) => {
    return (
        <div className='min-h-screen flex flex-col bg-light-100 dark:bg-dark-100 text-dark-300 dark:text-light-100'>
            <Header />

            <main className='flex-grow pt-20'>
                {showSidebar ? (
                    <div className='container mx-auto px-4 py-8'>
                        <div className='flex flex-col lg:flex-row gap-8'>
                            <div className='flex-grow'>{children}</div>
                            <Sidebar />
                        </div>
                    </div>
                ) : (
                    children
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
