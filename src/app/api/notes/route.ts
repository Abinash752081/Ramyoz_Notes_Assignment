import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';

// Get all notes
export async function GET() {
  try {
    await dbConnect();
    
    // Get notes sorted by creation date (newest first)
    const notes = await Note.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: notes 
    });
  } catch (error) {
    console.error('GET /api/notes error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notes' }, 
      { status: 500 }
    );
  }
}

// Create new note
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { title, content } = body;

    // Basic validation
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' }, 
        { status: 400 }
      );
    }

    // Trim whitespace
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return NextResponse.json(
        { success: false, error: 'Title and content cannot be empty' }, 
        { status: 400 }
      );
    }

    const note = await Note.create({ 
      title: trimmedTitle, 
      content: trimmedContent 
    });
    
    return NextResponse.json({ 
      success: true, 
      data: note 
    }, { status: 201 });
    
  } catch (error) {
    console.error('POST /api/notes error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create note' }, 
      { status: 500 }
    );
  }
}