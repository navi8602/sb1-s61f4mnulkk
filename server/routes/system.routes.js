import { Router } from 'express';
import { systemController } from '../controllers/system.controller.js';
import { auth } from '../middleware/auth.js';
import { validateSystemRental } from '../validators/system.js';

const router = Router();

router.use(auth);

router.get('/', systemController.getRentedSystems);
router.post('/rent', validateSystemRental, systemController.rentSystem);
router.get('/:systemId/metrics', systemController.getSystemMetrics);
router.put('/:systemId/metrics', systemController.updateSystemMetrics);

export const systemRoutes = router;