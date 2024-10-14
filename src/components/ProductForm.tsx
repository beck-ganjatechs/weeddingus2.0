import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createProduct } from '../services/api';

interface ProductFormProps {
  onClose: () => void;
  onProductAdded: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    strain: '',
    type: '',
    thc: '',
    cbd: '',
    price: '',
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({ ...prevData, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      await createProduct(formDataToSend);
      onProductAdded();
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="strain" className="block text-gray-700 font-bold mb-2">Strain Name</label>
            <input
              type="text"
              id="strain"
              name="strain"
              value={formData.strain}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Product Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Type</option>
              <option value="Full bud">Full bud</option>
              <option value="Popcorn">Popcorn</option>
              <option value="Preroll">Preroll</option>
              <option value="Trim">Trim</option>
              <option value="Concentrates">Concentrates</option>
            </select>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label htmlFor="thc" className="block text-gray-700 font-bold mb-2">THC %</label>
              <input
                type="number"
                id="thc"
                name="thc"
                value={formData.thc}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cbd" className="block text-gray-700 font-bold mb-2">CBD %</label>
              <input
                type="number"
                id="cbd"
                name="cbd"
                value={formData.cbd}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price per gram ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              accept="image/*"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;