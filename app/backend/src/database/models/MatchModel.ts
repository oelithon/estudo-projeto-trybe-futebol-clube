import { DataTypes, Model } from 'sequelize';
import db from '.';

class Match extends Model {
  public id: number;

  public home_team: number;

  public home_team_goals: number;

  public away_team: number;

  public away_team_goals: number;

  public in_progress: boolean;
}

Match.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  home_team: { allowNull: false, type: DataTypes.NUMBER },
  home_team_goals: { allowNull: false, type: DataTypes.NUMBER },
  away_team: { allowNull: false, type: DataTypes.NUMBER },
  away_team_goals: { allowNull: false, type: DataTypes.NUMBER },
  in_progress: { allowNull: false, type: DataTypes.BOOLEAN },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'matchs',
});

export default Match;
