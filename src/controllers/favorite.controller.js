import Product from "../models/Product.js";
import Favorite from "../models/Favorite.js";

export const addToFavorites = async (req, res) => {
  try {
    const { product: productId } = req.body;
    const userId = req.user.id || req.user._id || req.user.userId;

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
        products: [
          {
            product: productId,
          },
        ],
      });

      await favorites.save();

      return res.status(201).json({
        message: "Product added to favorites",
      });
    }

    const favoriteExist = favorites.products.some(
      (p) => p.product.toString() === productId,
    );
    if (favoriteExist) {
      return res
        .status(400)
        .json({ error: "The product is already listed in favorites" });
    }

    favorites.products.push({
      product: productId,
    });

    await favorites.save();

    res.status(201).json({
      message: "Product added to favorites",
      favorites,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const favorites = await Favorite.findOne({ user: userId }).populate(
      "products.product",
    );
    if (!favorites) {
      const newFavorites = new Favorite({
        User: userId,
        products: [],
      });
      return res.json({
        User: newFavorites.User,
        products: newFavorites.products,
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
    const userId = req.user.id || req.user._id || req.user.userId;

    const favorites = await Favorite.findOne({ User: userId });

    if (!favorites) {
      return res.status(404).json({ error: "Favorites not found" });
    }

    const filtered = favorites.products.filter(
      (p) => p.product.toString() !== productId
    );

    if (filtered.length === favorites.products.length) {
      return res.status(404).json({ error: "Product not found in favorites" });
    }

    favorites.products = filtered;
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
    const userId = req.user.id || req.user._id || req.user.userId;
    const favorite = await Favorite.findOne({
      User: req.user._id,
    });

    if (!favorite) {
      const newFavorite = new Favorite({
        User: req.user._id,
        products: [],
      });
      return res.json(newFavorite);
    }

    favorite.products = [];
    await favorite.save();

    res.json(favorite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};