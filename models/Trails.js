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
    },
    {
        sequelize
    }
);

Trails.populateFromAPI = async () => {
    try {
      const trailData = await fetchTrails();
      for (const trail of trailData.results) {
        await Trails.create({
          trail_name: trail.name,
          trail_location: trail.segment,
          trail_length: trail.length,
        });
      }
    } catch (error) {
      console.error('Error populating Trails from API:', error);
      throw error;
    }
  };

module.exports = Trails;