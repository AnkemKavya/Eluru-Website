import defaultCategories from "../data/categories";

const STORAGE_KEY = "categories";

export const initializeCategories = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultCategories)
    );
  }
};

export const getCategories = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || [];
};

export const saveCategories = (categories) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(categories)
  );
};

export const addCategory = (category) => {
  const categories = getCategories();

  categories.push({
    id: Date.now(),
    ...category,
  });

  saveCategories(categories);
};