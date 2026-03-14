import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ onSearch, onSortChange, currentSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-500" />
        </div>
        <input
          type="text"
          className="input-field pl-10 bg-dark-800"
          placeholder="Search ideas by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="relative min-w-[180px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Filter size={18} className="text-gray-500" />
        </div>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-100 appearance-none cursor-pointer hover:border-dark-600 transition-colors"
        >
          <option value="newest">Newest First</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
