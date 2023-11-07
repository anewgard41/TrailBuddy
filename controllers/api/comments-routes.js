const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const withAuth = require("../../utilities/authenticate.js");

router.get('/', async (req, res) => {
    try{
      const commentData = await Comment.findAll();
      // serialize the data
      const comments = commentData.get({ plain: true });
  
      console.log(comments);
  
      res.json(comments);
    } catch(err) {
      res.status(500).json(err);
    }
  });

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newComment = await Comment.create({
      ...body,
      user_id: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST method to create a new comment.
router.post('/:post_id', withAuth, async (req, res) => {
    try {
        const { content } = req.body;
        const { user_id } = req.session;
        const post_id = req.params.post_id;

        // Create the comment and associate it with the specific post
        const newComment = await Comment.create({
            content,
            user_id,
            post_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT method to update a comment by its id.
router.put("/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        // If no comment is found with the specified id, return an error message.
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE method to delete a comment by its id.
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        // If no comment is found with the specified id, return an error message.
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id!" });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

