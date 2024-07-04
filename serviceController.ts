import { Request, Response } from 'express';
import Service from '../models/serviceModel';
import ServicePriceOption from '../models/servicePriceOptionModel';

const addService = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { name, type, priceOptions } = req.body;

  try {
    const service = await Service.create({ categoryId: parseInt(categoryId, 10), name, type });

    if (priceOptions && Array.isArray(priceOptions)) {
      for (const option of priceOptions) {
        await ServicePriceOption.create({ ...option, serviceId: service.id });
      }
    }

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


const getAllServices = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const services = await Service.findAll({ where: { categoryId } });
  res.json(services);
};


const updateService = async (req: Request, res: Response) => {
  const { categoryId, serviceId } = req.params;
  const { name, type, priceOptions } = req.body;

  try {
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).send('Service not found');
    }

    service.name = name;
    service.type = type; 

    await service.save();

    if (priceOptions) {
      await ServicePriceOption.destroy({ where: { serviceId } });

      for (const option of priceOptions) {
        await ServicePriceOption.create({ ...option, serviceId });
      }
    }

    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const deleteService = async (req: Request, res: Response) => {
  const { serviceId } = req.params;

  const result = await Service.destroy({ where: { id: serviceId } });
  if (!result) {
    return res.status(404).send('Service not found');
  }

  res.status(204).send();
};

export { addService, getAllServices, updateService, deleteService };
