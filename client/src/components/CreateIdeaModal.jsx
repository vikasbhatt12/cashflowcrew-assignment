import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { createIdea } from '../api/ideas';

const CreateIdeaModal = ({ isOpen, onClose, onIdeaCreated }) => {
  const [formData, setFormData] = useState({ title: '', description: '', author: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.length > 100) newErrors.title = 'Title must be less than 100 characters';
    
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length > 1000) newErrors.description = 'Description must be less than 1000 characters';
    
    if (!formData.author.trim()) newErrors.author = 'Author name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const newIdea = await createIdea(formData);
      onIdeaCreated(newIdea.data);
      setFormData({ title: '', description: '', author: '' });
      setErrors({});
      onClose();
    } catch (error) {
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      } else {
        setErrors({ submit: 'Failed to create idea. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl w-full max-w-lg relative z-10 animate-slide-up flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-dark-700">
          <h2 className="text-2xl font-bold text-white">Share an Idea</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors bg-dark-700 hover:bg-dark-600 p-2 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="title">
                Idea Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                autoFocus
                placeholder="E.g. AI-powered recipe generator"
                className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                value={formData.title}
                onChange={handleChange}
              />
              <div className="flex items-center justify-between mt-1">
                {errors.title ? (
                  <p className="text-red-400 text-xs">{errors.title}</p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-gray-500">{formData.title.length}/100</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Describe your idea in detail..."
                className={`input-field resize-none ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                value={formData.description}
                onChange={handleChange}
              />
              <div className="flex items-center justify-between mt-1">
                {errors.description ? (
                  <p className="text-red-400 text-xs">{errors.description}</p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-gray-500">{formData.description.length}/1000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="author">
                Your Name
              </label>
              <input
                id="author"
                name="author"
                type="text"
                placeholder="John Doe"
                className={`input-field ${errors.author ? 'border-red-500 focus:ring-red-500' : ''}`}
                value={formData.author}
                onChange={handleChange}
              />
              {errors.author && <p className="text-red-400 text-xs mt-1">{errors.author}</p>}
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-dark-700">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center gap-2 min-w-[120px]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Post Idea</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIdeaModal;
