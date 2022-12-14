import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { allowNull: false, type: DataTypes.STRING },
  role: { allowNull: false, type: DataTypes.STRING },
  email: { allowNull: false, type: DataTypes.STRING },
  password: { allowNull: false, type: DataTypes.STRING },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'users',
});

export default User;
