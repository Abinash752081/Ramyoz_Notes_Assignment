import { INote } from '@/models/Note';

interface NoteCardProps {
  note: INote;
  onEdit: (note: INote) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  // Simple date formatting - could use a library like date-fns later
  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      {/* Title and action buttons */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-gray-900 truncate pr-2">
          {note.title}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id!)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
      
      {/* Note content - truncated if too long */}
      <div className="mb-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          {note.content.length > 150 
            ? note.content.substring(0, 150) + '...' 
            : note.content
          }
        </p>
      </div>
      
      {/* Timestamps */}
      <div className="text-xs text-gray-500 border-t pt-2">
        <div>Created: {formatDate(note.createdAt!)}</div>
        {note.updatedAt && note.updatedAt !== note.createdAt && (
          <div className="mt-1">Updated: {formatDate(note.updatedAt)}</div>
        )}
      </div>
    </div>
  );
}