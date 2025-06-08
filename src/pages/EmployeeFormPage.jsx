import EmployeeForm from '../components/EmployeeForm';
import Navbar from '../components/Navbar';

export default function EmployeeFormPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 p-4 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Add New Employee</h1>
        <EmployeeForm />
      </main>
    </>
  );
}