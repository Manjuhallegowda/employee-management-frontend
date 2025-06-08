import { Link } from 'react-router-dom';
import { FiUsers, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, type: 'spring', stiffness: 120 },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 p-10 flex flex-col items-center overflow-x-hidden">
      {/* Header with avatar and welcome */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-5 mb-16"
      >
        <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold shadow-xl shadow-indigo-300 hover:rotate-6 transform transition-transform duration-300">
          SGM
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">Welcome!</h1>
          <p className="text-indigo-700 text-lg">Manage your employees efficiently</p>
        </div>
      </motion.header>

      {/* Action Buttons */}
      <div className="flex gap-10 flex-wrap justify-center max-w-3xl w-full">
        {[ 
          { to: '/employees', icon: <FiUsers size={22} />, text: 'View Employee List', bg: 'bg-indigo-600 hover:bg-indigo-700' },
          { to: '/add-employee', icon: <FiUserPlus size={22} />, text: 'Add New Employee', bg: 'bg-green-600 hover:bg-green-700' },
          { icon: <FiLogOut size={22} />, text: 'Logout', bg: 'bg-red-600 hover:bg-red-700', onClick: handleLogout }
        ].map(({ to, icon, text, bg, onClick }, i) => {
          const content = (
            <motion.button
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`w-56 flex items-center justify-center gap-3 ${bg} text-white font-semibold py-4 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 active:scale-95`}
              onClick={onClick}
            >
              {icon}
              <span className="text-lg">{text}</span>
            </motion.button>
          );

          return to ? (
            <Link to={to} key={text} className="w-56">
              {content}
            </Link>
          ) : (
            <div key={text} className="w-56">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}