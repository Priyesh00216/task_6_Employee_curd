import type { Employee, EmployeeFormData } from "../type/employee";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


type EmployeeFormProps = {
  onAddEmployee: (employee: EmployeeFormData) => void;
  onUpdateEmployee: (employee: EmployeeFormData) => void;
  selectedEmployee?: Employee | null;
};

const EmployeeForm = ({ onAddEmployee, onUpdateEmployee, selectedEmployee }: EmployeeFormProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    number: "",
    address: "",
    joiningDate: "",
    department: "",
    salary: 0,
    status: true,
  });

  const [ errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    joiningDate: "",
    department: "",
    salary: "",
    status: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      number: "",
      address: "",
      joiningDate: "",
      department: "",
      salary: "",
      status: "",
    };

    let isValid = true;

    if(!formData.name.trim()){
      newErrors.name="Name is required";
      isValid = false;
    }
    if(!formData.email.trim()){
      newErrors.name="Email is required";
      isValid = false;
    } else if(
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ){
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if(!formData.number.trim()){
      newErrors.number="Phone number is required.";
      isValid = false;
    }else if(!/^[0-9]{10}$/.test(formData.number)){
      newErrors.number = " Phone number must be Exactly 10 digits.";
      isValid = false;
    }

    if(!formData.address.trim()){
      newErrors.address="Address is required.";
      isValid=false;
    }
    
    if(!formData.joiningDate.trim()){
      newErrors.joiningDate="Joining Date is required.";
      isValid=false;
    }

    if(!formData.department.trim()){
      newErrors.department="Department is required.";
      isValid=false;
    }

    
    if(formData.salary <= 0){
      newErrors.salary="Salary must be greater than 0";
      isValid=false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "salary"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(!validateForm()) return;

    if(selectedEmployee){
      onUpdateEmployee(formData);
    }else{
      onAddEmployee(formData);
    }

    setFormData({
      name: "",
      email: "",
      number: "",
      address: "",
      joiningDate: "",
      department: "",
      salary: 0,
      status: true,
    });
  };

  useEffect (() => {
    if(selectedEmployee){
      setFormData({
          name: selectedEmployee.name,
          email: selectedEmployee.email,
          number: selectedEmployee.number,
          address: selectedEmployee.address,
          joiningDate: selectedEmployee.joiningDate,
          department: selectedEmployee.department,
          salary: selectedEmployee.salary,
          status: selectedEmployee.status,
      });
    }
  }, [selectedEmployee]);

  

  return (
    <form
        onSubmit={handleSubmit}
        className="space-y-5 gap-4 md:grid-cols-3 lg:grid-cols-3"
        >

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Enter employee name"
          value={formData.name}
          onChange={handleChange}
          className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
        />

        <div className="min-h-[22px] pt-1">
          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>
      </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Email
      </label>

      <input
        type="text"
        name="email"
        placeholder="Enter employee email"
        value={formData.email}
        onChange={handleChange}
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      />

      <div className="min-h-[22px] pt-1">
        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Number
      </label>

      <input
        type="text"
        name="number"
        placeholder="Enter employee number"
        value={formData.number}
        onChange={handleChange}
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      />

      <div className="min-h-[22px] pt-1">
        {errors.number && (
          <p className="text-sm text-red-500">
            {errors.number}
          </p>
        )}
      </div>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Address
      </label>

      <input
        type="text"
        name="address"
        placeholder="Enter employee address"
        value={formData.address}
        onChange={handleChange}
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      />

      <div className="min-h-[22px] pt-1">
        {errors.address && (
          <p className="text-sm text-red-500">
            {errors.address}
          </p>
        )}
      </div>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Joining Date
      </label>

      <DatePicker
        selected={
          formData.joiningDate? new Date(formData.joiningDate):null
        }
        onChange={(date:Date | null) =>
          setFormData((prev) => ({
            ...prev,joiningDate: date ? date.toISOString().split("T")[0] : "",
          }))
        }
        dateFormat="yyyy-mm-dd"
        placeholderText="Select joining Date"
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      />

      <div className="min-h-[22px] pt-1">
        {errors.joiningDate && (
          <p className="text-sm text-red-500">
            {errors.joiningDate}
          </p>
        )}
      </div>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Department
      </label>

      <input
        type="text"
        name="department"
        placeholder="Enter employee department"
        value={formData.department}
        onChange={handleChange}
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      />

      <div className="min-h-[22px] pt-1">
        {errors.department && (
          <p className="text-sm text-red-500">
            {errors.department}
          </p>
        )}
      </div>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Salary
      </label>

      <input
        type="text"
        name="salary"
        placeholder="Enter employee salary"
        value={formData.salary}
        onChange={handleChange}
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      />

      <div className="min-h-[22px] pt-1">
        {errors.salary && (
          <p className="text-sm text-red-500">
            {errors.salary}
          </p>
        )}
      </div>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Status
      </label>

      <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-950 px-4 py-3">
        <span className="text-sm text-slate-300">
          {formData.status ? "Active" : "Inactive"}
        </span>

        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              status: !prev.status,
            }))
          }
          className={`relative h-7 w-14 rounded-full transition ${
            formData.status ? "bg-blue-600" : "bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
              formData.status ? "left-8" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>

      <div className="md:col-span-2">
          <button
            type="submit"
            className="h-12 w-full rounded-lg bg-blue-600 font-semibold text-white hover:bg-blue-700"
          >
            {selectedEmployee ? "Update Employee" : "Add Employee"}
          </button>
        </div>
    </form>
  );
};

export default EmployeeForm;