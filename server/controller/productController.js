import productSchema from "../scheme/productSchema.js";
import asyncHandler from "../middleware/asyncHandler.js";
const GetProduct = asyncHandler(async (req, res) => {
  const products = await productSchema.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const productS = await productSchema.findById(req.params.id);

  if (productS) {
    return res.json(productS);
  }
  res.status(404);
  throw new Error("resource not found");
});

const createProduct = asyncHandler(async (req, res) => {
  console.log(req.user);
  const newProduct = new productSchema({
    name: "SampleProduct",
    price: 450,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sampleBrand",
    category: "sample",
    countInStock: 5,
    numreviews: 7,
    description: "its a sample product",
  });
  const productCreated = newProduct.save();
  res.status(200).json(productCreated);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } =
    req.body;

  console.log(image);

  if (!req.params.id && !image) {
    res.status(400);
    throw new Error("Product ID is required.");
  }

  const product = await productSchema.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedproduct = await product.save();
    res.status(200).json(updatedproduct);
  } else {
    res.status(400);
    throw new Error("product not Found ");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productSchema.findById(req.params.id);
  if (product) {
    await productSchema.deleteOne({ _id: product._id });
  } else {
    res.status(400);
    throw new Error("Resource not Found ");
  }
});

export {
  GetProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
