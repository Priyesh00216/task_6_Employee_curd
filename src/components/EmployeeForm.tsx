import type { Employee, EmployeeFormData } from "../type/employee";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import DatePicker from "react-datepicker";
import { departmentOptions } from "../constant/departmentOption"
import type { Gender } from "../type/employee";
import "react-datepicker/dist/react-datepicker.css";


type EmployeeFormProps = {
  onAddEmployee: (employee: EmployeeFormData) => void;
  onUpdateEmployee: (employee: EmployeeFormData) => void;
  selectedEmployee?: Employee | null;
};

const EmployeeForm = ({ onAddEmployee, onUpdateEmployee, selectedEmployee }: EmployeeFormProps) => {

  const [ touched, setTouched ] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<EmployeeFormData>({
    employeeCode: "",

    firstName: "",
    lastName: "",

    email: "",
    phoneNumber: "",

    gender: "Male",

    dateOfBirth: "",
    joiningDate: "",

    departmentId: 0,

    salary: 0,

    isActive: true,

    address: "",

    profileImagePath: "",

    bloodGroup: "O+",
  });


const [errors, setErrors] = useState({
      employeeCode: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      joiningDate: "",
      departmentId: "",
      salary: "",
      address: "",
      profileImagePath: "",
      bloodGroup: "",
    });

  const validateForm = () => {
    const newErrors = {
      employeeCode: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      joiningDate: "",
      departmentId: "",
      salary: "",
      address: "",
      profileImagePath: "",
      bloodGroup: "",
    };

    let isValid = true;

    if(!formData.firstName.trim()){
      newErrors.firstName="Name is required";
      isValid = false;
    }
    if(!formData.lastName.trim()){
      newErrors.lastName="Name is required";
      isValid = false;
    }
    if(!formData.email.trim()){
      newErrors.email="Email is required";
      isValid = false;
    } else if(
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ){
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if(!formData.phoneNumber.trim()){
      newErrors.phoneNumber="Phone number is required.";
      isValid = false;
    }else if(!/^[0-9]{10}$/.test(formData.phoneNumber)){
      newErrors.phoneNumber = " Phone number must be Exactly 10 digits.";
      isValid = false;
    }

    if(!formData.gender.trim()){
      newErrors.gender = "Please select Gender."
    }

    if(!formData.address.trim()){
      newErrors.address="Address is required.";
      isValid=false;
    }
    
    if(!formData.joiningDate.trim()){
      newErrors.joiningDate="Joining Date is required.";
      isValid=false;
    }

    if(formData.departmentId <= 0){
      newErrors.departmentId="Department is required.";
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
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const target = event.target;

      const { name, value } = target;

      if (
        target instanceof HTMLInputElement &&
        target.type === "checkbox"
      ) {
        setFormData((prev) => ({
          ...prev,
          [name]: target.checked,
        }));

        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "salary"
            ? Number(value)
            : value,
      }));
    };

    const handleBlur = (
        event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
      ) => {
        const { name } = event.target;

        setTouched((prev) => ({

          ...prev,
          [name]: true,
        }));
        validateForm();
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
      employeeCode: "",

      firstName: "",
      lastName: "",

      email: "",
      phoneNumber: "",

      gender: "Male",

      dateOfBirth: "",
      joiningDate: "",

      departmentId: 0,

      salary: 0,

      isActive: true,

      address: "",

      profileImagePath: "",

      bloodGroup: "O+",
        });
  };

  useEffect (() => {
    if(selectedEmployee){
      setFormData({
           employeeCode: selectedEmployee.employeeCode,

          firstName: selectedEmployee.firstName,
          lastName: selectedEmployee.lastName,

          email: selectedEmployee.email,
          phoneNumber: selectedEmployee.phoneNumber,

          gender: selectedEmployee.gender,

          dateOfBirth: selectedEmployee.dateOfBirth,
          joiningDate: selectedEmployee.joiningDate,

          departmentId: selectedEmployee.departmentId,

          salary: selectedEmployee.salary,

          isActive: selectedEmployee.isActive,

          address: selectedEmployee.address,

          profileImagePath: selectedEmployee.profileImagePath,

          bloodGroup: selectedEmployee.bloodGroup,
      });
    }
  }, [selectedEmployee]);

  const genderOptions: Gender[] = [
  "Male",
  "Female",
    ];

  return (
    <form
        onSubmit={handleSubmit}
        className="space-y-5 gap-4 md:grid-cols-3 lg:grid-cols-3"
        >

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          First Name
        </label>

        <input
          type="text"
          name="firstName"
          placeholder="Enter employee First name"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
        />

        <div className="min-h-[22px] pt-1">
          {errors.firstName && (
            <p className="text-sm text-red-500">
              {errors.firstName}
            </p>
          )}
        </div>
      </div>

    <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Last Name
        </label>

        <input
          type="text"
          name="lastName"
          placeholder="Enter employee Last name"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
        />

        <div className="min-h-[22px] pt-1">
          {errors.lastName && (
            <p className="text-sm text-red-500">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Email
      </label>

      <input
        type="email"
        name="email"
        placeholder="Enter employee email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      />

      <div className="min-h-[22px] pt-1">
        {touched.email && errors.email && (
          <p className="text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Phone Number
      </label>

      <input
        type="tel"
        name="phoneNumber"
        placeholder="Enter employee number"
        value={formData.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      />

      <div className="min-h-[22px] pt-1">
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">
            {errors.phoneNumber}
          </p>
        )}
      </div>
    </div>

    <div>
  <label className="mb-3 block text-sm font-medium text-slate-300">
        Gender
      </label>

      <div className="flex gap-6">
        {genderOptions.map((gender) => (
          <label
            key={gender}
            className="flex items-center gap-2 text-slate-200"
          >
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={formData.gender === gender}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-4 w-4 accent-blue-500"
            />

            <span>{gender}</span>
          </label>
        ))}
      </div>

      {touched.gender && errors.gender && (
        <p className="mt-1 text-sm text-red-500">
          {errors.gender}
        </p>
      )}
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Address
      </label>

      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={4}
        placeholder="Enter address"
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
          formData.joiningDate
            ? new Date(formData.joiningDate)
            : null
        }
        onChange={(date: Date | null) =>
          setFormData((prev) => ({
            ...prev,
            joiningDate: date
              ? date.toISOString().split("T")[0]
              : "",
          }))
        }
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
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

      <select
        name="departmentId"
        value={formData.departmentId}
        onChange={(event) =>
          setFormData((prev) => ({
            ...prev,
            departmentId: Number(event.target.value),
          }))
        }
        onBlur={() =>
          setTouched((prev) => ({
            ...prev,
            departmentId: true,
          }))
        }
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      >
        <option value={0}>Select Department</option>

        {departmentOptions.map((department) => (
          <option key={department.value} value={department.value}>
            {department.label}
          </option>
        ))}
      </select>

      <div className="min-h-[22px] pt-1">
        {errors.departmentId && (
          <p className="text-sm text-red-500">
            {errors.departmentId}
          </p>
        )}
      </div>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Salary
      </label>

      <CurrencyInput
        name="salary"
        placeholder="Enter salary"
        prefix="₹ "
        decimalsLimit={2}
        value={formData.salary || ""}
        onValueChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            salary: value ? Number(value) : 0,
          }))
        }
        onBlur={handleBlur}
        className="h-12 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 text-slate-100 outline-none focus:border-blue-500"
      />

      <div className="min-h-[22px] pt-1">
        {touched.salary && errors.salary && (
            <p className="text-sm text-red-500">
              {errors.salary}
            </p>
          )}
      </div>
    </div>

    <div>
  <label className="mb-2 block text-sm font-medium text-slate-300">
        Profile Image
      </label>

      <input
        type="file"
        name="profileImagePath"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];

          setFormData((prev) => ({
            ...prev,
            profileImagePath: file ? file.name : "",
          }));
        }}
        className="block w-full cursor-pointer rounded-lg border border-slate-700 bg-slate-950 text-sm text-slate-300 file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-blue-700"
      />

      {formData.profileImagePath && (
        <p className="mt-2 text-sm text-slate-400">
          Selected: {formData.profileImagePath}
        </p>
      )}
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        Status
      </label>

      <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-950 px-4 py-3">
        <span className="text-sm text-slate-300">
          {formData.isActive ? "Active" : "Inactive"}
        </span>

        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              isActive: !prev.isActive,
            }))
          }
          className={`relative h-7 w-14 rounded-full transition ${
            formData.isActive ? "bg-blue-600" : "bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
              formData.isActive ? "left-8" : "left-1"
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