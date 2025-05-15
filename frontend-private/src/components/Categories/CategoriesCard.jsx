import React from "react";
import Button from "../Button";

const CategoryCard = ({ category, deleteCategory, updateCategories }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Categoría:{" "}
          <span className="text-xl font-medium text-gray-700">
            {category.name}{" "}
          </span>
        </h2>
        <p className="text-gray-500 font-bold">{category.description}</p>
        <Button 
        label={"Eliminar"}
        actionButton={() => deleteCategory(category._id)}
        colorClass={"danger"}
        />
                <Button 
        label={"Editar Información"}
        actionButton={() => updateCategories(category)}
        colorClass={"warning"}
        />
      </div>
    </div>
  );
};

export default CategoryCard;