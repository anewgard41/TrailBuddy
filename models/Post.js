const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// create fields/columns for Post model
Post.init(
    {
        title: DataTypes.STRING,
        dateCreated: DataTypes.DATE,
        body: DataTypes.TEXT
    },
    {
        sequelize
    }
);

module.exports = Post;