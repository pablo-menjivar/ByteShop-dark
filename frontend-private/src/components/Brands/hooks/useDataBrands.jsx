import React, { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast'

const useDataBrands = () => {
    const ApiBrands="http://localhost:4000/api/brands"

    const [activeTab, setActiveTab] = useState("list")
        const [id, setId] = useState("")
        const [name, setName] = useState("")
        const [errorMarcas, setError] = useState(null)
        const [success, setSuccess] = useState(null)
        const [loading, setLoading] = useState(false)
        const [brands, setBrands] = useState([])

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
            const newCategorie = { name }
            console.log(newCategorie, "- datos de la marca")
        
            const response = await fetch(ApiBrands, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newCategorie),
            })
            if (!response.ok) {
                throw new Error("Hubo un error al agregar la marca")
            }
            const data = await response.json()
                toast.success('Marca guardada')
            setBrands(data)
            setSuccess("Marca guardada correctamente")
            cleanData()
            fetchData()
            } catch (error) {
            setError(error.message) // Muestra el mensaje de error correspondiente
            console.error("Error:", error)
            alert("Error", "Ocurrió un error al registrar la marca")
                toast.error('Ocurrió un error al registrar la marca')
            } finally {
            setLoading(false)
            }
        }
        // Función para obtener los datos de las marcas (GET/READ/SELECT)
        const fetchData = async () => {
            try {
            const response = await fetch(ApiEmployees)
            if (!response.ok) {
                throw new Error("La respuesta de la red no fue correcta")
            }
            const data = await response.json()
            console.log(data)
            setBrands(data)
            } catch (error) {
            console.error("Error al obtener los datos: ", error)
            } finally {
            setLoading(false)
            }
        }
        useEffect(() => {
            fetchData()
        }, [])
        // Función para eliminar una marca (DELETE)
        const deleteBrand = async (id) => {
            try {
            const response = await fetch( `${ApiBrands}/${id}`,
                {
                method: "DELETE", body: JSON.stringify(deleteBrand)
                }
            )
            if (!response.ok) {
                throw new Error("Hubo un error al eliminar la marca")
            }
            const result = await response.json()
            console.log("Deleted:", result)
            toast.success('Marca eliminada')
            // Actualizar la lista después de borrar
            setBrands(data.filter(marcas => marcas._id !== id));
            fetchData();
            } catch (error) {
            console.error("Error al eliminar marca sfs :", error)
            }
        }
        // Función para actualizar una marca (PUT/UPDATE)
        const updateBrand = async (dataBrand) => {
            setId(dataBrand._id)
            setName(dataBrand.name)
            setError(null)
            setSuccess(null)
            setActiveTab("form")
        }
        const handleUpdate = async (e) => {
            e.preventDefault();
            try {
            const updatedBrand = { name }
            const response = await fetch(
                `${ApiBrands}/${id}`,
                {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBrand),
                }
            )
            if (!response.ok) {
                throw new Error("Error al actualizar la marca");
            }
            toast.success('Marca actualizada')
            setSuccess("Marca actualizada correctamente")
            cleanData()
            setId("") // Limpiar el ID
            setActiveTab("list")
            fetchData() // Volver a cargar la lista
            } catch (error) {
            setError(error.message)
            alert("Error al actualizar el empleado")
            console.error("Error:", errorEmpleado)
            } finally {
            setLoading(false)
            }
        }
    return {
        activeTab, setActiveTab, 
        id, setId,
        name, setName,
        errorMarcas, setError,
        success, setSuccess,
        loading, setLoading,
        brands, setBrands,
        cleanData,
        handleSubmit,
        fetchData,
        deleteBrand,
        updateBrand,
        handleUpdate
    }
}
export default useDataBrands