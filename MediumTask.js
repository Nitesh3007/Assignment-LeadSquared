import React, { useState } from 'react';

const MediumTask = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchCats = async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=9&page=${pageNumber}&order=Desc`);
      if (!response.ok) {
        throw new Error('Failed to fetch cats');
      }
      const data = await response.json();
      setCats(data);
      setPage(pageNumber);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    fetchCats(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      fetchCats(page - 1);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <button
        onClick={() => fetchCats(1)}
        className="mb-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
      >
        Fetch Cats
      </button>

      {loading && <p className="text-center text-lg">Loading...</p>}

      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {!loading && !error && cats.length === 0 && (
        <p className="text-center text-lg">No cats to display. Click the button to fetch some!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {cats.map((cat) => (
          <div key={cat.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={cat.url} alt="Cat" className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>

      {cats.length > 0 && (
        <div className="flex justify-between items-center mt-8 mb-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-lg font-semibold text-gray-700">Page {page}</span>
          <button
            onClick={handleNextPage}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MediumTask;