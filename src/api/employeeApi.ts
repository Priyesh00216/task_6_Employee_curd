import type { Employee, EmployeeFormData } from "../type/employee";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}/api/Employee`;

// GET ALL
export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return await response.json();
};

// GET BY ID
export const getEmployeeById = async (
  id: number
): Promise<Employee> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }

  return await response.json();
};

// INSERT
export const insertEmployee = async (
  employee: EmployeeFormData
): Promise<Employee> => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...employee,
      status: employee.status ? "Active" : "Inactive",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to insert employee");
  }

  const data = await response.json();

  return {
    ...employee,
    id: data.id || Math.floor(Math.random() * 100000),
  };
};

// UPDATE
export const updateEmployee = async (
  id: number,
  employee: EmployeeFormData
): Promise<Employee> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...employee,
      status: employee.status ? "Active" : "Inactive",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return {
    id,
    ...employee,
  };
};

// DELETE
export const deleteEmployee = async (
  id: number
): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
};