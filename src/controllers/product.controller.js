import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, image, featured = false } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(422).json({ message: "All fields are required" });
    }
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { sortBy = "name", order = "asc", search = "", category } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const filters = {
      $and: [
        {
          $or: [
            {
              name: {
                $regex: search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        },
        category ? { category } : {},
      ],
    };

    const products = await Product.find(filters)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filters);

    res.json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const getProductsCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category")
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorias" });
  }
};

export const getProductsFeatured = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true })
    .select(
      "-description -__v",
    );

    res.json({
      products: featuredProducts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los productos destacados" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof req.body.name != "string") {
      return res
        .status(422)
        .json({ message: "El nombre tiene que ser un string" });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({ message: error.message });
    }

    if (error.name === "CastError") {
      return res.status(404).json({ message: error.message });
    }

    res
      .status(500)
      .json({ message: "Error interno del servidor al actualizar producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto borrado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor borrar el producto" });
  }
};
