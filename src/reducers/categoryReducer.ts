import type { Category } from '../types';

export type CategoryAction =
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: { id: string } };

/**
 * Reducer for managing categories array state.
 * Strictly non-mutating.
 */
export const categoryReducer = (
  state: Category[],
  action: CategoryAction
): Category[] => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [...state, action.payload];
    case 'DELETE_CATEGORY':
      return state.filter((c) => c.id !== action.payload.id);
    default:
      return state;
  }
};
