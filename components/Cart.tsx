'use client';

import { useEffect, useState } from 'react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="mt-10 p-4 rounded-xl shadow-lg bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart</h2>
      <AnimatePresence>
        {cart.length === 0 ? (
          <motion.p 
            key="empty" 
            className="text-gray-500" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            Your cart is empty.
          </motion.p>
        ) : (
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-md border">
                <span>{item.name} (${item.price})</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 border mx-2 px-2 rounded"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="border p-2 rounded w-1/2"
              />
              <button onClick={applyCoupon} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Apply
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <p className="mt-2 font-medium">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="font-bold text-xl text-gray-800">Total: ${total.toFixed(2)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}