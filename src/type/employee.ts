const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}/user`;

export type Employee = {
     id: number;
     name: string;
     email: string;
     number: string;
     address: string
     joiningDate: string
     department: string;
     salary: number;
     status: boolean;
};

export type  EmployeeFormData = Omit<Employee, "id">;