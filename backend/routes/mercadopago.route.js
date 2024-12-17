import express from 'express';
import {
  createOrder,
  success,
  failure,
  pending,
  webhook,
} from '../controllers/payment.controller.js';

const router = express.Router();

// Payment endpoints
router.post('/create', createOrder);
router.get('/success', success);
router.get('/failure', failure);
router.get('/pending', pending);
router.post('/webhook', webhook);

export default router;
