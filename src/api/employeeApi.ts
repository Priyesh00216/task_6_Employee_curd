// import type { Employee, EmployeeFormData } from "../type/employee";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const BASE_URL = `${API_BASE_URL}/Employee`;

// const normalizeEmployee = (employee: Employee): Employee => ({
//   ...employee,
//   dateOfBirth: employee.dateOfBirth?.split("T")[0] || "",
//   joiningDate: employee.joiningDate?.split("T")[0] || "",
//   createdAt: employee.createdAt || "",
//   updatedAt: employee.updatedAt || "",
// });

// const createPayload = (employee: EmployeeFormData) => ({
//   ...employee,
//   dateOfBirth: employee.dateOfBirth.includes("T")
//     ? employee.dateOfBirth
//     : `${employee.dateOfBirth}T00:00:00`,

//   joiningDate: employee.joiningDate.includes("T")
//     ? employee.joiningDate
//     : `${employee.joiningDate}T00:00:00`,
// });

// // GET ALL
// export const getAllEmployees = async (): Promise<Employee[]> => {
//   const response = await fetch(BASE_URL);

//   if (!response.ok) {
//     throw new Error("Failed to fetch employees");
//   }

//   const data: Employee[] = await response.json();

//   return data.map(normalizeEmployee);
// };

// // GET BY ID
// export const getEmployeeById = async (
//   id: number
// ): Promise<Employee> => {
//   const response = await fetch(`${BASE_URL}/${id}`);

//   if (!response.ok) {
//     throw new Error("Failed to fetch employee");
//   }

//   const data: Employee = await response.json();

//   return normalizeEmployee(data);
// };

// // INSERT
// export const insertEmployee = async (
//   employee: EmployeeFormData
// ): Promise<Employee> => {
//   const response = await fetch(BASE_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(createPayload(employee)),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to insert employee");
//   }

//   const data: Employee = await response.json();

//   return normalizeEmployee(data);
// };

// // UPDATE
// export const updateEmployee = async (
//   id: number,
//   employee: EmployeeFormData
// ): Promise<Employee> => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       employeeId: id,
//       ...createPayload(employee),
//     }),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update employee");
//   }

//   const data: Employee = await response.json();

//   return normalizeEmployee(data);
// };

// // DELETE
// export const deleteEmployee = async (
//   id: number
// ): Promise<void> => {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: "DELETE",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to delete employee");
//   }
// };


import type { Employee, EmployeeFormData } from "../type/employee";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// GET ALL
export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const data = await response.json();

  return data.map((user: any) => ({
    employeeId: user.id,
    employeeCode: `EMP-${user.id}`,

    firstName: user.name.split(" ")[0] || user.name,
    lastName: user.name.split(" ").slice(1).join(" ") || "Employee",

    email: user.email,
    phoneNumber: user.phone,

    gender: "Male",

    dateOfBirth: "2000-01-01",
    joiningDate: "2026-01-15",

    departmentId: 1,

    salary: 25000,

    isActive: true,

    address: user.address?.city || "Ahmedabad",

    profileImagePath: "",

    bloodGroup: "O+",

    createdAt: "2026-01-01T00:00:00",
    updatedAt: "2026-01-01T00:00:00",
  }));
};

// GET BY ID
export const getEmployeeById = async (
  id: number
): Promise<Employee> => {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch employee");
  }

  const user = await response.json();

  return {
    employeeId: user.id,
    employeeCode: `EMP-${user.id}`,

    firstName: user.name.split(" ")[0] || user.name,
    lastName: user.name.split(" ").slice(1).join(" ") || "Employee",

    email: user.email,
    phoneNumber: user.phone,

    gender: "Male",

    dateOfBirth: "2000-01-01",
    joiningDate: "2026-01-15",

    departmentId: 1,

    salary: 25000,

    isActive: true,

    address: user.address?.city || "Ahmedabad",

    profileImagePath: "",

    bloodGroup: "O+",

    createdAt: "2026-01-01T00:00:00",
    updatedAt: "2026-01-01T00:00:00",
  };
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
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to insert employee");
  }

  const data = await response.json();

  return {
    ...employee,
    employeeId: data.id || Math.floor(Math.random() * 100000),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return {
    ...employee,
    employeeId: id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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