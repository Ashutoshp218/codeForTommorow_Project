import { Request, Response } from 'express';
import Category from '../models/categoryModel';
import Service from '../models/serviceModel';


// Region addCategory
const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(201).json(category);
};

// Region getAllCategories
const getAllCategories = async (req: Request, res: Response) => {
  const categories = await Category.findAll();
  res.json(categories);
};

// Region getAllCaupdateCategorytegories
const updateCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  const category = await Category.findByPk(categoryId);
  if (!category) {
    return res.status(404).send('Category not found');
  }

  await category.update({ name }); // Use Sequelize's update method to update attributes

  res.json(category);
};

// Region deleteCategory
const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const services = await Service.findAll({ where: { categoryId } });
    if (services.length > 0) {
      return res.status(400).json({ message: 'Category is not empty' });
    }

    await category.destroy();
    return res.status(204).json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { addCategory, getAllCategories, updateCategory, deleteCategory };
