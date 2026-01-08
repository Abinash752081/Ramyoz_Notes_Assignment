'use client';

import { useState, useEffect } from 'react';
import { INote } from '@/models/Note';
import NoteCard from '@/components/NoteCard';
import NoteForm from '@/components/NoteForm';

export default function Home() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<INote | null>(null);
  

  useEffect(() => {
    loadNotes();
  }, []);

  // Initially called this fetchNotes but renamed for clarity
  const loadNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      
      // Had to add this check after getting undefined errors
      if (data && data.success) {
        setNotes(data.data || []);
      } else {
        console.log('No notes found or API error');
        setNotes([]);
      }
    } catch (error) {
      console.log('Error loading notes:', error);
      // Should probably show user-friendly error message
      setNotes([]);
    }
    setLoading(false);
  };

  const createNote = async (noteData: { title: string; content: string }) => {
    // Basic validation - could be improved
    if (!noteData.title.trim() || !noteData.content.trim()) {
      alert('Please fill in both fields');
      return;
    }

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Add new note to the beginning of the list
        setNotes([data.data, ...notes]);
        setShowForm(false);
      } else {
        alert('Failed to create note');
      }
    } catch (error) {
      console.log('Create error:', error);
      alert('Something went wrong');
    }
  };

  const updateNote = async (id: string, noteData: { title: string; content: string }) => {
    console.log('Updating note:', id); // Debug log I forgot to remove
    
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update the note in the list
        const updatedNotes = notes.map(note => 
          note._id === id ? data.data : note
        );
        setNotes(updatedNotes);
        setEditingNote(null);
      } else {
        alert('Failed to update note');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating note');
    }
  };

  function deleteNote(id: string) {
    // Using confirm for now - should implement proper modal later
    const confirmed = confirm('Delete this note?');
    if (!confirmed) return;

    fetch(`/api/notes/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          setNotes(notes.filter(note => note._id !== id));
        } else {
          alert('Failed to delete note');
        }
      })
      .catch(error => {
        console.log('Delete error:', error);
        alert('Error deleting note');
      });
  }

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Notes App</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            {showForm ? 'Cancel' : 'New Note'}
          </button>
        </div>

        {/* Form section - shows when creating or editing */}
        {(showForm || editingNote) && (
          <div className="mb-6">
            <NoteForm
              note={editingNote}
              onSubmit={editingNote 
                ? (data) => updateNote(editingNote._id!, data)
                : createNote
              }
              onCancel={() => {
                setShowForm(false);
                setEditingNote(null);
              }}
            />
          </div>
        )}

        {/* Notes grid */}
        {notes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No notes yet!</p>
            <p className="text-gray-400 text-sm mt-2">Click "New Note" to get started</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={(note) => setEditingNote(note)}
                onDelete={deleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}