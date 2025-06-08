import { useState, useEffect } from 'react';
import API from '../api';

export default function EmployeeForm({ onAdd, editingEmployee, onCancelEdit }) {
  const initialState = {
    name: '',
    employeeId: '',
    position: '',
    grossSalary: '',
    basic: '',
    hra: '',
    ca: '',
    otherAllowances: '',
    salaryAdvance: '',
    deductAdvance: '',
    dues: '',
    pt: '',
    tds: '', // ✅ Added tds to state
    noOfDays: '',
    workingDays: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [calculations, setCalculations] = useState({
    epf: 0,
    esi: 0,
    totalDeductions: 0,
    netSalary: 0,
    salaryEarned: 0,
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({ ...initialState, ...editingEmployee });
    } else {
      setFormData(initialState);
    }
  }, [editingEmployee]);

  useEffect(() => {
    const {
      basic, hra, ca, otherAllowances,
      salaryAdvance, deductAdvance,
      dues, pt, tds
    } = formData;

    const b = parseFloat(basic) || 0;
    const h = parseFloat(hra) || 0;
    const c = parseFloat(ca) || 0;
    const o = parseFloat(otherAllowances) || 0;
    const adv = parseFloat(salaryAdvance) || 0;
    const dedAdv = parseFloat(deductAdvance) || 0;
    const d = parseFloat(dues) || 0;
    const p = parseFloat(pt) || 0;
    const t = parseFloat(tds) || 0;

    const salaryEarned = b + h + c + o;
    const epf = salaryEarned * 0.12;
    const esi = salaryEarned * 0.0075;
    const totalDeductions = epf + esi + adv + dedAdv + d + p + t;
    const netSalary = salaryEarned - totalDeductions;

    setCalculations({
      salaryEarned,
      epf,
      esi,
      totalDeductions,
      netSalary,
    });
  }, [
    formData.basic,
    formData.hra,
    formData.ca,
    formData.otherAllowances,
    formData.salaryAdvance,
    formData.deductAdvance,
    formData.dues,
    formData.pt,
    formData.tds, // ✅ Added tds to dependency
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      salaryEarned: calculations.salaryEarned,
      epf: calculations.epf,
      esi: calculations.esi,
      totalDeductions: calculations.totalDeductions,
      netSalary: calculations.netSalary,
    };
    try {
      if (editingEmployee) {
        await API.put(`/employees/${editingEmployee._id}`, payload);
      } else {
        await API.post('/employees', payload);
      }
      onAdd(payload);
      setFormData(initialState);
    } catch (err) {
      alert('Error saving employee');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">
        {editingEmployee ? 'Edit Employee' : 'Add Employee'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'name', placeholder: 'Name', type: 'text' },
          { name: 'employeeId', placeholder: 'Employee ID', type: 'text' },
          { name: 'position', placeholder: 'Position', type: 'text' },
          { name: 'grossSalary', placeholder: 'Gross Salary', type: 'number' },
          { name: 'basic', placeholder: 'Basic', type: 'number' },
          { name: 'hra', placeholder: 'HRA', type: 'number' },
          { name: 'ca', placeholder: 'CA', type: 'number' },
          { name: 'otherAllowances', placeholder: 'Other Allowances', type: 'number' },
          { name: 'noOfDays', placeholder: 'No of Days Present', type: 'number' },
          { name: 'workingDays', placeholder: 'Working Days in Month', type: 'number' },
          { name: 'salaryAdvance', placeholder: 'Salary Advance', type: 'number' },
          { name: 'deductAdvance', placeholder: 'Deduct Advance', type: 'number' },
          { name: 'dues', placeholder: 'Dues', type: 'number' },
          { name: 'pt', placeholder: 'PT', type: 'number' },
          { name: 'tds', placeholder: 'TDS', type: 'number' },
        ].map(({ name, placeholder, type }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            required={['name', 'employeeId', 'position'].includes(name)} // ✅ Corrected required check
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-lg border">
        <div className="text-gray-800">
          <strong>Salary Earned:</strong> ₹{calculations.salaryEarned.toFixed(2)}
        </div>
        <div className="text-gray-800">
          <strong>EPF (12%):</strong> ₹{calculations.epf.toFixed(2)}
        </div>
        <div className="text-gray-800">
          <strong>ESI (0.75%):</strong> ₹{calculations.esi.toFixed(2)}
        </div>
        <div className="text-gray-800">
          <strong>Total Deductions:</strong> ₹{calculations.totalDeductions.toFixed(2)}
        </div>
        <div className="text-green-700 font-bold text-xl col-span-full">
          Net Salary: ₹{calculations.netSalary.toFixed(2)}
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingEmployee ? 'Update' : 'Add'}
        </button>
        {editingEmployee && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}