import { DataTypes, Model } from 'sequelize';
import db from '.';

class Club extends Model {
  public id: number;

  public home_team: number;

  public home_team_goals: number;

  public away_team: number;

  public away_team_goals: number;

  public in_progress: boolean;
}

Club.init({
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
  tableName: 'clubs',
});

export default Club;
