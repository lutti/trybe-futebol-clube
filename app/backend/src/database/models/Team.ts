import { Model, CreationOptional, DataTypes } from 'sequelize';
import db from '.';
// import Match from './Match';
// import OtherModel from './OtherModel';

class Team extends Model {
  // declare <campo>: <tipo>;
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Team.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  },
  // createdAt: DataTypes.DATE,
  // updatedAt: DataTypes.DATE,
}, {
  tableName: 'teams',
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// Match.belongsTo(Team, { foreignKey: 'home_team_id', as: 'timeDeCasa' });
// Match.belongsTo(Team, { foreignKey: 'away_team_id', as: 'timeForaDeCasa' });
// // OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// // OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Team.hasMany(Match, { foreignKey: 'home_team_id', as: 'jogosEmCasa' });
// Team.hasMany(Match, { foreignKey: 'away_team_id', as: 'jogosForaDeCasa' });
// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
