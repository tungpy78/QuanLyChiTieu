export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  name: string;
  type: TransactionType;
  amount: number; // Always positive (> 0)
  categoryId: string;
  date: string; // ISO date string "YYYY-MM-DD"
  note: string;
  createdAt: string; // ISO timestamp "YYYY-MM-DDTHH:mm:ss.sssZ" for absolute sorting
}

export type SortOrder = 'newest' | 'oldest';

export interface FilterState {
  searchText: string;
  type: 'all' | TransactionType;
  categoryId: string; // Empty string means "All"
  dateFrom: string; // YYYY-MM-DD or empty string
  dateTo: string; // YYYY-MM-DD or empty string
  sortOrder: SortOrder;
}
