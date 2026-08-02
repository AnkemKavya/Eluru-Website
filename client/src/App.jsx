import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Payment from "./pages/Payment/Payment";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Orders from './pages/Orders/Orders';
import Profile from './pages/Profile';
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";

function App() {
  return (
    <div className="app-shell">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <BottomNavbar />
      </main>
    </div>
  );
}

export default App;
