"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewForm({ onSubmit }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, comment });
        setComment("");
        setRating(5);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-serif font-bold text-preque-carbon mb-4">Write a Review</h3>

            <div className="mb-4">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Rating</label>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                            className="focus:outline-none transition-transform hover:scale-110"
                        >
                            <Star
                                size={20}
                                className={`${star <= (hoveredRating || rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows="4"
                    className="w-full p-3 text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-black rounded focus:outline-none focus:border-preque-earth transition-colors"
                ></textarea>
            </div>

            <button
                type="submit"
                className="px-6 py-3 bg-preque-carbon text-white uppercase tracking-widest text-xs font-bold hover:bg-black transition-colors rounded"
            >
                Submit Review
            </button>
        </form>
    );
}
