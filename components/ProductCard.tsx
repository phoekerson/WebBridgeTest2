'use client';

import { Product } from '../types';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="border p-2">
      <img src={product.image} alt={product.name} className="w-full h-24 object-cover" />
      <h2 className="text-lg">{product.name}</h2>
      <p>${product.price}</p>
      <button
        onClick={() => onAdd(product)}
        className="bg-blue-500 text-white px-2 py-1 mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}
