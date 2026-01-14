import { cn } from "@/lib/utils";

/**
 * Skeleton Component
 * Displays a placeholder pulsating block for loading states.
 * @param {string} className - Additional CSS classes
 */
function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-200/50 dark:bg-gray-700/50", className)}
            {...props}
        />
    );
}

export { Skeleton };
