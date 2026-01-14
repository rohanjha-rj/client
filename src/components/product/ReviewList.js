"use client";

import { Star } from "lucide-react";

export default function ReviewList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>;
    }

    return (
        <div className="space-y-8">
            {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-preque-carbon dark:text-gray-200">{review.name}</span>
                        <span className="text-xs text-gray-400">{new Date(review.createdAt || review.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                            />
                        ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{review.comment}</p>
                </div>
            ))}
        </div>
    );
}
