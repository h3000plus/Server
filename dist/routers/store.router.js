import express from 'express';
const router = express.Router();
router.get('/:store-id/details');
router.get('/:store-id/featured-items');
router.get('/:store-id/categories');
router.get('/:store-id/item-details/:item-id');
export default router;
//# sourceMappingURL=store.router.js.map