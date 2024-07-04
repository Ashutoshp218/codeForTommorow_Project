import { Router } from 'express';
import { addService, getAllServices, updateService, deleteService } from '../controllers/serviceController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/category/:categoryId/service', authMiddleware, addService);
router.get('/category/:categoryId/services', authMiddleware, getAllServices);
router.put('/category/:categoryId/service/:serviceId', authMiddleware, updateService);
router.delete('/category/:categoryId/service/:serviceId', authMiddleware, deleteService);

export default router;
