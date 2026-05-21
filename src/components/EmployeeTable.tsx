import type { Employee } from "../type/employee";
import { Pencil, Trash2, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { departmentOptions } from "../constant/departmentOption";

type EmployeeTableProps ={
    employees: Employee[];
    onDeleteEmployee: (employee: Employee) => void;
    onEditEmployee: (employee: Employee) => void;
    onViewEmployee: (employee: Employee) => void;
    onSort: (field: string) => void;
    sortField: string;
    sortOrder: string;
    selectedEmployee: number[];
    onSelectedEmployee: (id: number) => void;
    onSelectedAllEmployee: () => void;
}

const EmployeeTable =({employees, onDeleteEmployee, onEditEmployee, onSort, sortField, sortOrder, onViewEmployee, selectedEmployee, onSelectedEmployee, onSelectedAllEmployee}: EmployeeTableProps) =>{
    return(
       <section className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg">
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1200px] table-fixed text-left">
          <thead className="bg-slate-800 text-sm uppercase text-slate-300">
            <tr>
              <th className="px-5 py-4">
                <input
                  type="checkbox"
                  checked={
                    employees.length > 0 &&
                    employees.every((employee) =>
                      selectedEmployee.includes(employee.employeeId)
                    )
                  }
                  onChange={onSelectedAllEmployee}
                  className="h-4 w-4 accent-blue-600"
                />
              </th>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">
                <button
                type="button"
                onClick={() => onSort("name")}
                className="flex items-center gap-2">

                Name
                {sortField === "name" &&
                    (sortOrder === "asc"?(
                        <ArrowUp size={14}/>
                    ):(
                        <ArrowDown size={14}/>
                    ))}
                </button>
                </th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Number</th>
              <th className="px-5 py-4">Address</th>
              <th className="px-5 py-4">
                <button
                    type="button"
                    onClick={() => onSort("joiningDate")}
                    className="flex items-center gap-2"
                >
                    Joining Date
                    {sortField === "joiningDate" &&
                    (sortOrder === "asc" ? (
                        <ArrowUp size={14} />
                    ) : (
                        <ArrowDown size={14} />
                    ))}
                </button>
                </th>
              <th className="px-5 py-4">
                <button
                    type="button"
                    onClick={() => onSort("department")}
                    className="flex items-center gap-2"
                >
                    Department
                    {sortField === "department" &&
                    (sortOrder === "asc" ? (
                        <ArrowUp size={14} />
                    ) : (
                        <ArrowDown size={14} />
                    ))}
                </button>
                </th>
              <th className="px-5 py-4">
                <button
                    type="button"
                    onClick={() => onSort("salary")}
                    className="flex items-center gap-2"
                >
                    Salary
                    {sortField === "salary" &&
                    (sortOrder === "asc" ? (
                        <ArrowUp size={14} />
                    ) : (
                        <ArrowDown size={14} />
                    ))}
                </button>
                </th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {employees.map((employee) => (
            <tr
                key={employee.employeeId}
                className="transition hover:bg-slate-800/60"
              >
                <td className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={selectedEmployee.includes(employee.employeeId)}
                    onChange={() => onSelectedEmployee(employee.employeeId)}
                    className="h-4 w-4 accent-blue-600"
                  />
                </td>
                <td className="px-5 py-4 text-slate-400">
                  {employee.employeeId}
                </td>

                <td className="px-5 py-4 font-medium text-white">
                  {employee.firstName} {employee.lastName}  
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {employee.email}
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {employee.phoneNumber}
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {employee.address}
                </td>

                <td className="px-5 py-4 text-slate-400">
                  {employee.joiningDate}
                </td>

                <td className="px-5 py-4 text-slate-400" >
                  {
                    departmentOptions.find(
                      (department) =>
                        department.value === employee.departmentId
                    )?.label
                  }
                </td>

                <td className="px-5 py-4 text-slate-400">
                  ₹{employee.salary}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      employee.isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {employee.isActive
                      ? "Active"
                      : "Inactive"}
        
                    </span>
                </td>
                <td className="px-5 py-4">
                    <div className="flex gap-2">
                        <button
                        type="button"
                        onClick={() => onEditEmployee(employee)}
                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                        >
                        <Pencil size={16} />
                        </button>

                        <button
                        type="button"
                        onClick={() => onDeleteEmployee(employee)}
                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                        >
                        <Trash2 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onViewEmployee(employee)}
                          className="rounded-lg bg-slate-700 p-2 text-white hover:bg-slate-600"
                        >
                          <Eye size={16} />
                        </button>
                    </div>

                </td>
                  
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </section>
    );
};

export default EmployeeTable;