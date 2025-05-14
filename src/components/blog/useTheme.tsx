import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Kiểm tra theme từ localStorage
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as Theme | null;

            // Nếu có theme đã lưu, sử dụng nó
            if (savedTheme) {
                return savedTheme;
            }

            // Nếu không, kiểm tra preference của hệ thống
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches;
            return prefersDark ? 'dark' : 'light';
        }

        return 'light'; // Mặc định là light mode
    });

    useEffect(() => {
        // Cập nhật class trên document element
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);

        // Lưu theme vào localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return { theme, toggleTheme };
};
