import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../api';
import Navbar from '../components/Navbar';

const fields = [
  { id: 'employeeId', label: 'Employee ID', type: 'text' },
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'position', label: 'Position', type: 'text' },

  { id: 'grossSalary', label: 'Fixed Gross Salary', type: 'number' },

  { id: 'basic', label: 'Basic', type: 'number' },
  { id: 'hra', label: 'HRA', type: 'number' },
  { id: 'ca', label: 'CA', type: 'number' },
  { id: 'otherAllowances', label: 'Other Allowances', type: 'number' },

  { id: 'noOfDays', label: 'No of Days', type: 'number' },
  { id: 'workingDays', label: 'No of Working Days', type: 'number' },

  { id: 'salaryEarned', label: 'Salary Earned', type: 'number' },
  { id: 'epf', label: 'EPF (12%)', type: 'number' },
  { id: 'esi', label: 'ESI (0.75%)', type: 'number' },
  { id: 'tds', label: 'TDS', type: 'number' },
  { id: 'salaryAdvance', label: 'Salary Advance', type: 'number' },
  { id: 'deductAdvance', label: 'Deduct Advance', type: 'number' },
  { id: 'dues', label: 'Dues', type: 'number' },
  { id: 'pt', label: 'PT', type: 'number' },

  { id: 'totalDeductions', label: 'Total Deductions', type: 'number' },
  { id: 'netSalary', label: 'Net Salary', type: 'number' },
];

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.id] = field.type === 'number' ? 0 : '';
      return acc;
    }, {})
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await API.get(`/employees/${id}`);
        const data = res.data;
        const initialData = {};
        fields.forEach(({ id }) => {
          initialData[id] = data[id] ?? (typeof data[id] === 'number' ? 0 : '');
        });
        setEmployee(initialData);
      } catch {
        toast.error('Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    }
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === 'number' && value !== '' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await API.put(`/employees/${id}`, employee);
      toast.success('Employee updated successfully');
      navigate('/employees');
    } catch {
      toast.error('Failed to update employee');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        <style>{`
          .loader {
            border-top-color: #3490dc;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6">
        <div className="bg-white p-8 rounded-lg shadow w-full max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Edit Employee</h1>

          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fields.map(({ id, label, type }) => (
              <div key={id}>
                <label htmlFor={id} className="block font-semibold mb-2">
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  value={employee[id]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={type === 'number' ? 0 : undefined}
                />
              </div>
            ))}

            <div className="md:col-span-2 lg:col-span-3 flex justify-between items-center pt-6 border-t mt-6">
              <Link to="/employees" className="text-gray-600 underline hover:text-gray-900">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className={`bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition ${
                  saving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}