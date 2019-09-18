export default (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    managerId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    statusId: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      references: {
        model: {
          tableName: 'Statuses'
        },
        key: 'id',
      },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    tripType: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['One Way Trip', 'Two way Trip'],
    },
    origin: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    destination: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    travelDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    travelReasons: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    accommodation: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  Request.associate = (models) => {
    Request.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Request.belongsTo(models.User, {
      as: 'manager',
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Request.belongsTo(models.Status, {
      as: 'status',
      foreignKey: 'statusId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};
