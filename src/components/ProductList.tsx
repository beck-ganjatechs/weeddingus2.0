import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getProducts, getInventory } from '../services/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts();
      const inventoryData = await getInventory();
      
      const inventoryMap = inventoryData.reduce((acc, item) => {
        acc[item.product] = item.quantity;
        return acc;
      }, {});

      setProducts(productsData);
      setInventory(inventoryMap);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={{
            id: product.id,
            name: product.strain,
            type: product.type,
            thc: product.thc,
            cbd: product.cbd,
            price: product.price,
            image: product.image ? `${import.meta.env.VITE_POKETBASE_URL}files/${product.collectionId}/${product.id}/${product.image}` : 'https://via.placeholder.com/150',
            category: product.type === 'Concentrates' ? 'Concentrates' : 'Flower',
            quantity: inventory[product.id] || 0
          }} 
        />
      ))}
    </div>
  );
};

export default ProductList;