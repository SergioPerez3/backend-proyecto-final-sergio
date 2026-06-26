import Product from "../models/Product.js";
import Favorite from "../models/Favorite.js";

export const addToFavorites = async (req, res) => {
  try {
    const { product: productId } = req.body;
    const userId = req.user.userId;

    if (!productId) {
      return res.status(422).json({ error: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let favorites = await Favorite.findOne({ User: userId });

    if (!favorites) {
      favorites = new Favorite({
        User: userId,
        products: [{ product: productId }],
      });

      await favorites.save();
    } else {
      const exists = favorites.products.some(
        (p) => p.product.toString() === productId,
      );

      if (exists) {
        return res
          .status(400)
          .json({ error: "The product is already listed in favorites" });
      }

      favorites.products.push({ product: productId });
      await favorites.save();
    }

    const populated = await Favorite.findOne({ User: userId }).populate(
      "products.product",
    );

    res.status(201).json({
      message: "Product added to favorites",
      favorites: populated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await Favorite.findOne({ User: userId }).populate(
      "products.product",
    );

    if (!favorites) {
      return res.json({
        User: userId,
        products: [],
      });
    }

    return res.json({
      User: favorites.User,
      products: favorites.products,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const favorites = await Favorite.findOne({ User: userId });

    if (!favorites) {
      return res.status(404).json({ error: "Favorites not found" });
    }

    favorites.products = favorites.products.filter(
      (p) => p.product.toString() !== productId,
    );

    await favorites.save();

    res.json({
      message: "Product removed from favorites",
      favorites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const clearFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await Favorite.findOne({ User: userId });

    if (!favorites) {
      return res.status(404).json({ message: "No favorites found" });
    }

    favorites.products = [];
    await favorites.save();

    res.json({ message: "Favorites cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error clearing favorites" });
  }
};
