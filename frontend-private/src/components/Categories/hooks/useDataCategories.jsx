import React, { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast'

const useDataCategories = () => {
    const ApiCategories="http://localhost:4000/api/categories"

    const [activeTab, setActiveTab] = useState("list")
      const [id, setId] = useState("")
      const [name, setName] = useState("")
      const [description, setDescription] = useState("")
      const [errorCategorias, setError] = useState(null)
      const [success, setSuccess] = useState(null)
      const [loading, setLoading] = useState(false)
      const [categories, setCategories] = useState([])

      const cleanData = () => {
        setName("")
        setDescription("")
        setId("")
      }
      // Función para guardar los datos de la categoría (POST/CREATE/INSERT)
      const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !description) {
          setError("Todos los campos son obligatorios")
            toast.error('Todos los campos son obligatorios')
          return
        }
        try {
          const newCategorie = { name, description }
          console.log(newCategorie, "- datos de la categoría")
    
          const response = await fetch(ApiCategories, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategorie),
          })
          if (!response.ok) {
            throw new Error("Hubo un error al agregar la categoría")
          }
          const data = await response.json()
            toast.success('Categoría guardada')
          setCategories(data)
          setSuccess("Categoría guardada correctamente")
          cleanData()
          fetchData()
        } catch (error) {
          setError(error.message) // Muestra el mensaje de error correspondiente
          console.error("Error:", error)
          alert("Error", "Ocurrió un error al registrar la categoría")
            toast.error('Ocurrió un error al registrar la categoría')
        } finally {
          setLoading(false)
        }
      }
      // Función para obtener los datos de las categorías (GET/READ/SELECT)
      const fetchData = async () => {
        try {
          const response = await fetch(ApiCategories)
          if (!response.ok) {
            throw new Error("La respuesta de la red no fue correcta")
          }
          const data = await response.json()
          console.log(data)
          setCategories(data)
        } catch (error) {
          console.error("Error al obtener los datos: ", error)
        } finally {
          setLoading(false)
        }
      }
      useEffect(() => {
        fetchData()
      }, [])
      // Función para eliminar una categoría (DELETE)
      const deleteCategorie = async (id) => {
        try {
          const response = await fetch( `${ApiCategories}/${id}`,
            {
              method: "DELETE", body: JSON.stringify(deleteCategorie)
            }
          )
          if (!response.ok) {
            throw new Error("Hubo un error al eliminar la categoría")
          }
          const result = await response.json()
          console.log("Deleted: ", result)
          toast.success('Categoría eliminada')
          // Actualizar la lista después de borrar
          setCategories(data.filter(categories => categories._id !== id));
          fetchData();
        } catch (error) {
          console.error("Error al eliminar categoría sfs :", error)
        }
      }
      // Función para actualizar una categoría (PUT/UPDATE)
      const updateCategorie = async (dataCategorie) => {
        setId(dataCategorie._id)
        setName(dataCategorie.name)
        setDescription(dataCategorie.description)
        setError(null)
        setSuccess(null)
        setActiveTab("form")
      }
      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const updatedCategorie = { name, description}
          const response = await fetch(
            `${ApiCategories}/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedCategorie),
            }
          )
          if (!response.ok) {
            throw new Error("Error al actualizar la categoría");
          }
          toast.success('Categoría actualizada')
          setSuccess("Categoría actualizada correctamente")
          cleanData()
          setId("") // Limpiar el ID
          setActiveTab("list")
          fetchData() // Volver a cargar la lista
        } catch (error) {
          setError(error.message)
          alert("Error al actualizar el empleado")
          console.error("Error: ", errorCategorias)
        } finally {
          setLoading(false)
        }
      }
    return {
        activeTab, setActiveTab, 
        id, setId,
        name, setName,
        description, setDescription,
        errorCategorias, setError,
        success, setSuccess,
        loading, setLoading,
        categories, setCategories,
        cleanData,
        handleSubmit,
        fetchData,
        deleteCategorie,
        updateCategorie,
        handleUpdate
    }
  }
export default useDataCategories