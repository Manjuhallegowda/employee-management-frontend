import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../api';
import SearchBar from '../components/SearchBar';
import EmployeeList from '../components/EmployeeList';
import Navbar from '../components/Navbar';
import ConfirmDialog from '../components/ConfirmDialog';

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [confirmId, setConfirmId] = useState(null); // 🔴 Modal trigger
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await API.get(`/employees?search=${search}`);
      setEmployees(res.data);
    } catch (err) {
      toast.error('Failed to fetch employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = (id) => {
    setConfirmId(id); // 🔴 Show modal instead of window.confirm
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/employees/${confirmId}`);
      toast.success('Employee deleted');
      fetchEmployees();
    } catch {
      toast.error('Failed to delete employee');
    } finally {
      setConfirmId(null); // 🔴 Close modal
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-1 p-6">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 w-full h-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-3xl font-bold mb-6 text-center text-indigo-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Employee List
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <SearchBar search={search} setSearch={setSearch} />
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <EmployeeList employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
          </motion.div>
        </motion.div>
      </main>

      {/* 🔴 ConfirmDialog */}
      {confirmId && (
        <ConfirmDialog
          message="Are you sure you want to delete this employee?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}