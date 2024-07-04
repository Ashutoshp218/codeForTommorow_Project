import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/db';
import Category from './categoryModel';

class Service extends Model {  public id!: number;
  public name!: string;
  public type!: 'Normal' | 'VIP'; 
  public categoryId!: number;}

Service.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Normal', 'VIP'),
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Service',
});

Category.hasMany(Service, { foreignKey: 'categoryId' });
Service.belongsTo(Category, { foreignKey: 'categoryId' });

export default Service;
