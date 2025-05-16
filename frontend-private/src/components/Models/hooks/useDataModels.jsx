import React, { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast'

const useDataModels = () => {
    const ApiModels="http://localhost:4000/api/brands"

    const [activeTab, setActiveTab] = useState("list")
        const [id, setId] = useState("")
        const [name, setName] = useState("")
        const [errorModelos, setError] = useState(null)
        const [success, setSuccess] = useState(null)
        const [loading, setLoading] = useState(false)
        const [models, setModels] = useState([])

        const cleanData = () => {
            setName("")
            setId("")
        }
        // Función para guardar los datos de la marca (POST/CREATE/INSERT)
        const handleSubmit = async (e) => {
            e.preventDefault()
            if (!name ) {
            setError("El nombre es obligatorio")
                toast.error('El nombre es obligatorio')
            return
            }
            try {
            const newModel = { name }
            console.log(newModel, "- datos del modelo")
        
            const response = await fetch(ApiModels, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newModel),
            })
            if (!response.ok) {
                throw new Error("Hubo un error al agregar la modelo")
            }
            const data = await response.json()
                toast.success('Modelo guardado')
            setModels(data)
            setSuccess("Modelo guardado correctamente")
            cleanData()
            fetchData()
            } catch (error) {
            setError(error.message) // Muestra el mensaje de error correspondiente
            console.error("Error:", error)
            alert("Error", "Ocurrió un error al crear el modelo")
                toast.error('Ocurrió un error al crear el modelo')
            } finally {
            setLoading(false)
            }
        }
        // Función para obtener los datos de los modelos (GET/READ/SELECT)
        const fetchData = async () => {
            try {
            const response = await fetch(ApiEmployees)
            if (!response.ok) {
                throw new Error("La respuesta de la red no fue correcta")
            }
            const data = await response.json()
            console.log(data)
            setModels(data)
            } catch (error) {
            console.error("Error al obtener los datos: ", error)
            } finally {
            setLoading(false)
            }
        }
        useEffect(() => {
            fetchData()
        }, [])
        // Función para eliminar un modelo (DELETE)
        const deleteBrand = async (id) => {
            try {
            const response = await fetch( `${ApiBrands}/${id}`,
                {
                method: "DELETE", body: JSON.stringify(deleteBrand)
                }
            )
            if (!response.ok) {
                throw new Error("Hubo un error al eliminar el modelo")
            }
            const result = await response.json()
            console.log("Deleted: ", result)
            toast.success('Modelo eliminado')
            // Actualizar la lista después de borrar
            setModels(data.filter(modelos => modelos._id !== id));
            fetchData();
            } catch (error) {
            console.error("Error al eliminar modelo sfs :", error)
            }
        }
        // Función para actualizar un modelo (PUT/UPDATE)
        const updateModel = async (dataModel) => {
            setId(dataModel._id)
            setName(dataModel.name)
            setError(null)
            setSuccess(null)
            setActiveTab("form")
        }
        const handleUpdate = async (e) => {
            e.preventDefault();
            try {
            const updatedModel = { name }
            const response = await fetch(
                `${ApiModels}/${id}`,
                {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedModel),
                }
            )
            if (!response.ok) {
                throw new Error("Error al actualizar el modelo");
            }
            toast.success('Modelo actualizado')
            setSuccess("Modelo actualizado correctamente")
            cleanData()
            setId("") // Limpiar el ID
            setActiveTab("list")
            fetchData() // Volver a cargar la lista
            } catch (error) {
            setError(error.message)
            alert("Error al actualizar el modelo")
            console.error("Error: ", errorModelos)
            } finally {
            setLoading(false)
            }
        }
    return {
        activeTab, setActiveTab, 
        id, setId,
        name, setName,
        errorModelos, setError,
        success, setSuccess,
        loading, setLoading,
        models, setModels,
        cleanData,
        handleSubmit,
        fetchData,
        deleteModel,
        updateModel,
        handleUpdate
    }
}
export default useDataModels