const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trails extends Model {}

// create fields/columns for Trail model
Trails.init(
    {
        trail_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trail_location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trail_length: {
            type: DataTypes.INTEGER,
            allowNull: false
        },  
    },
    {
        sequelize
    }
);

module.exports = Trails;