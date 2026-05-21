import type { Employee } from "../type/employee";
import { Eye, Pencil, Trash2 } from "lucide-react";

type EmployeeGridProps = {
    employees: Employee[];
    onEditEmployee : (emplpoyee: Employee) => void;
    onDeleteEmployee : (employee: Employee) => void;
    onViewEmployee : (employee: Employee) => void;
}

const EmployeeGrid = ({
    employees,
    onEditEmployee,
    onDeleteEmployee,
    onViewEmployee
}: EmployeeGridProps) => {
    return(
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {employees.map((employee) => (
        <div
          key={employee.employeeId}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                {employee.email}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                employee.isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {employee.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="space-y-2 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">Number:</span>{" "}
              {employee.phoneNumber}
            </p>

            <p>
              <span className="text-slate-500">Department:</span>{" "}
              {employee.departmentId}
            </p>

            <p>
              <span className="text-slate-500">Salary:</span> ₹
              {employee.salary}
            </p>

            <p>
              <span className="text-slate-500">Joining Date:</span>{" "}
              {employee.joiningDate}
            </p>
          </div>

          <div className="mt-5 flex gap-2 border-t border-slate-800 pt-4">
            <button
                type="button"
                onClick={() => onViewEmployee(employee)}
                className="rounded-lg bg-slate-700 p-2 text-white hover:bg-slate-600"
                >
                <Eye size={16} />
            </button>

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
          </div>
        </div>
      ))}
    </section>
    );
};

export default EmployeeGrid;