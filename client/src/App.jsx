import React, { useState, useEffect, useCallback } from 'react';
import { Lightbulb, Plus } from 'lucide-react';
import { fetchIdeas } from './api/ideas';
import IdeaCard from './components/IdeaCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import CreateIdeaModal from './components/CreateIdeaModal';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadIdeas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchIdeas(page, 9, search, sort); // limit to 9 per page
      setIdeas(data.data);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to load ideas. Please ensure the backend server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, sort]);

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  // Reset page to 1 when search or sort changes
  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  const handleIdeaCreated = () => {
    // If we're on page 1 and searching newest, we can just reload
    // Easiest is to reload everywhere
    setPage(1);
    setSort('newest');
    loadIdeas();
  };

  const handleIdeaUpdate = (updatedIdea) => {
    setIdeas((prev) => 
      prev.map(idea => idea._id === updatedIdea._id ? updatedIdea : idea)
    );
  };

  const handleIdeaDelete = (deletedId) => {
    setIdeas((prev) => prev.filter(idea => idea._id !== deletedId));
    // If the page is empty after delete, reload
    if (ideas.length === 1 && page > 1) {
      setPage(page - 1);
    } else {
      loadIdeas(); // to fetch the next item to replace the deleted one on page
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-dark-900/80 backdrop-blur-lg border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-600/20 text-primary-500 rounded-xl">
              <Lightbulb size={24} className="animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
              IdeaSpark
            </h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New Idea</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Intro Section */}
        <section className="text-center py-12 mb-8 animate-fade-in relative overflow-hidden rounded-3xl bg-dark-800 border border-dark-700/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 px-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Pitch Your Next <span className="text-primary-400">Big Idea</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Share your project concepts, view what others are building, and upvote the ones you want to see come to life.
            </p>
            <SearchBar onSearch={setSearch} onSortChange={setSort} currentSort={sort} />
          </div>
        </section>

        {/* Ideas Grid */}
        <section>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-center text-red-400 animate-fade-in mb-8">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
            </div>
          ) : ideas.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map((idea) => (
                  <IdeaCard 
                    key={idea._id} 
                    idea={idea} 
                    onIdeaUpdate={handleIdeaUpdate}
                    onIdeaDelete={handleIdeaDelete}
                  />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            </>
          ) : (
            <div className="text-center py-20 bg-dark-800/30 rounded-2xl border border-dark-700 border-dashed">
              <Lightbulb size={48} className="mx-auto text-dark-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-300 mb-2">No ideas found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {search ? "We couldn't find any ideas matching your search." : "Be the first to share an amazing idea with the community!"}
              </p>
              {!search && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary"
                >
                  Share an Idea
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8 bg-dark-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>IdeaSpark Pitching Board &copy; {new Date().getFullYear()}. Built with MERN Stack.</p>
        </div>
      </footer>

      <CreateIdeaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onIdeaCreated={handleIdeaCreated}
      />
    </div>
  );
}

export default App;
