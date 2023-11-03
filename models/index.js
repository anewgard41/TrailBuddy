const User = require('./Users.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');
const Trails = require('./Trails.js');

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(Trails, {
    foreignKey: 'trail_id',
    onDelete: 'CASCADE'
});

Trails.hasMany(Post, {
    foreignKey: 'trail_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment, Trails };

