import express from 'express';

import { signup, login, logout, checkAuth } from '../controllers/auth.controller.js';
import { updateProfile } from '../controllers/auth.controller.js';
import protectRoute from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/checkAuth', protectRoute, checkAuth);

export default router;