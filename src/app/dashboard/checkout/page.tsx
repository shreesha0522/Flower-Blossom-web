"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  // Shipping Info State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("Morning");

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * (item.quantity || 1),
    0
  );
  const delivery = 500;
  const total = subtotal + delivery;

  const handlePayment = async () => {
    if (!name || !phone || !location) {
      alert("Please fill all shipping details!");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate order number
      const newOrderNumber = `ORD-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 10000)
      ).padStart(4, "0")}`;

      const order = {
        _id: Date.now().toString(),
        orderNumber: newOrderNumber,
        date: new Date().toISOString().split("T")[0],
        total,
        status: "pending",
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.discountedPrice || item.price,
          image: item.image,
        })),
        deliveryAddress: location,
        deliveryTime,
        customerName: name,
        customerPhone: phone,
        paymentMethod,
      };

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([order, ...existingOrders]));

      setOrderNumber(newOrderNumber);
      setSuccess(true);

      // Clear cart
      clearCart();

      // Redirect to orders page after 3s
      setTimeout(() => {
        router.push("/dashboard/orders");
      }, 3000);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl p-12 text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some flowers before checking out!</p>
          <button
            onClick={() => router.push("/dashboard/catalog")}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold"
          >
            Browse Flowers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white rounded-xl p-6 mb-6 border border-pink-100 max-w-2xl mx-auto space-y-2">
        <h2 className="text-xl font-bold mb-2">Order Summary</h2>
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>Rs {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span>Rs {delivery.toLocaleString()}</span>
        </div>
        <hr className="border-pink-100 my-2" />
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span className="text-pink-500">Rs {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-white rounded-xl p-6 mb-6 border border-pink-100 max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <div className="flex gap-2">
            <div className="w-24">
              <input
                type="text"
                value="+977"
                readOnly
                className="w-full px-4 py-2 border border-pink-200 rounded-lg bg-gray-100 text-gray-700 font-semibold"
              />
            </div>
            <input
              type="tel"
              placeholder="98XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
              className="flex-1 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <input
            type="text"
            placeholder="Location / Address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <select
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="Morning">Morning (8AM - 12PM)</option>
            <option value="Afternoon">Afternoon (12PM - 4PM)</option>
            <option value="Evening">Evening (4PM - 8PM)</option>
          </select>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-xl p-6 border border-pink-100 max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 p-4 border border-pink-200 rounded-lg cursor-pointer hover:bg-pink-50 transition">
            <input
              type="radio"
              name="payment"
              value="esewa"
              checked={paymentMethod === "esewa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-pink-500 w-5 h-5"
            />
            <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              <span className="font-semibold">eSewa</span>
            </div>
          </label>
          <label className="flex items-center gap-3 p-4 border border-pink-200 rounded-lg cursor-pointer hover:bg-pink-50 transition">
            <input
              type="radio"
              name="payment"
              value="khalti"
              checked={paymentMethod === "khalti"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-pink-500 w-5 h-5"
            />
            <div className="flex items-center gap-2">
              <span className="text-lg">💰</span>
              <span className="font-semibold">Khalti</span>
            </div>
          </label>
        </div>

        <button
          onClick={handlePayment}
          disabled={processing || success}
          className={`w-full py-3 px-4 mt-4 rounded-full text-white font-semibold ${
            processing || success ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
          } transition`}
        >
          {processing
            ? "Processing Payment..."
            : success
            ? "✓ Payment Successful!"
            : `Pay Rs ${total.toLocaleString()} & Place Order`}
        </button>

        {success && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-semibold text-center mb-2">
              🎉 Payment Successful!
            </p>
            <p className="text-green-600 text-sm text-center">
              Order Number: <span className="font-bold">{orderNumber}</span>
            </p>
            <p className="text-green-600 text-sm text-center mt-1">
              Redirecting to your orders...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
