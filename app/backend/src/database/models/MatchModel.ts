import { DataTypes, Model } from 'sequelize';
import db from '.';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  homeTeam: { allowNull: false, type: DataTypes.NUMBER },
  homeTeamGoals: { allowNull: false, type: DataTypes.NUMBER },
  awayTeam: { allowNull: false, type: DataTypes.NUMBER },
  awayTeamGoals: { allowNull: false, type: DataTypes.NUMBER },
  inProgress: { allowNull: false, type: DataTypes.BOOLEAN },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'matchs',
});

export default Match;
