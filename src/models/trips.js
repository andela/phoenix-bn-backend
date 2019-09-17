export default (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
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
      type: DataTypes.DATE
    },
    travelReasons: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    accommodation: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['accepted', 'rejected', 'pending'],
      defaultValue: 'pending',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      allowNull: false
    },
  });
  return Trip;
};
