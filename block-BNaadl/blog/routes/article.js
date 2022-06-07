var express = require('express');
var router = express.Router();
let Article = require('../models/articles');

/* GET article listing. */
router.get('/', function(req, res, next) {
  Article.find({}, (err, articles) => {
    if(err) return next(err);
    res.render('article', {articles: articles});
})
});

router.get("/new", (req, res,) => {
  res.render("addArticle");
});

router.post("/", (req, res, next) => {
  req.body.tags = req.body.tags.trim().split(" ");
  Article.create(req.body, (err, createdArticle) => {
    if(err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if(err) return next(err);
    res.render("articleDetails", {article: article});
  })
});

router.get("/:id/edit", (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    article.tags = article.tags.join(" ");
    if(err) return next(err);
    res.render('editarticleForm', {article: article});
  })
});

router.post("/:id", (req, res, next) => {
  let id = req.params.id;
  req.body.tags = req.body.tags.split(" ");
  Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
      if(err) return next(err);
      res.redirect('/articleDetails/' + id);
  })
})

router.get("/:id/delete", (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
      if(err) return next(err);
      res.redirect("/articles");
  })
})

router.get("/:id/likes", (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, article) => {
    if(err) return next(err);
    res.redirect("/articles/" + id)
  })
})

router.get("/:id/dislikes", (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, {$inc: {likes: -1}}, (err, article) => {
    if(err) return next(err);
    res.redirect("/articles/" + id)
  })
})

module.exports = router;
