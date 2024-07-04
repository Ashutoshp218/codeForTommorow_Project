import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/db';
import Service from './serviceModel';

class ServicePriceOption extends Model {}

ServicePriceOption.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
    allowNull: false,
  },
  serviceId: {
    type: DataTypes.INTEGER,
    references: {
      model: Service,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'ServicePriceOption',
});

Service.hasMany(ServicePriceOption, { foreignKey: 'serviceId' });
ServicePriceOption.belongsTo(Service, { foreignKey: 'serviceId' });

export default ServicePriceOption;
