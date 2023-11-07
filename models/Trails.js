const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { fetchTrails } = require('./trailService');

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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        trail_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        surf_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        geo_point: {
            type: DataTypes.JSON,  
            allowNull: true
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: false,
        underscored: true,
        modelName: 'trails',
    }
);

Trails.populateFromAPI = async () => {
    try {
        let page = 1;
        let shouldContinue = true;

        while (shouldContinue) {
            const trailData = await fetchTrails(page);

            if (trailData.results && trailData.results.length > 0) {
                for (const trail of trailData.results) {
                    await Trails.create({
                        trail_name: trail.name,
                        trail_location: trail.segment,
                        trail_length: trail.length,
                        trail_type: trail.trailtype,
                        surf_type: trail.surftype,
                        geo_point: trail.geo_point_2d,
                    });
                }
                page += 1;
            } else {
                shouldContinue = false;
            }
        }
    } catch (error) {
        console.error('Error populating Trails from API:', error);
        throw error;
    }
};

module.exports = Trails;
