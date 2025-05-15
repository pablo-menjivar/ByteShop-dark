import React, { useState, useEffect } from "react";
import RegisterModels from "../components/Models/RegisterModels";
import ListModels from "../components/Models/ListModels";
import toast, { Toaster } from "react-hot-toast";

const Models = () => {
  //estado para manejar el tab activo
  const [activeTab, setActiveTab] = useState("list");
  //estado para almacenar la información de los modelos que devuelve el api
  const [models, setModels] = useState([]);
  //estado para manejar loading
  const [loading, setLoading] = useState(false);
  //estado para manejar el nombre del modelo y id al editar un modelo
  const [modelName, setModelName] = useState("");
  const [id, setId] = useState("");

  //funcion para consultar los modelos
  const fetchModels = async () => {
    const response = await fetch("http://localhost:4000/api/models");

    if (!response.ok) {
      throw new Error("Hubo un error al obtener las marcas");
    }

    const data = await response.json();
    setModels(data);
    setLoading(false);
  };

  // funcion para guardar un nuevo modelo
  const saveModels = async (e) => {
    e.preventDefault();

    const newModel = {
      name: modelName,
    };

    const response = await fetch("http://localhost:4000/api/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newModel),
    });

    if (!response.ok) {
      throw new Error("Hubo un error al registrar el empleado");
    }

    //const data = await response.json();

    toast.success("Modelo registrado exitosamente");
    fetchModels();
    setModelName("");
  };

  // useEffect para cargar los modelos al cargar la página
  useEffect(() => {
    fetchModels();
  }, []);

  //funcion para eliminar un modelo
  const deleteModel = async (id) => {
    const response = await fetch(`http://localhost:4000/api/models/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Hubo un error al eliminar el modelo");
    }

    // const data = await response.json();

    toast.success("Modelo Eliminado");
    fetchModels();
  };

  //funcion para tomar la información de un modelo al editar
  const updateModels = async (model) => {
    setId(model._id);
    setModelName(model.name);
    setActiveTab("form");
  };

  //funcion para editar un modelo
  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedModel = {
      name: modelName,
    };
    const response = await fetch(`http://localhost:4000/api/models/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedModel),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la modelo");
    }
    toast.success("Modelo actualizado");
    setModelName("");
    setId(""); // Limpiar el ID
    setActiveTab("list");
    fetchModels();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Modelos</h1>
          <div>
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                onClick={() => setActiveTab("list")}
              >
                Lista de Modelos
              </button>
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                onClick={() => setActiveTab("form")}
              >
                Gestionar Modelo
              </button>
            </div>
            <div>
              {activeTab === "list" && (
                <div>
                  <ListModels
                    models={models}
                    loading={loading}
                    deleteModel={deleteModel}
                    updateModels={updateModels}
                  />
                </div>
              )}
              {activeTab === "form" && (
                <div>
                  <RegisterModels
                    saveModels={saveModels}
                    setModelName={setModelName}
                    modelName={modelName}
                    handleEdit={handleEdit}
                    id={id}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <Toaster
          toastOptions={{
            duration: 1000,
          }}
        />
      </div>
    </>
  );
};

export default Models;
