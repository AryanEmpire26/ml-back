// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const { authenticate } = require('../middleware/auth');

// Create a new note
router.post('/', authenticate, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({
            userId: req.user.id,
            title,
            content
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).send('Error creating note');
    }
});

// Get all notes for the logged-in user
router.get('/', authenticate, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).send('Error fetching notes');
    }
});

// Delete a note
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).send('Error deleting note');
    }
});

module.exports = router;
