import React, { useEffect, useState } from "react";
import CardDashboard from "../components/CardDashboard";

const Dashboard = () => {
  const [data, setData] = useState({
    employees: 0,
    brands: 0,
    models: 0,
    categories: 0,
    products: 0,
  });

  const fetchData = async () => {
    try {
      const employeesResponse = await fetch(
        "http://localhost:4000/api/employees"
      );
      const brandsResponse = await fetch("http://localhost:4000/api/brands");
      const modelsResponse = await fetch("http://localhost:4000/api/models");
      const categoriesResponse = await fetch(
        "http://localhost:4000/api/categories"
      );

      const employeesData = await employeesResponse.json();
      const brandsData = await brandsResponse.json();
      const modelsData = await modelsResponse.json();
      const categoriesData = await categoriesResponse.json();

      setData({
        employees: employeesData.length,
        brands: brandsData.length,
        models: modelsData.length,
        categories: categoriesData.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardDashboard label="Empleados" data={data.employees} />
          <CardDashboard label="Marcas" data={data.brands} />
          <CardDashboard label="Modelos" data={data.models} />
          <CardDashboard label="Categorias" data={data.categories} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
