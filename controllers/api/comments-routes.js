const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utilities/authenticate.js");

// POST method to create a new comment.
router.post("/", withAuth, async (req, res) => {
    try {
        // Create a new comment with the comment text, the post id associated with the comment, and the user id of the logged in user.
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
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

