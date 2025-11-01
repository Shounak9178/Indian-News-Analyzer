
import React from 'react';
import { Analysis, Verdict } from '../types';

interface AnalysisResultProps {
    result: Analysis;
}

const getVerdictStyles = (verdict: Verdict) => {
    switch (verdict) {
        case Verdict.TRUE:
            return {
                bgColor: 'bg-green-100 dark:bg-green-900',
                textColor: 'text-green-800 dark:text-green-200',
                borderColor: 'border-green-500',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
        case Verdict.FALSE:
            return {
                bgColor: 'bg-red-100 dark:bg-red-900',
                textColor: 'text-red-800 dark:text-red-200',
                borderColor: 'border-red-500',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
        case Verdict.MISLEADING:
            return {
                bgColor: 'bg-yellow-100 dark:bg-yellow-900',
                textColor: 'text-yellow-800 dark:text-yellow-200',
                borderColor: 'border-yellow-500',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                )
            };
        case Verdict.NEEDS_CONTEXT:
        default:
            return {
                bgColor: 'bg-blue-100 dark:bg-blue-900',
                textColor: 'text-blue-800 dark:text-blue-200',
                borderColor: 'border-blue-500',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
    }
};

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
    const styles = getVerdictStyles(result.verdict);

    return (
        <div className={`mt-6 p-6 rounded-lg border-l-4 ${styles.bgColor} ${styles.borderColor} shadow-lg transition-all duration-300 ease-in-out`}>
            <div className={`flex items-center gap-3`}>
                <span className={styles.textColor}>{styles.icon}</span>
                <h2 className={`text-xl font-bold ${styles.textColor}`}>
                    Verdict: {result.verdict.replace('_', ' ')}
                </h2>
            </div>
            <div className="mt-4 text-gray-700 dark:text-gray-300 space-y-3 prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Explanation:</h3>
                {result.explanation.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    );
};
