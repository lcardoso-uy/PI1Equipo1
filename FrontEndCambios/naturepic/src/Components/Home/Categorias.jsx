import React from 'react';
import { Link } from 'react-router-dom';

const Categorias = ({ categories }) => {
  return (
    <nav className="categories">
      {categories.map(category => (
        <Link key={category.id} to={"/categoria/" + category.id}>{category.name}</Link>
      ))}
    </nav>
  );
};

export default Categorias;