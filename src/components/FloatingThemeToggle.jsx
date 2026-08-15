import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavbar } from '../contexts/NavbarContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const FloatingThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const { isMenuOpen } = useNavbar();

    if (isMenuOpen) return null;

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-24 left-5 z-[70] hidden rounded-full border border-slate-300 bg-slate-200/80 p-3 text-yellow-500 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-200 lg:block"
            title={theme === 'dark' ? "Ativar tema claro" : "Ativar tema escuro"}
            aria-label={theme === 'dark' ? "Ativar tema claro" : "Ativar tema escuro"}
        >
            {theme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl text-slate-800" />}
        </button>
    );
};

export default FloatingThemeToggle;
