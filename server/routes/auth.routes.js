import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validateRegistration, validateLogin } from '../validators/auth.js';

const router = Router();

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);

export const authRoutes = router;