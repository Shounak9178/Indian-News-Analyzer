
import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 border-4 border-t-indigo-600 border-gray-200 dark:border-gray-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 font-semibold">Analyzing news article...</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">This may take a few moments. Please wait.</p>
        </div>
    );
};
