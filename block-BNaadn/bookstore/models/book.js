let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bookSchema = new Schema({
    title: {type: String, required: true},
    summary: String,
    pages: Number,
    publication: String,
    name: {type: String, required: true},
    email: String,
    country: String,
    // author: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }]
}, {timestamps: true});

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;