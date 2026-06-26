import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsCategories,
  getProductsFeatured,
} from "../controllers/product.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createProduct);
router.get("/categories", getProductsCategories);
router.get("/featured", getProductsFeatured);

router.get("/", getProducts);
router.get("/:id", getProductById);

router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
