import { useState, useMemo } from 'react';
import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const headers = [
  { key: 'employeeId', label: 'Emp ID' },
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },

  { key: 'grossSalary', label: 'Fixed Gross Salary' },
  { key: 'basic', label: 'Basic' },
  { key: 'hra', label: 'HRA' },
  { key: 'ca', label: 'CA' },
  { key: 'otherAllowances', label: 'Other' },

  { key: 'noOfDays', label: 'No of Days' },
  { key: 'workingDays', label: 'Working Days' },

  { key: 'salaryEarned', label: 'Earned Salary' },

  { key: 'epf', label: 'EPF' },
  { key: 'esi', label: 'ESI' },
  { key: 'tds', label: 'TDS' },
  { key: 'salaryAdvance', label: 'Advance' },
  { key: 'deductAdvance', label: 'Deduct' },
  { key: 'dues', label: 'Dues' },
  { key: 'pt', label: 'PT' },

  { key: 'totalDeductions', label: 'Deductions' },
  { key: 'netSalary', label: 'Net Salary' },
];

export default function EmployeeList({ employees = [], onEdit, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: 'employeeId', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sort employees based on sortConfig
  const sortedEmployees = useMemo(() => {
    if (!sortConfig.key) return employees;

    return [...employees].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [employees, sortConfig]);

  // Pagination
  const pageCount = Math.ceil(sortedEmployees.length / pageSize);
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page < 1 || page > pageCount) return;
    setCurrentPage(page);
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>

      <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          Showing {paginatedEmployees.length} of {sortedEmployees.length} total employees
        </div>

        <label className="flex items-center gap-2 text-sm">
          Rows per page:
          <select
            className="border rounded p-1"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="min-w-full border border-gray-200 shadow-sm rounded-lg bg-white">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            {headers.map(({ key, label }) => {
              const isSorted = sortConfig.key === key;
              return (
                <th
                  key={key}
                  onClick={() => onSort(key)}
                  className="px-3 py-2 border-b font-medium text-center cursor-pointer select-none whitespace-nowrap"
                  title={`Sort by ${label}`}
                >
                  <div className="inline-flex items-center justify-center gap-1">
                    {label}
                    {isSorted ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )
                    ) : null}
                  </div>
                </th>
              );
            })}
            <th className="px-3 py-2 border-b font-medium text-center whitespace-nowrap">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedEmployees.length === 0 ? (
            <tr>
              <td colSpan={headers.length + 1} className="text-center p-4 text-gray-500">
                No employees found.
              </td>
            </tr>
          ) : (
            paginatedEmployees.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-50 text-center text-sm">
                {headers.map(({ key }) => (
                  <td key={key} className="px-3 py-2 border whitespace-nowrap">
                    {emp[key]}
                  </td>
                ))}
                <td className="px-3 py-2 border space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(emp._id)}
                    className="inline-flex items-center justify-center px-2 py-1 text-sm bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(emp._id)}
                    className="inline-flex items-center justify-center px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center items-center gap-2 text-sm select-none">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          aria-label="Previous page"
        >
          Prev
        </button>

        {[...Array(pageCount)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === pageCount}
          className={`px-3 py-1 rounded ${
            currentPage === pageCount ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}