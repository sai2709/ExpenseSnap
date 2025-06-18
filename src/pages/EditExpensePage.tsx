import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ExpenseForm from '../components/ExpenseForm';
import { useExpenses } from '../hooks/useExpenses';
import { Expense } from '../types';

const EditExpensePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { expenses, updateExpense } = useExpenses();
  const [expense, setExpense] = useState<Expense | null>(null);

  useEffect(() => {
    if (id) {
      const foundExpense = expenses.find(e => e.id === id);
      if (foundExpense) {
        setExpense(foundExpense);
      } else {
        navigate('/');
      }
    }
  }, [id, expenses, navigate]);

  const handleSubmit = (data: any) => {
    if (expense) {
      updateExpense({
        ...expense,
        ...data,
      });
      navigate('/');
    }
  };

  if (!expense) {
    return <div className="p-4 text-center">Loading...</div>;
  }

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
        <h1 className="text-xl font-bold text-gray-800">Edit Expense</h1>
      </div>
      
      <ExpenseForm
        onSubmit={handleSubmit}
        initialValues={expense}
        buttonText="Update Expense"
      />
    </div>
  );
};

export default EditExpensePage;
