import React from 'react';
import { Leaf, Droplet } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  type: string;
  thc: number;
  cbd: number;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const categoryColor = {
    Indica: 'bg-purple-500',
    Sativa: 'bg-yellow-500',
    Hybrid: 'bg-green-500',
  }[product.category] || 'bg-gray-500';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
          <span className={`${categoryColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{product.type}</p>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Leaf size={16} className="text-green-500 mr-1" />
            <span className="text-sm font-semibold">THC: {product.thc}%</span>
          </div>
          <div className="flex items-center">
            <Leaf size={16} className="text-green-500 mr-1" />
            <span className="text-sm font-semibold">CBD: {product.cbd}%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}/g</span>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded">
            <Droplet size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;