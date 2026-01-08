import { useState, useEffect } from 'react';
import { INote } from '@/models/Note';

interface NoteFormProps {
  note?: INote | null;
  onSubmit: (data: { title: string; content: string }) => void;
  onCancel: () => void;
}

export default function NoteForm({ note, onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  // Load note data when editing
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      // Reset form for new note
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!content.trim()) {
      alert('Please enter some content');
      return;
    }

    setSaving(true);
    try {
      await onSubmit({ 
        title: title.trim(), 
        content: content.trim() 
      });
    } catch (error) {
      console.log('Form submit error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {note ? 'Edit Note' : 'Create New Note'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter note title..."
            maxLength={100}
            disabled={saving}
          />
          <div className="text-xs text-gray-500 mt-1">
            {title.length}/100 characters
          </div>
        </div>
        
        {/* Content textarea */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="Write your note here..."
            disabled={saving}
          />
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md font-medium"
          >
            {saving ? 'Saving...' : (note ? 'Update' : 'Create')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}