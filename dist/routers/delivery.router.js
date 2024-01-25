import express from 'express';
const router = express.Router();
router.get('/delivery/featured-my-marketplace');
router.get('/delivery/recently-viewed');
router.get('/delivery/allstores');
router.get('/delivery/categories');
router.get('/delivery/stores/:category-id');
router.get('/delivery/search');
export default router;
//# sourceMappingURL=delivery.router.js.map