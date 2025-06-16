import React from 'react';
import Link from "next/link";

interface FavoriteListProps {
    favorites: {
        id: string;
        name: string;
        description: string;
        life: {
            max: number,
            min: number
        };
    }[];
}

function FavoriteList({ favorites }: FavoriteListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {
                favorites.map((favorite) => (
                    <Link
                        key={favorite.id}
                        href={`/breeds/${favorite.id}`}
                        className="block p-5 bg-white rounded-lg shadow hover:shadow-lg hover:bg-blue-50 transition duration-200 border border-gray-200"
                    >
                        <h3 className="text-lg font-semibold text-blue-700 mb-1">
                            {favorite.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{favorite.description}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            🧬 Life span: {favorite.life.min} – {favorite.life.max} years
                        </p>
                    </Link>
                ))
            }
        </div>
    );
}

export default FavoriteList;