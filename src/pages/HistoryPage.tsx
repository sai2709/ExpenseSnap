import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import MonthSelector from '../components/MonthSelector';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const { expenses, deleteExpense, getMonthlyExpenses } = useExpenses();
  
  const monthlyExpenses = getMonthlyExpenses(currentMonth);
  
  const filteredExpenses = searchTerm
    ? monthlyExpenses.filter(expense => 
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.amount.toString().includes(searchTerm)
      )
    : monthlyExpenses;

  const handleEditExpense = (expense: any) => {
    navigate(`/edit/${expense.id}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Expense History</h1>
      
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <MonthSelector currentMonth={currentMonth} onMonthChange={setCurrentMonth} />
      
      <div className="mb-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
          </h2>
          <button className="text-gray-600 p-2 hover:bg-gray-100 rounded-full">
            <Filter size={20} />
          </button>
        </div>
        
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={deleteExpense}
          onEdit={handleEditExpense}
        />
      </div>
    </div>
  );
};

export default HistoryPage;
