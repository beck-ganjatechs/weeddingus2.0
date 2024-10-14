import React from 'react';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Leaf size={32} className="mr-2" />
          <h1 className="text-2xl font-bold">Cannabis Inventory System</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-green-200">Dashboard</a></li>
            <li><a href="#" className="hover:text-green-200">Inventory</a></li>
            <li><a href="#" className="hover:text-green-200">Reports</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;