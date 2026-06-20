import type { Transaction } from '../types';

export type TransactionAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: { id: string } };

/**
 * Reducer for managing transactions array state.
 * Strictly non-mutating.
 */
export const transactionReducer = (
  state: Transaction[],
  action: TransactionAction
): Transaction[] => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [action.payload, ...state];
    case 'UPDATE_TRANSACTION':
      return state.map((t) => (t.id === action.payload.id ? action.payload : t));
    case 'DELETE_TRANSACTION':
      return state.filter((t) => t.id !== action.payload.id);
    default:
      return state;
  }
};
