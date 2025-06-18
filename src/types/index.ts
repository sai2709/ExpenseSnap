export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  transactionType: 'expense' | 'income';
}

export type ExpenseCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export interface ExpenseSummary {
  totalAmount: number;
  totalIncome: number;
  netAmount: number;
  categoryTotals: Record<string, number>;
  dateRange: {
    start: string;
    end: string;
  };
}
