// api/server/notes/create.js
import { connectMongoDB } from '../../db/mongoDB';
import Notes from '@/models/Note';

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({ error: true, message: 'Method not allowed' });
        }

        const { title, content } = req.body;

        if (!title || !content) {
            return res
                .status(400)
                .json({ error: true, message: 'Title and content are required' });
        }

        const newNote = new Notes({ title, content });
        await newNote.save();

        return res.status(201).json({ newNote });
    } catch (error) {
        console.error('Error during note creation:', error);
        res
            .status(500)
            .json({ error: true, message: 'Internal Server Error' });
    }
}
