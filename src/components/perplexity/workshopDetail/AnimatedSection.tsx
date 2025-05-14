import { useInView } from 'framer-motion';
import React, { useRef } from 'react';

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    const inView = useInView(ref, {
        once: true,
    });

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 transform ${
                inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
            }`}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;
