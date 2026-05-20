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