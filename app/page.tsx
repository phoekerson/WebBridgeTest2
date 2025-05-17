'use client';

import { useEffect, useState } from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">🛒 Shop Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>

      <Cart cart={cart} setCart={setCart} />
    </main>
  );
}