'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-4xl font-serif mb-4 text-preque-carbon dark:text-preque-beige">
                Something went wrong.
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">
                We apologize for the inconvenience. Our team has been notified.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="px-8 py-3 bg-preque-carbon text-white dark:bg-white dark:text-black uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="px-8 py-3 border border-preque-carbon dark:border-white text-preque-carbon dark:text-white uppercase tracking-widest text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                >
                    Go Home
                </Link>
            </div>
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-12 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-left max-w-2xl overflow-auto text-sm font-mono">
                    {error.message}
                </div>
            )}
        </div>
    );
}
