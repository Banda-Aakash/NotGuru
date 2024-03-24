const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note')
const { query, validationResult, body } = require('express-validator');




//Route 1: Fetch all notes :localhost:5000/api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error!!")
    }
})

//Route 2:Add a new note :localhost:5000/api/notes/addnote
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid Title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 charecters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            user: req.user.id, title, description, tag
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error!!")
    }
})


//Route 3:Update a new note :localhost:5000/api/notes/updatebote/:id
router.put('/updatebote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    let note = await Note.findById(req.params.id)
    if (!note) { res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note)
})

//Route 4:Delete a new note :localhost:5000/api/notes/updatebote/:id
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    let note = await Note.findById(req.params.id)
    if (!note) { res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({ Success: "Note has been deleted" })
})


module.exports = router