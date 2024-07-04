import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import serviceRoutes from './routes/serviceRoutes';
import './config/dotenv';
const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', serviceRoutes);

export default app;
