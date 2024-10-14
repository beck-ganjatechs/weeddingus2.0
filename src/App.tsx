import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Header from './components/Header';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Cannabis Product Inventory</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
          >
            <Plus size={24} className="mr-2" />
            Add Product
          </button>
        </div>
        {showForm ? (
          <ProductForm onClose={() => setShowForm(false)} onProductAdded={handleProductAdded} />
        ) : (
          <ProductList key={refreshTrigger} />
        )}
      </main>
    </div>
  );
}

export default App;