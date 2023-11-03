const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// create fields/columns for Post model
Post.init(
    {
        title: DataTypes.STRING,
        dateCreated: DataTypes.DATE,
        body: DataTypes.TEXT,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize
    }
);

module.exports = Post;