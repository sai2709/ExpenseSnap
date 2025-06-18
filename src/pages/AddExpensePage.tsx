import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenses } from '../hooks/useExpenses';

const AddExpensePage: React.FC = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenses();

  const handleSubmit = (data: any) => {
    addExpense(data);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Add New Transaction</h1>
      </div>
      
      <ExpenseForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddExpensePage;
