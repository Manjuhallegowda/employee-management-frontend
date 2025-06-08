import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api';
import EmployeeForm from '../components/EmployeeForm';
import ImportCSV from '../components/ImportCSV';
import Navbar from '../components/Navbar';

export default function AddEmployeePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (employeeData) => {
    try {
      setIsSubmitting(true);
      await API.post('/employees', employeeData);
      toast.success('Employee saved!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImport = () => {
    toast.success('Employees imported!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-1 p-6 overflow-auto">
        <motion.div
          className="bg-white rounded-xl shadow-md w-full max-w-6xl mx-auto p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-3xl font-bold mb-6 text-center text-indigo-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Add New Employee
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <EmployeeForm
              onAdd={handleFormSubmit}
              editingEmployee={null}
              isSubmitting={isSubmitting}
            />
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-4 text-center">
              Or Import From CSV
            </h2>
            <ImportCSV onImport={handleImport} />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}