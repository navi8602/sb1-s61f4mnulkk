import { Plant } from '../models/Plant.js';
import { System } from '../models/System.js';
import { ApiError } from '../utils/ApiError.js';

export const plantController = {
  async addPlant(req, res, next) {
    try {
      const { systemId } = req.params;
      const { name, position } = req.body;

      const system = await System.findOne({
        _id: systemId,
        userId: req.user.id
      });

      if (!system) {
        throw new ApiError(404, 'System not found');
      }

      // Check if position is available
      const existingPlant = await Plant.findOne({
        systemId,
        position
      });

      if (existingPlant) {
        throw new ApiError(400, 'Position already occupied');
      }

      const plantedDate = new Date();
      const expectedHarvestDate = new Date();
      expectedHarvestDate.setDate(expectedHarvestDate.getDate() + 30); // Default 30 days

      const plant = await Plant.create({
        systemId,
        name,
        position,
        plantedDate,
        expectedHarvestDate
      });

      res.status(201).json(plant);
    } catch (error) {
      next(error);
    }
  },

  async updatePlantStatus(req, res, next) {
    try {
      const { plantId } = req.params;
      const { status } = req.body;

      const plant = await Plant.findOneAndUpdate(
        { _id: plantId },
        { status },
        { new: true }
      ).populate('systemId');

      if (!plant) {
        throw new ApiError(404, 'Plant not found');
      }

      // Check if user owns the system
      if (plant.systemId.userId.toString() !== req.user.id) {
        throw new ApiError(403, 'Not authorized');
      }

      res.json(plant);
    } catch (error) {
      next(error);
    }
  },

  async addGrowthData(req, res, next) {
    try {
      const { plantId } = req.params;
      const { height, leafCount, healthScore } = req.body;

      const plant = await Plant.findById(plantId).populate('systemId');

      if (!plant) {
        throw new ApiError(404, 'Plant not found');
      }

      if (plant.systemId.userId.toString() !== req.user.id) {
        throw new ApiError(403, 'Not authorized');
      }

      plant.growthData.push({
        date: new Date(),
        height,
        leafCount,
        healthScore
      });

      await plant.save();
      res.json(plant);
    } catch (error) {
      next(error);
    }
  },

  async addMaintenanceRecord(req, res, next) {
    try {
      const { plantId } = req.params;
      const { type, notes } = req.body;

      const plant = await Plant.findById(plantId).populate('systemId');

      if (!plant) {
        throw new ApiError(404, 'Plant not found');
      }

      if (plant.systemId.userId.toString() !== req.user.id) {
        throw new ApiError(403, 'Not authorized');
      }

      plant.maintenanceHistory.push({
        date: new Date(),
        type,
        notes
      });

      await plant.save();
      res.json(plant);
    } catch (error) {
      next(error);
    }
  }
};