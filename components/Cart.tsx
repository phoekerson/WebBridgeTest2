'use client';

import { useEffect, useState } from 'react';
import { CartItem } from '../types';

interface Props {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

const COUPON_CODE = 'WEB3BRIDGECOHORTx';

export default function Cart({ cart, setCart }: Props) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }
    setCart(
      cart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
    setError('');
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    const regex = /^[A-Za-z0-9]{5,}$/;
    if (coupon === COUPON_CODE && regex.test(coupon)) {
      setDiscount(0.1);
      setError('');
    } else {
      setError('Invalid coupon code');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - subtotal * discount;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-2 mt-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-2">
              <span>{item.name} (${item.price})</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-16 border mx-2"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="border p-1 mr-2"
            />
            <button onClick={applyCoupon} className="bg-green-500 text-white px-2 py-1">
              Apply Coupon
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="mt-2 font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
          <p className="font-bold text-xl">Total: ${total.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
