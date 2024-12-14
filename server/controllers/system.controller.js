import { System } from '../models/System.js';
import { ApiError } from '../utils/ApiError.js';

export const systemController = {
  async getRentedSystems(req, res, next) {
    try {
      const systems = await System.find({ userId: req.user.id })
        .populate('plants')
        .sort('-createdAt');
      
      res.json(systems);
    } catch (error) {
      next(error);
    }
  },

  async rentSystem(req, res, next) {
    try {
      const { systemType, rentalPeriod } = req.body;

      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + rentalPeriod);

      const system = await System.create({
        userId: req.user.id,
        systemType,
        rentalPeriod,
        startDate,
        endDate,
        name: `HydroPro ${systemType.split('-')[1]}`,
        capacity: systemType === 'hydropro-2000' ? 8 : 
                 systemType === 'hydropro-3000' ? 12 : 16
      });

      res.status(201).json(system);
    } catch (error) {
      next(error);
    }
  },

  async getSystemMetrics(req, res, next) {
    try {
      const { systemId } = req.params;
      const system = await System.findOne({
        _id: systemId,
        userId: req.user.id
      });

      if (!system) {
        throw new ApiError(404, 'System not found');
      }

      res.json(system.metrics);
    } catch (error) {
      next(error);
    }
  },

  async updateSystemMetrics(req, res, next) {
    try {
      const { systemId } = req.params;
      const { metrics } = req.body;

      const system = await System.findOneAndUpdate(
        { _id: systemId, userId: req.user.id },
        { 
          'metrics': { ...metrics, lastUpdated: new Date() }
        },
        { new: true }
      );

      if (!system) {
        throw new ApiError(404, 'System not found');
      }

      res.json(system.metrics);
    } catch (error) {
      next(error);
    }
  }
};