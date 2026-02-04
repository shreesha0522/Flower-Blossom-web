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

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.discountedPrice || item.price) * (item.quantity || 1),
    0
  );
  const delivery = 500;
  const total = subtotal + delivery;

  const handlePayment = () => {
    if (!name || !phone || !location) {
      alert("Please fill all shipping details!");
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      // Clear cart on successful payment
      clearCart();

      // Redirect to dashboard after 2s
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 2000); // simulate 2s payment processing
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      {/* Total Summary */}
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
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
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
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="esewa"
              checked={paymentMethod === "esewa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-pink-500"
            />
            eSewa
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="khalti"
              checked={paymentMethod === "khalti"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-pink-500"
            />
            Khalti
          </label>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={processing || success}
          className={`w-full py-3 px-4 mt-4 rounded-full text-white font-semibold ${
            processing || success ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
          } transition`}
        >
          {processing
            ? "Processing..."
            : success
            ? "Payment Successful!"
            : "Pay & Place Order"}
        </button>

        {success && (
          <p className="mt-3 text-green-600 font-semibold text-center">
            Payment Successful! Redirecting to Dashboard...
          </p>
        )}
      </div>
    </div>
  );
}
