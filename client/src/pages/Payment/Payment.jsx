import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

import PaymentMethod from "../../components/Payment/PaymentMethod";
import OrderSummary from "../../components/Payment/OrderSummary";
import PlaceOrderBar from "../../components/Payment/PlaceOrderBar";

import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [upiPaid, setUpiPaid] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart]);

  const deliveryCharge = itemTotal >= 499 ? 0 : 20;

  const grandTotal = itemTotal + deliveryCharge;

  const handlePlaceOrder = () => {
    if (paymentMethod === "upi" && !upiPaid) {
      alert("Please complete the UPI payment.");
      return;
    }

    const address = JSON.parse(
      localStorage.getItem("deliveryAddress")
    );

    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: grandTotal,
      paymentMethod,
      address,
      status: "Order Placed",
      date: new Date().toLocaleString(),
    };

    orders.unshift(newOrder);

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    localStorage.removeItem("cart");

    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/order-success", {
      state: {
        order: newOrder
      },
  });
  };

  return (
    <div className="payment-page">

      {/* Header */}

      <header className="payment-header">

        <button onClick={() => navigate(-1)}>
          <HiOutlineArrowLeft />
        </button>

        <div className="payment-title">
          <h2>Checkout</h2>
          <p>Step 2 of 2</p>
        </div>

      </header>

      {/* Content */}

      <div className="payment-content">

        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          upiPaid={upiPaid}
          setUpiPaid={setUpiPaid}
          total={grandTotal}
        />

        <OrderSummary
          itemCount={cart.length}
          itemTotal={itemTotal}
          deliveryCharge={deliveryCharge}
          grandTotal={grandTotal}
        />

      </div>

      {/* Bottom Bar */}

      <PlaceOrderBar
        total={grandTotal}
        onBack={() => navigate(-1)}
        onPlaceOrder={handlePlaceOrder}
        disabled={
          paymentMethod === "upi" && !upiPaid
        }
      />

    </div>
  );
}