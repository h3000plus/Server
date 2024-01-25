import express from 'express';
const router = express.Router();
router.get('/pickup/allstores');
router.get('/pickup/categories');
router.get('/pickup/stores/:category-id');
router.get('/pickup/search');
export default router;
//# sourceMappingURL=pickup.router.js.map