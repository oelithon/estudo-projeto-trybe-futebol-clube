module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define('Club', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    club_name: { allowNull: false, type: DataTypes.STRING },
  },
    {
      timestamps: false,
      tableName: 'clubs',
    });

  return Club;
};
