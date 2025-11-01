
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="w-full bg-white dark:bg-gray-800 shadow-md p-4">
            <div className="max-w-4xl mx-auto flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.5v-1c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5zM12 6c-1.65 0-3 1.35-3 3h2c0-.55.45-1 1-1s1 .45 1 1c0 1.25-2 1.5-2 3.5v.5h2v-1c0-1 .5-1.5 1.5-2.25C14.05 10.2 15 9.15 15 8c0-1.65-1.35-3-3-3z"/>
                </svg>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Indian News Analyzer
                </h1>
            </div>
        </header>
    );
};
