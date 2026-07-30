import defaultProducts from "../data/defaultProducts";

const STORAGE_KEY = "products";

// Initialize products in Local Storage
export const initializeProducts = () => {
  const storedProducts = localStorage.getItem(STORAGE_KEY);

  if (!storedProducts) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultProducts)
    );
  }
};

// Force reload default products (useful during development)
export const resetProducts = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultProducts)
  );
};

// Get all products
export const getProducts = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Get product by ID
export const getProductById = (id) => {
  return getProducts().find(
    (product) => product.id === Number(id)
  );
};

// Get products by category
export const getProductsByCategory = (category) => {
  return getProducts().filter(
    (product) =>
      product.category.toLowerCase() ===
      category.toLowerCase()
  );
};

// Search products
export const searchProducts = (keyword) => {
  return getProducts().filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(keyword.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(keyword.toLowerCase())
  );
};

// Save products
export const saveProducts = (products) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );
};

// Add product
export const addProduct = (product) => {
  const products = getProducts();

  products.push({
    id: Date.now(),
    ...product,
  });

  saveProducts(products);
};

// Delete product
export const deleteProduct = (id) => {
  const products = getProducts().filter(
    (product) => product.id !== id
  );

  saveProducts(products);
};

// Update product
export const updateProduct = (updatedProduct) => {
  const products = getProducts().map((product) =>
    product.id === updatedProduct.id
      ? updatedProduct
      : product
  );

  saveProducts(products);
};