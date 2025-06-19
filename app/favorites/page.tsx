import axios from "axios";
import FavoriteList from "@/components/FavoriteList";

export const metadata = {
    title: "Favorites | Dog Breeds",
};

async function getFavorites() {
    // const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorite-breeds`);
    const res = {
  "data": [
    {
      "id": "036feed0-da8a-42c9-ab9a-57449b530b13",
      "name": "Affenpinscher",
      "description": "The Affenpinscher is a small and playful breed of dog that was originally bred in Germany for hunting small game. They are intelligent, energetic, and affectionate, and make excellent companion dogs.",
      "life": {
          "max": 16,
          "min": 14
        }
    },
    {
      "id": "dd9362cc-52e0-462d-b856-fccdcf24b140",
      "name": "Afghan Hound",
      "description": "The Afghan Hound is a large and elegant breed of dog that was originally bred in Afghanistan for hunting small game. They are intelligent, independent, and athletic, and make excellent companion dogs.",
      "life": {
          "max": 14,
          "min": 12
      }
    }
  ]
}
    return res.data;
}

export default async function FavoritesPage() {
    const favorites = await getFavorites();

    return (
        <div className="min-h-screen w-full bg-gray-50 text-gray-800">

            <section className="max-w-4xl mx-auto px-4 py-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-700 mb-2">❤️ Favorite Breed List</h1>
                    <p className="text-gray-600 text-base">
                        Your favorite dog breeds!
                    </p>
                </div>
                <FavoriteList favorites={favorites} />
            </section>
        </div>
    );
}
