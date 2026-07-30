import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { initializeCategories } from "./services/categoryService";
import { resetProducts } from "./services/productService";

// Initialize Local Storage
initializeCategories();
resetProducts();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);