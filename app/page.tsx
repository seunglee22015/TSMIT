export default async function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6">
          Discover Your Favorite Dog Breeds 🐶
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10">
          Browse through various dog breeds, learn about them, and save your
          favorites with just one click.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/breeds"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Browse Breeds
          </a>
          <a
            href="/favorites"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            My Favorites
          </a>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-10">
            Key Features for test
          </h2>
          <div className="grid gap-8 sm:grid-cols-3 text-left">
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-lg font-bold mb-2 text-blue-700">
                🐕 Breed Explorer
              </h3>
              <p className="text-sm text-gray-600">
                Learn about various dog breeds, their characteristics, and
                lifespan.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-lg font-bold mb-2 text-blue-700">
                ⭐ Add to Favorites
              </h3>
              <p className="text-sm text-gray-600">
                Save your favorite dog breeds with one click and view them
                anytime.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <h3 className="text-lg font-bold mb-2 text-blue-700">
                🔒 Supabase Integration
              </h3>
              <p className="text-sm text-gray-600">
                Your favorites are securely stored with Supabase, accessible
                only by you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*<footer className="text-center text-sm text-gray-500 py-6 border-t mt-10">*/}
      {/*    © 2025 Dog Breed Explorer. Built with Next.js & Supabase.*/}
      {/*</footer>*/}
    </main>
  );
}
