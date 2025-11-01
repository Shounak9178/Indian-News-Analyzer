
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeNews } from './services/geminiService';
import { Analysis, Language, Verdict } from './types';
import { INDIAN_LANGUAGES } from './constants';

const App: React.FC = () => {
    const [newsText, setNewsText] = useState<string>('');
    const [selectedLanguage, setSelectedLanguage] = useState<string>(INDIAN_LANGUAGES[0].code);
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        if (!newsText.trim()) {
            setError("Please enter some news text to analyze.");
            return;
        }
        if (!process.env.API_KEY) {
            setError("API key is not configured. Please set the API_KEY environment variable.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const languageName = INDIAN_LANGUAGES.find(lang => lang.code === selectedLanguage)?.name || 'English';
            const result = await analyzeNews(newsText, languageName);
            setAnalysis(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [newsText, selectedLanguage]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
            <Header />
            <main className="max-w-4xl mx-auto p-4 md:p-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Analyze News Article</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Paste the news article below, select a language for the analysis, and our AI will determine its veracity.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="md:col-span-3">
                            <label htmlFor="news-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                News Article Text
                            </label>
                            <textarea
                                id="news-text"
                                value={newsText}
                                onChange={(e) => setNewsText(e.target.value)}
                                placeholder="Paste the full text of the news article here..."
                                className="w-full h-48 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-base"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Analysis Language
                            </label>
                            <select
                                id="language-select"
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                disabled={isLoading}
                            >
                                {INDIAN_LANGUAGES.map((lang) => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading || !newsText.trim()}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 mt-4 sm:mt-6"
                        >
                           {isLoading ? 'Analyzing...' : 'Analyze News'}
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    {isLoading && <Loader />}
                    {error && (
                        <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-md" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                    {analysis && <AnalysisResult result={analysis} />}
                </div>
            </main>
        </div>
    );
};

export default App;
