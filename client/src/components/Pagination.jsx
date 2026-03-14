import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-12 mb-8 select-none">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`p-2 rounded-lg transition-colors ${
          page === 1
            ? 'text-dark-600 bg-dark-800/50 cursor-not-allowed'
            : 'text-gray-300 bg-dark-800 hover:bg-dark-700 hover:text-white cursor-pointer shadow-md'
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-all ${
              page === p
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'bg-dark-800 text-gray-400 hover:bg-dark-700 hover:text-white'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          page === totalPages
            ? 'text-dark-600 bg-dark-800/50 cursor-not-allowed'
            : 'text-gray-300 bg-dark-800 hover:bg-dark-700 hover:text-white cursor-pointer shadow-md'
        }`}
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
