// models/Note.js
import mongoose from 'mongoose';

let NoteModel;

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    note: { type: String, maxlength: 2000 },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Remove required: true
    date: { type: Date, default: Date.now },
});

if (mongoose.models.NoteModel) {
    NoteModel = mongoose.model('NoteModel');
} else {
    NoteModel = mongoose.model('NoteModel', noteSchema);
}

export default NoteModel;
