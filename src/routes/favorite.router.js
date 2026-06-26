import { Router } from "express";

const router = Router();

import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} from "../controllers/favorite.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.get("/", authMiddleware, getFavorites);
router.post("/", authMiddleware, addToFavorites);
router.delete("/", authMiddleware, clearFavorites);
router.delete("/clear", authMiddleware, clearFavorites);
router.delete("/:productId", authMiddleware, removeFromFavorites);

export default router;
