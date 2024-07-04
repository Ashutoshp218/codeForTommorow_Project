import { Router } from 'express';
import { addCategory, getAllCategories, updateCategory, deleteCategory } from '../controllers/categoryController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/category', authMiddleware, addCategory);
router.get('/categories', authMiddleware, getAllCategories);
router.put('/category/:categoryId', authMiddleware, updateCategory);
router.delete('/category/:categoryId', authMiddleware, deleteCategory);

export default router;
