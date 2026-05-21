import { useEffect, useState } from "react";
import { getAllEmployees, deleteEmployee, updateEmployee } from "../api/employeeApi";
import type { Employee } from "../type/employee";
import EmployeeForm from "../components/EmployeeForm";
import { insertEmployee } from "../api/employeeApi";
import type { EmployeeFormData } from "../type/employee";
import EmployeeTable from "../components/EmployeeTable";
import Modal from "../components/Modal";
import EmployeeGrid from "../components/EmployeeGrid";
import { LayoutGrid, Table } from "lucide-react";
import { departmentOptions } from "../constant/departmentOption";
import toast from "react-hot-toast";


const Employees = () => {
  const [ isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [ loading, setLoading] = useState(false);
  const [ error, setError] = useState("");
  const [ selectedEmployee, setSelectedEmployee ] = useState<Employee | null>(null);
  const [ searchEmployee, setSearchEmployee ] = useState("");
  const [ statusFilter, setStatusFilter] = useState("All");
  const [ departmentFilter, setDepartmentFilter ] = useState<number>(0);
  const [ sortField, setSortField ] = useState("");
  const [ sortOrder, setSortOrder ] = useState("asc")
  const [ employeeToDelete, setEmployeeToDelete ] = useState<Employee | null>(null);
  const [ viewGrid, setViewGrid ] = useState< "table" | "grid" >("table");
  const [ viewSelectedEmployee, setViewSelectedEmployee] = useState<Employee | null>(null);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  
  const employeesPerPage = 20;

const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      setError("Something went wrong while fetching employees");
    } finally {
      setLoading(false);
    }
  };

  // Add Handler
  const handleAddEmployee = async (
  employee: EmployeeFormData
) => {
  try {
    const newEmployee = await insertEmployee(employee);

    setEmployees((prev) => [
      ...prev,
      newEmployee,
    ]);
    setIsModalOpen(false);

    toast.success("Employee added successfully.")
  } catch (error) {
    toast.error("Failed to add employee");
  }
};

  // Edit handler

  const handleEditEmployee = (employees: Employee) => {
    setSelectedEmployee(employees);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  //Update Handler

  const handleUpdatedEmployee = async(
    employee: EmployeeFormData
  ) => {
    if(!selectedEmployee) return;

    try{

      let employeeAfterUpdate: Employee;

      if( selectedEmployee.employeeId > 10){
        employeeAfterUpdate = {
          ...employee,
          employeeId: selectedEmployee.employeeId,
          createdAt: selectedEmployee.createdAt,
          updatedAt: new Date().toISOString(),
        };
      } else {
          employeeAfterUpdate = await updateEmployee(
           selectedEmployee.employeeId,
           employee
          );
        }

      setEmployees((prev) => 
        prev.map((emp) => 
        emp.employeeId === selectedEmployee.employeeId
          ?employeeAfterUpdate
          :emp
        )
      );

      setSelectedEmployee(null);
      setIsModalOpen(false);

      toast.success("Employee updated successfully");
    }catch(error){
      toast.error("Failed to update employee")
    }
  };

  // Handle View

  const handleViewEmpoloyee = (employee: Employee) => {
    setViewSelectedEmployee(employee);
  }

  // Handle Sorting

  const handleSort = (field: string) => {
    if(sortField === field){
      setSortOrder((prev) => 
        prev === 'asc'?'dsc' : 'asc'
      );
    }else{
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filtered Data
  
  const  filteredEmployee = employees.filter((employee) =>{

    const matchesSearch =
    employee.firstName.toLowerCase().includes(searchEmployee.toLowerCase())||
    employee.lastName.toLowerCase().includes(searchEmployee.toLowerCase())||
    employee.email.toLowerCase().includes(searchEmployee.toLowerCase())||
    String(employee.departmentId).toLowerCase().includes(searchEmployee.toLowerCase());
    
    const matchesStatus = statusFilter === "All" ||
    ( statusFilter === "Active" && employee.isActive) ||
    ( statusFilter === "Inactive" && !employee.isActive);
    
    const matchesDepartment = 
    departmentFilter === 0 ||
  employee.departmentId === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
});
  
  const department = [
    "All",
    ...new Set(employees.map((employee) => employee.departmentId)),
  ]

  // Sorted Data

  const sortedEmployees = sortField?[...filteredEmployee].sort((a, b) => {
  let comparison = 0;

  if (sortField === "name") {
    comparison = a.firstName.localeCompare(b.firstName);
  }
  if (sortField === "name") {
    comparison = a.lastName.localeCompare(b.lastName);
  }
  if (sortField === "salary") {
    comparison = a.salary - b.salary;
  }

  if (sortField === "department") {
    comparison = a.departmentId - b.departmentId;
  }

  if (sortField === "joiningDate") {
    comparison =
      new Date(a.joiningDate).getTime() -
      new Date(b.joiningDate).getTime();
  }

  return sortOrder === "asc" ? comparison : -comparison;
}): filteredEmployee;

// Pagination 

const totalPages = Math.ceil(
  sortedEmployees.length/employeesPerPage
);

const startIndex = ( currentPage - 1 ) * employeesPerPage; 
const endIndex = startIndex + employeesPerPage;

const paginatedEmployees =  sortedEmployees.slice(
  startIndex,
  endIndex
);

// Handle Selection

const handleSelectedEmployee = (id: number) => {
  setSelectedEmployees((prev) => 
  prev.includes(id)? prev.filter((employeeId) => employeeId !== id) : [...prev,id]
  );
};

const handleSelectedAllEmployees = () => {
  const currentPageIds = paginatedEmployees.map(
    (employee) => employee.employeeId
  );

  const allSelected = currentPageIds.every((employeeId) => 
    selectedEmployees.includes(employeeId)
  );

  if(allSelected){
    setSelectedEmployees((prev) => 
      prev.filter((id) => !currentPageIds.includes(id))
    );
  }else{
    setSelectedEmployees((prev) => [
      ...new Set([...prev, ...currentPageIds]),
    ]);
  }
};

// Handle Modal open for Delete

  const handleOpenDeleteModal = (employee: Employee) => {
    setEmployeeToDelete(employee);
  };

// Handle Delete Function

const handleConfirmDelete = async() => {
    if(!employeeToDelete) return;
    try{
      await  deleteEmployee(employeeToDelete.employeeId);

      setEmployees((prev) => 
      prev.filter((employee) => employee.employeeId !== employeeToDelete.employeeId)
      );
      
      setEmployeeToDelete(null);
      toast.success("Employee deleted successfully");

    } catch (error){
      toast.error("Failed to delete employee")
    }
};

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  const getDepartmentName = (departmentId: number) => {
  return (
    departmentOptions.find(
      (department) => department.value === departmentId
    )?.label || "Unknown"
  );
};

// HTML code
    return (
  <main className="min-h-screen w-full bg-slate-950 px-8 py-10 text-slate-100">
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Employee Management
        </h1>

        <button 
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>
      
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchEmployee}
            onChange={(event) => setSearchEmployee(event.target.value)}
            className="h-12 w-[360px] rounded-lg border border-slate-700 bg-slate-900 px-4 text-slate-100 outline-none focus:border-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-12 w-[150px] rounded-lg border border-slate-700 bg-slate-900 px-4 text-slate-100 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(Number(event.target.value))
            }
            className="h-12 w-[190px] rounded-lg border border-slate-700 bg-slate-900 px-4 text-slate-100 outline-none focus:border-blue-500"
          >
            <option value={0}>All</option>

            {departmentOptions.map((department) => (
              <option
                key={department.value}
                value={department.value}
              >
                {department.label}
              </option>
            ))}
          </select>
        </div>


        <div className="flex flex-col items-end gap-3">

          <div className="flex h-12 w-[112px] overflow-hidden rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={() => setViewGrid("table")}
              className={`flex flex-1 items-center justify-center ${
                viewGrid === "table"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              <Table size={18} />
            </button>

            <button
              type="button"
              onClick={() => setViewGrid("grid")}
              className={`flex flex-1 items-center justify-center ${
                viewGrid === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        {selectedEmployees.length > 0 && (
            <div className="mb-5 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-5 py-3">
              <p className="text-sm text-slate-300">
                {selectedEmployees.length} employee
                {selectedEmployees.length > 1 ? "s" : ""} selected
              </p>

              <button
                type="button"
                onClick={() => setSelectedEmployees([])}
                className="text-sm font-medium text-red-400 hover:text-red-300"
              >
                Clear Selection
              </button>
            </div>
          )}
      {viewGrid === "table" ? (
        <EmployeeTable
          employees={paginatedEmployees}
          onDeleteEmployee={handleOpenDeleteModal}
          onEditEmployee={handleEditEmployee}
          onViewEmployee={handleViewEmpoloyee}
          selectedEmployee={selectedEmployees}
          onSelectedEmployee={handleSelectedEmployee}
          onSelectedAllEmployee={handleSelectedAllEmployees}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      ) : (
        <EmployeeGrid
          employees={paginatedEmployees}
          onDeleteEmployee={handleOpenDeleteModal}
          onEditEmployee={handleEditEmployee}
          onViewEmployee={handleViewEmpoloyee}
        />
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing {startIndex + 1} to{" "}
          {Math.min(endIndex, sortedEmployees.length)} of{" "}
          {sortedEmployees.length} employees
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
      </div>
    </div>

    <Modal 
      title={
        selectedEmployee?"Edit Employee" : "Add Employee"
      }
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
      }}
      >
       <EmployeeForm
                onAddEmployee={handleAddEmployee}
                onUpdateEmployee={handleUpdatedEmployee}
                selectedEmployee={selectedEmployee}
        /> 
      </Modal>
      <Modal
        title="Delete Employee"
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
      >
        <p className="text-slate-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">
            {employeeToDelete?.firstName}
            {employeeToDelete?.lastName}
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setEmployeeToDelete(null)}
            className="rounded-lg bg-slate-700 px-5 py-3 text-white hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmDelete}
            className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
      <Modal
      title="Employee Details"
      isOpen={!!viewSelectedEmployee}
      onClose={() => setViewSelectedEmployee(null)} >
        {viewSelectedEmployee && (
          <div>
            <div className="grid gap-4  text-sm  text-slate-300">
              <DetailRow label="ID" value={viewSelectedEmployee.employeeId} />
              <DetailRow label="Name" value={viewSelectedEmployee.firstName} />
              <DetailRow label="Name" value={viewSelectedEmployee.lastName} />
              <DetailRow label="Email" value={viewSelectedEmployee.email} />
              <DetailRow label="Number" value={viewSelectedEmployee.phoneNumber} />
              <DetailRow label="Address" value={viewSelectedEmployee.address} />
              <DetailRow label="Joining Date" value={viewSelectedEmployee.joiningDate} />
              <DetailRow label="Department" value={viewSelectedEmployee.departmentId} />
              <DetailRow label="Salary" value={`₹${viewSelectedEmployee.salary}`} />
              <DetailRow label="Status" value={viewSelectedEmployee.isActive ? "Active" : "Inactive"} />
            </div>

            <div className=" mt-6 flex justify-end gap-3 border-t border-slate-800 pt-5">
              <button
              type="button"
              onClick={() => { setViewSelectedEmployee(null)}}
              className="rounded-lg bg-slate-700 px-5 py-3 text-white hover:bg-slate-600 "
              >
                  Close
              </button>

              <button
              type="button"
              onClick={() => {

                handleEditEmployee(viewSelectedEmployee)
                setViewSelectedEmployee(null);
              }}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Edit
              </button>

              <button
              type="button"
              onClick={() => {
                handleOpenDeleteModal(viewSelectedEmployee)
                setViewSelectedEmployee(null);
              }}
              className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>
            </div>
          </div>
        )}

      </Modal>
  </main>
);
};

type DetailRowProps ={
  label: string;
  value: string | number;
};

const DetailRow = ({ label, value } : DetailRowProps) => {
  return(

    <div className="flex justify-between gap-6 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-100">
        {value}
      </span>
    </div>
  );
};

export default Employees;