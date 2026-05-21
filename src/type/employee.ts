const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}/api/Employee`;

export type Gender = "Male" | "Female" ;

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type Employee = {
  employeeId: number;
  employeeCode: string;

  firstName: string;
  lastName: string;

  email: string;
  phoneNumber: string;

  gender: Gender;

  dateOfBirth: string;
  joiningDate: string;

  departmentId: number;

  salary: number;

  isActive: boolean;

  address: string;

  profileImagePath: string;

  bloodGroup: BloodGroup;

  createdAt: string;
  updatedAt: string;
};

export type EmployeeFormData = Omit<
  Employee,
  "employeeId" | "createdAt" | "updatedAt"
>;