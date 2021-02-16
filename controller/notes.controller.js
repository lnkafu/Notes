
const Note = require('../models/notes.model.js');
// Create and Save a new Note
exports.create = (req, res) => {
    let note = new Note()
    note.title = req.body.title
    note.content = req.body.content

    note.save(err=> {
        if (err) res.status(200).send(err)
        res.json({
            status: 201,
            message: "note saved successfully",
            data: note
        })
    })
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.get((err,notes) =>{
        if (err) {
            res.json({
                status: 'Error',
                message: err
            })
        }
        res.json({
            status: 200,
            message: ' Retrieved successfully',
            data: notes
        })
    })
};
// Find a single note with a noteId
exports.findOne = (req, res) => {
     return Note.findOne(req.params.noteId)
        .then( note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.json({
                status: 200,
                message: 'Retrival successful',
                data: note
            })
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });                
            }
        });
};
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    let note = new Note()
    note.content = req.body.content? req.body.content: note.content
    note.title = req.body.title? req.body.title: note.title

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};