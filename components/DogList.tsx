"use client";

import Link from "next/link";

interface DogListProps {
    breeds: {
        id: string;
        name: string;
        description: string;
        life: {
            max: number,
            min: number
        }
    }[];
}

export default function DogList({ breeds }: DogListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {breeds.map((breed) => (
                <Link
                    key={breed.id}
                    href={`/breeds/${breed.id}`}
                    className="block p-5 bg-white rounded-lg shadow hover:shadow-lg hover:bg-blue-50 transition duration-200 border border-gray-200"
                >
                    <h3 className="text-lg font-semibold text-blue-700 mb-1">
                        {breed.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{breed.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                        🧬 Life span: {breed.life.min} – {breed.life.max} years
                    </p>
                </Link>
            ))}
        </div>
    );
}
