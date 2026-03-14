import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ChevronUp, Trash2, User, Clock } from 'lucide-react';
import { upvoteIdea, deleteIdea } from '../api/ideas';

const IdeaCard = ({ idea, onIdeaUpdate, onIdeaDelete }) => {
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpvote = async () => {
    if (isUpvoting) return;
    setIsUpvoting(true);
    try {
      const updatedIdea = await upvoteIdea(idea._id);
      onIdeaUpdate(updatedIdea.data);
    } catch (error) {
      console.error('Failed to upvote:', error);
    } finally {
      setIsUpvoting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      setIsDeleting(true);
      try {
        await deleteIdea(idea._id);
        onIdeaDelete(idea._id);
      } catch (error) {
        console.error('Failed to delete:', error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col h-full animate-fade-in relative group">
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-400 hover:bg-dark-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
        title="Delete Idea"
      >
        <Trash2 size={18} />
      </button>

      <div className="flex-1 pr-8">
        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{idea.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {idea.description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-dark-700 flex items-center justify-between">
        <div className="flex flex-col gap-1.5 custom-text-xs">
          <div className="flex items-center text-gray-400 text-xs">
            <User size={14} className="mr-1.5 text-primary-400" />
            <span className="font-medium truncate max-w-[120px]">{idea.author}</span>
          </div>
          <div className="flex items-center text-gray-500 text-xs">
            <Clock size={14} className="mr-1.5" />
            <span>{formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}</span>
          </div>
        </div>

        <button
          onClick={handleUpvote}
          disabled={isUpvoting}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all duration-300 ${
            isUpvoting 
              ? 'bg-primary-600/50 text-white scale-95' 
              : 'bg-dark-700 hover:bg-primary-600/20 text-primary-400 hover:text-primary-300 border border-transparent hover:border-primary-500/30'
          }`}
        >
          <ChevronUp size={18} className={isUpvoting ? 'animate-bounce' : ''} />
          <span>{idea.upvotes}</span>
        </button>
      </div>
    </div>
  );
};

export default IdeaCard;
