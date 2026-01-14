"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean);

    if (paths.length === 0) return null;

    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500 mb-6 font-sans">
            <Link href="/" className="hover:text-preque-earth dark:hover:text-preque-earth transition-colors">
                <Home size={16} />
            </Link>
            {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join("/")}`;
                const isLast = index === paths.length - 1;
                const label = path.replace(/-/g, " "); // Basic formatting

                return (
                    <div key={path} className="flex items-center space-x-2">
                        <ChevronRight size={14} className="opacity-40" />
                        {isLast ? (
                            <span className="text-preque-carbon font-medium capitalize truncate max-w-[200px]">{label}</span>
                        ) : (
                            <Link href={href} className="hover:text-preque-earth transition-colors capitalize">
                                {label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
