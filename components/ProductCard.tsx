'use client';

import { Product } from '../types';
import { motion } from 'framer-motion';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }} 
      className="border p-4 rounded-xl shadow-md bg-white transition-all duration-300"
    >
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-600 font-medium mb-2">${product.price}</p>
      <button
        onClick={() => onAdd(product)}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-2 rounded-md text-sm"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}