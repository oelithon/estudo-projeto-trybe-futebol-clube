import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './MatchModel';

class Club extends Model {
  public id: number;

  public clubName: string;
}

Club.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  clubName: { allowNull: false, type: DataTypes.STRING },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'clubs',
});

Match.belongsTo(Club, {
  foreignKey: 'home_team',
});

Match.belongsTo(Club, {
  foreignKey: 'away_team',
});

export default Club;
