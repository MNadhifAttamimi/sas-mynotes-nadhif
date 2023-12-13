// api/server/notes/create.js
import { connectMongoDB } from '../../db/mongoDB';
import Notes from '@/models/Note';
import { verifyToken } from '../../middleware/authMiddleware'; // Import your token verification middleware

connectMongoDB();

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res
                .status(405)
                .json({ error: true, message: 'Method not allowed' });
        }

        const { title, content, token } = req.body;

        if (!title) {
            return res
                .status(400)
                .json({ error: true, message: 'Title are required' });
        }
        if (!content) {
            return res
                .status(400)
                .json({ error: true, message: 'content are required' });
        }
        if (!token) {
            return res
                .status(400)
                .json({ error: true, message: 'token are required' });
        }

        const user_id = verifyToken(token); // Use your token verification logic here

        if (!user_id) {
            return res.status(401).json({ error: true, message: 'Invalid token' });
        }

        const newNote = new Notes({ title, content, user_id });
        await newNote.save();

        return res.status(201).json({ newNote });
    } catch (error) {
        console.error('Error during note creation:', error);
        res
            .status(500)
            .json({ error: true, message: 'Internal Server Error' });
    }
}
