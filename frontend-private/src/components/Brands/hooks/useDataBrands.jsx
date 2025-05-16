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
            const newBrand = { name }
            console.log(newBrand, "- datos de la marca")
        
            const response = await fetch(ApiBrands, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newBrand),
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
            alert("Error", "Ocurrió un error al crear la marca")
                toast.error('Ocurrió un error al crear la marca')
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
                const response = await fetch(`${ApiBrands}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                })
                // Quitar body: JSON.stringify(deleteBrand)
            // Ya que esta request no necesita un .json body
                if (!response.ok) {
                throw new Error("Hubo un error al eliminar la marca");
                }
                toast.success('Marca eliminada');
                // Actualizar el estado inmediatamente ya que el fetchData no funciona de momento
                setBrands(prevBrands => prevBrands.filter(brand => brand._id !== id));
            } catch (error) {
                console.error("Error al eliminar marca:", error);
                toast.error('Error al eliminar la marca');
                fetchData() // Revert UI if API fails
            }
        };
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
            alert("Error al actualizar la marca")
            console.error("Error: ", errorMarcas)
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