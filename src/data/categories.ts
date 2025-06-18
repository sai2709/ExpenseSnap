import { ExpenseCategory } from '../types';

export const categories: ExpenseCategory[] = [
  {
    id: 'food',
    name: 'Food',
    icon: 'utensils',
    color: '#FF6B6B',
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'car',
    color: '#4ECDC4',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: 'film',
    color: '#FFD166',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'shopping-bag',
    color: '#F78FB3',
  },
  {
    id: 'housing',
    name: 'Housing',
    icon: 'home',
    color: '#6A0572',
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'plug',
    color: '#1A535C',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: 'heart',
    color: '#FF595E',
  },
  {
    id: 'other',
    name: 'Other',
    icon: 'grid',
    color: '#8075FF',
  },
];

export const getCategoryById = (id: string): ExpenseCategory => {
  return categories.find(category => category.id === id) || categories[categories.length - 1];
};
