import app from './app';
import sequelize from './utils/db';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
