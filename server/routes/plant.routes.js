import { Router } from 'express';
import { plantController } from '../controllers/plant.controller.js';
import { auth } from '../middleware/auth.js';
import { validatePlantAddition } from '../validators/plant.js';

const router = Router();

router.use(auth);

router.post('/:systemId/plants', validatePlantAddition, plantController.addPlant);
router.put('/plants/:plantId/status', plantController.updatePlantStatus);
router.post('/plants/:plantId/growth', plantController.addGrowthData);
router.post('/plants/:plantId/maintenance', plantController.addMaintenanceRecord);

export const plantRoutes = router;