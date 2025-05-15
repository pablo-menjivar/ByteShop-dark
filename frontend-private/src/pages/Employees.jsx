import React, { useState, useEffect } from "react";
import RegisterEmployees from "../components/Employees/RegisterEmployees.jsx";
import ListEmployees from "../components/Employees/ListEmployees.jsx";
import {Toaster} from 'react-hot-toast';

import useDataEmployees from "../components/Employees/hooks/useDataEmployees.jsx";

const Employees = () => {
  const {
    activeTab, setActiveTab,
    id, setId,
    name, setName,
    lastName, setLastName,
    email, setEmail,
    password, setPassword,
    telephone, setTelephone,
    dui, setDui,
    address, setAddress,
    birthdate, setBirthdate,
    hireDate, setHireDate,
    isssNumber, setIsssNumber,
    errorEmpleado, setError,
    success, setSuccess,
    loading, setLoading,
    employees, setEmployees,
    cleanData,
    handleSubmit,
    fetchData,
    deleteEmployee,
    updateEmployee,
    handleUpdate,
  } = useDataEmployees();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Empleados</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500" onClick={() => setActiveTab("list")}>
              Lista de empleados
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500" onClick={() => { setActiveTab("form"), cleanData() }}>
              Gestionar Empleados
            </button>
          </div>
          <div>
            {activeTab === "list" && (
              <div>
                <ListEmployees
                  setId={setId}
                  setActiveTab={setActiveTab}
                  updateEmployee={updateEmployee}
                  handleUpdate={handleUpdate}
                  deleteEmployee={deleteEmployee}
                  employees={employees}
                  loading={loading}
                />
              </div>
            )}
            {activeTab === "form" && (
              <div>
                <RegisterEmployees
                  id={id}
                  setId={setId}
                  name={name}
                  setName={setName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  telephone={telephone}
                  setTelephone={setTelephone}
                  dui={dui}
                  setDui={setDui}
                  address={address}
                  setAddress={setAddress}
                  birthdate={birthdate}
                  setBirthdate={setBirthdate}
                  hireDate={hireDate}
                  setHireDate={setHireDate}
                  isssNumber={isssNumber}
                  setIsssNumber={setIsssNumber}
                  errorEmpleado={errorEmpleado}
                  setError={setError}
                  success={success}
                  setSuccess={setSuccess}
                  loading={loading}
                  setLoading={setLoading}
                  employees={employees}
                  setEmployees={setEmployees}
                  cleanData={cleanData}
                  handleSubmit={handleSubmit}
                  handleUpdate={handleUpdate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
         <Toaster toastOptions={{ duration: 1000 }} />
    </div>
  )
}
export default Employees