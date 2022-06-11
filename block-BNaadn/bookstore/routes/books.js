var express = require('express');
var router = express.Router();
let Book = require('../models/book');
let Author = require('../models/author');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Book.find({}, (err, books) => {
    if(err) return next(err);
    res.render('books', {books});
  })
})

router.get('/new', (req, res) => {
  res.render('addBook');
})

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, createdBook) => {
    if(err) return next(err);
    res.redirect('/books');
  })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if(err) return next(err);
    res.render('bookDetails', {book});
  })
})

module.exports = router;
