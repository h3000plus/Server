import express from 'express';
import { createCustomer } from '../controllers/consumer.controller.js';
const router = express.Router();
router.post('/consumers', createCustomer);
export default router;
//# sourceMappingURL=consumer.router.js.map