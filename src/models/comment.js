export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.Trip, {
      foreignKey: 'tripId', as: 'trips', timestamps: false
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId', as: 'users', timestamps: false
    });
  };
  return Comment;
};
