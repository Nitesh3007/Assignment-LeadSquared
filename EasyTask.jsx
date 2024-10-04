import React, { useState } from 'react';

const CatImageGallery= () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=9&page=10&order=Desc');
      if (!response.ok) {
        throw new Error('Failed to fetch cats');
      }
      const data = await response.json();
      setCats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <button
        onClick={fetchCats}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Fetch Cats
      </button>

      {loading && <p className="text-center">Loading...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && cats.length === 0 && (
        <p className="text-center">No cats to display. Click the button to fetch some!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cats.map((cat) => (
         
            <img src={cat.url} alt="Cat" className="w-full h-48 object-cover" />
     
        ))}
      </div>
    </div>
  );
};

export default CatImageGallery;