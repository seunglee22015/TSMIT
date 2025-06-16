'use client'

import {DogBreedsById} from "@/types/DogBreed";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";

export default function BreedDetailPage() {
    const router = useRouter();
    const params = useParams(); // 곧 공식화 할 params 사용법
    const id = params?.id as string; // 곧 공식화 할 params 사용법

    const [breed, setBreed] = useState<DogBreedsById | null>(null);
    const [loading, setLoading] = useState(true); // CSR로 바꾸면서 Loading도 보여주기

    const [note, setNote] = useState(''); // Session 12
    const [originalNote, setOriginalNote] = useState(''); // Session 12
    const [successMessage, setSuccessMessage] = useState(""); // Session 12

    useEffect(() => {
        async function fetchBreed() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dog-breeds/${id}`);
                if (res.data.memo) {
                    setNote(res.data.memo);
                    setOriginalNote(res.data.memo);
                }
                setBreed(res.data);
            } catch (error) {
                console.error('❌ 데이터 요청 실패:', error);
            } finally {
                setLoading(false);  // CSR로 바꾸면서 Loading도 보여주기
            }
        }

        void fetchBreed();
    }, [id]);

    // Session 12
    const handleAddFavorite = async () => {
        if (!breed) return;

        try {
            if (originalNote) {
                await axios.patch(`/api/favorite-breeds/${breed.id}`, {
                    memo: note,
                });
                setSuccessMessage("✅ Successfully edited the note!")

            } else {
                await axios.post('/api/favorite-breeds', {
                    breeds_id: breed.id,
                    memo: note,
                });
                setSuccessMessage("✅ Successfully added to favorites!")
            }

            setOriginalNote(note);
        } catch (err) {
            console.error('❌ 즐겨찾기 추가 실패:', err);
        }
    };

    const handleDeleteFavorite = async () => {
        if (!breed) return;

        const confirmDelete = window.confirm(`Do you want to delete ${breed.attributes.name} from your favorites?`);
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/favorite-breeds/${breed.id}`);
            setNote('');
            setOriginalNote('');
            setSuccessMessage("❗ Successfully removed from favorites!")
        } catch (err) {
            console.error('❌ 즐겨찾기 삭제 실패:', err);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (!breed) return <p>The breed does not exist.</p>;

    // const breed = await getBreedById(params.id); // ✅ 일반적으로 이렇게 많이 씀
    return (
        <main className={`w-full flex justify-center`}>
            <div className="mt-4 max-w-[500px] bg-blue-200 p-6 rounded-xl">
                <div className="flex justify-between items-center">
                    <div onClick={() => router.back()} className={`box-border p-2 rounded-xl hover:bg-blue-300 cursor-pointer`}>
                        ← Back
                    </div>
                    {originalNote && (
                        <button
                            onClick={handleDeleteFavorite}
                            className="bg-red-200 p-2 rounded-xl hover:bg-gray-200 cursor-pointer shadow-lg"
                        >
                            ❤️ Remove
                        </button>
                    )}
                </div>
                <div className={`mt-4 border-white border-2 p-4 rounded-2xl flex gap-2 flex-wrap`}>
                    <h1 className="text-2xl font-bold">{breed.attributes.name}</h1>
                    <p>{breed.attributes.description}</p>
                    <p>🐾 Lifespan: {breed.attributes.life.min} - {breed.attributes.life.max}</p>
                </div>
                <div className={`mt-4`}>
                    {/* Session 12 below */}
                    <textarea
                        className="bg-gray-50 text-black w-full h-24 p-2 rounded block border-2 border-gray-500"
                        placeholder="Why do you like this breed?"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                    <button
                        onClick={handleAddFavorite}
                        className="mt-2 border-gray-500 border-2 p-2 rounded-xl hover:bg-gray-500 hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!note.trim() || note === originalNote}
                    >
                        {originalNote ? "Edit Note" : "Add Favorite"}
                    </button>
                    {successMessage && (
                        <p className={`mt-2 ${successMessage.includes("removed") ?  "text-red-600" : "text-green-400"}`}>{successMessage}</p>
                    )}
                </div>
            </div>
        </main>
    );
}
