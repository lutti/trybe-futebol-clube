import { Model, CreationOptional, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class User extends Model {
  // declare <campo>: <tipo>;
  declare id: CreationOptional<number>;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  // createdAt: DataTypes.DATE,
  // updatedAt: DataTypes.DATE,
}, {
  tableName: 'users',
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default User;
