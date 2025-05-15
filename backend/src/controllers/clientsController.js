import clientsModel from "../models/Client.js";

const clientsController = {};

// OBTENER TODOS LOS CLIENTES
clientsController.getClients = async (req, res) => {
  try {
    const clients = await clientsModel.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// OBTENER UN CLIENTE POR ID
clientsController.getClient = async (req, res) => {
  try {
    const client = await clientsModel.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};



// ACTUALIZAR UN CLIENTE
clientsController.updateClients = async (req, res) => {
  const { name, lastName, email, password, telephone, dui } = req.body;

  // Validación de campos requeridos
  if (!name || !lastName || !email || !password || !telephone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedClient = await clientsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        email,
        password,
        telephone,
        dui: dui || null, // Si no se envía DUI, se establece como null
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Cliente updated"});
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// ELIMINAR UN CLIENTE
clientsController.deleteClients = async (req, res) => {
  try {
    const deletedClient = await clientsModel.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json({ message: "Client deleted"});
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};

export default clientsController;
