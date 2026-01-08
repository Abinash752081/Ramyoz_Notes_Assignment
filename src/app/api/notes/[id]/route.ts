import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';
import mongoose from 'mongoose';

// Get single note by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid note ID format' }, 
        { status: 400 }
      );
    }
    
    const note = await Note.findById(id);
    
    if (!note) {
      return NextResponse.json(
        { success: false, error: 'Note not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: note });
    
  } catch (error) {
    console.error(`GET /api/notes/${params} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch note' }, 
      { status: 500 }
    );
  }
}

// Update note
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid note ID format' }, 
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { title, content } = body;

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' }, 
        { status: 400 }
      );
    }

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return NextResponse.json(
        { success: false, error: 'Title and content cannot be empty' }, 
        { status: 400 }
      );
    }

    // Update the note
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { 
        title: trimmedTitle, 
        content: trimmedContent 
      },
      { 
        new: true, // Return updated document
        runValidators: true // Run schema validation
      }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { success: false, error: 'Note not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedNote });
    
  } catch (error) {
    console.error(`PUT /api/notes/${params} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to update note' }, 
      { status: 500 }
    );
  }
}

// Delete note
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid note ID format' }, 
        { status: 400 }
      );
    }
    
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json(
        { success: false, error: 'Note not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Note deleted successfully' 
    });
    
  } catch (error) {
    console.error(`DELETE /api/notes/${params} error:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete note' }, 
      { status: 500 }
    );
  }
}