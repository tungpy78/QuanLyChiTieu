import type { Transaction, FilterState } from '../modules/transactions/types/transaction.type';

/**
 * Filters and sorts transactions based on the filter criteria.
 * Does not mutate the original transactions array.
 * 
 * Supports:
 * - Search by name (case-insensitive)
 * - Filter by type (income/expense/all)
 * - Filter by categoryId
 * - Filter by dateFrom/dateTo (inclusive)
 * - Sort by newest/oldest (with createdAt fallback for stability)
 */
export const filterTransactions = (
  transactions: Transaction[],
  filters: FilterState
): Transaction[] => {
  // Filter creates a new array copy (non-mutating)
  const result = transactions.filter((t) => {
    // 1. Search by name (case-insensitive)
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase().trim();
      const nameLower = t.name.toLowerCase();
      if (!nameLower.includes(searchLower)) {
        return false;
      }
    }

    // 2. Filter by type
    if (filters.type !== 'all' && t.type !== filters.type) {
      return false;
    }

    // 3. Filter by categoryId
    if (filters.categoryId && t.categoryId !== filters.categoryId) {
      return false;
    }

    // 4. Filter by dateFrom (inclusive)
    if (filters.dateFrom && t.date < filters.dateFrom) {
      return false;
    }

    // 5. Filter by dateTo (inclusive)
    if (filters.dateTo && t.date > filters.dateTo) {
      return false;
    }

    return true;
  });

  // Sort by date, and fallback to createdAt for stable ordering
  result.sort((a, b) => {
    // String comparison on ISO format (YYYY-MM-DD) works correctly lexicographically
    if (a.date !== b.date) {
      return filters.sortOrder === 'newest'
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date);
    }
    // If dates are identical, fallback to createdAt timestamp
    return filters.sortOrder === 'newest'
      ? b.createdAt.localeCompare(a.createdAt)
      : a.createdAt.localeCompare(b.createdAt);
  });

  return result;
};
