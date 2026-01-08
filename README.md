# Notes App

A simple notes application built with Next.js and MongoDB. You can create, edit, and delete notes.

## What I Built

This is a full-stack web app where you can:
- Create new notes with a title and content
- View all your notes in a grid layout
- Edit existing notes
- Delete notes (with confirmation)
- All notes are saved to MongoDB

## Tech Stack

- **Next.js 15** - For both frontend and backend
- **MongoDB** - Database to store notes
- **Mongoose** - MongoDB object modeling
- **Tailwind CSS** - For styling
- **TypeScript** - For type safety

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB (either local installation or MongoDB Atlas account)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up your database**:
   
   **Option 1: Local MongoDB**
   - Install MongoDB on your computer
   - Start the MongoDB service
   - The default connection string should work

   **Option 2: MongoDB Atlas (Cloud)**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Update the `MONGODB_URI` in `.env.local`

3. **Configure environment variables**:
   - Check the `.env.local` file
   - Update `MONGODB_URI` if you're using MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app
   ```

4. **Run the app**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Go to [http://localhost:3000](http://localhost:3000)

## How It Works

### API Routes
- `GET /api/notes` - Gets all notes
- `POST /api/notes` - Creates a new note
- `PUT /api/notes/[id]` - Updates a note
- `DELETE /api/notes/[id]` - Deletes a note

### File Structure
```
src/
├── app/
│   ├── api/notes/          # API endpoints
│   ├── globals.css         # Styles
│   ├── layout.tsx          # App layout
│   └── page.tsx            # Main page
├── components/
│   ├── NoteCard.tsx        # Individual note display
│   └── NoteForm.tsx        # Form for creating/editing
├── lib/
│   └── mongodb.ts          # Database connection
└── models/
    └── Note.ts             # Note data model
```

## Features

- ✅ Create notes with title and content
- ✅ View all notes in a responsive grid
- ✅ Edit existing notes
- ✅ Delete notes with confirmation
- ✅ Automatic timestamps
- ✅ Form validation
- ✅ Responsive design

## Known Issues / TODOs

- [ ] Replace `confirm()` with a proper modal
- [ ] Add loading states for buttons
- [ ] Implement proper error handling with toast notifications
- [ ] Add search functionality
- [ ] Add note categories/tags
- [ ] Improve mobile responsiveness

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add `MONGODB_URI` environment variable in Vercel dashboard
4. Deploy!

### Other Platforms
1. Build the app: `npm run build`
2. Start: `npm start`
3. Make sure to set the `MONGODB_URI` environment variable

## Development Notes

- Had some issues with Next.js 15 parameter handling in API routes (params is now a Promise)
- MongoDB connection pooling is implemented to prevent multiple connections
- Using Mongoose for schema validation and easier database operations
- Tailwind CSS for quick styling without writing custom CSS

## Contributing

Feel free to submit issues or pull requests if you find bugs or want to add features!