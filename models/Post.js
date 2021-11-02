const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    postContent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'user',
            key: 'username'
        }
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;