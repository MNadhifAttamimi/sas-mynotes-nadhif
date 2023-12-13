// pages/notes/create.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreateNote = () => {
    const router = useRouter();
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [error, setError] = useState(null);

    const handleCreateNote = async () => {
        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${yourAuthToken}`,
                },
                body: JSON.stringify({ title: noteTitle, content: noteContent }),
            });

            if (response.ok) {
                const data = await response.json();
                const newNoteId = data.newNote._id;
                router.push(`/note/${newNoteId}`);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                console.error('Failed to create note:', errorData.message);
            }
        } catch (error) {
            setError('Internal Server Error');
            console.error('Error during note creation:', error);
        }
    };

    return (
        <div>
            <h1>Create Note</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>Title:</label>
            <input type="text" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
            <br />
            <label>Content:</label>
            <textarea value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
            <br />
            <button onClick={handleCreateNote}>Create Note</button>
        </div>
    );
};

export default CreateNote;
    