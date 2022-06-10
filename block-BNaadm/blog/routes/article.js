var express = require('express');
var router = express.Router();
let Article = require('../models/articles');
let Comment = require('../models/comment');


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

// router.get('/:id', (req, res, next) => {
//   let id = req.params.id;
//   Article.findById(id, (err, article) => {
//     if(err) return next(err);
//     Comment.find({ articleId: id }, (err, comments) => {
//       if(err) return next(err);
//       res.render("articleDetails", {article, comments});
//     })
//   })
// });

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id).populate('comments').exec((err, article) => {
    if(err) return next(err);
    res.render('articleDetails', {article})
  })
})

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
      Comment.deleteMany({articleId: article.id}, (err, info) => {
        if(err) return next(err);
        res.redirect("/articles");
      })
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

// router.post("/:id/comments", (req, res, next) => {
//   let id = req.params.id;
//   req.body.articleId = id;
//   Comment.create(req.body, (err, comment) => {
//     if(err) return next(err);
//     res.redirect("/articles/" + id);
//   })
// })

router.post("/:id/comments", (req, res, next) => {
  let id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if(err) return next(err);
    Article.findByIdAndUpdate(id, {$push: {comments: comment._id}}, (err, updatedArticle) => {
      if(err) return next(err);
      res.redirect("/articles/" + id)
    })
  })
})

module.exports = router;
