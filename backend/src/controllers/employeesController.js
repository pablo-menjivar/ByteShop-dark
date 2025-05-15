import Employee from "../models/Employees.js";

const employeeController = {};

// READ: Obtener todos los empleados
employeeController.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

// READ: Obtener un empleado específico por ID
employeeController.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

// UPDATE: Actualizar un empleado existente por ID
employeeController.updateEmployees = async (req, res) => {
  try {
    const { name, lastName, email, telephone, address, birthdate, hireDate, isssNumber } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        email,
        telephone,
        address,
        birthdate,
        hireDate,
        isssNumber,
      },
      { new: true } 
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

// DELETE: Eliminar un empleado por ID
employeeController.deleteEmployees = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

export default employeeController;
