import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { Category } from '../types';

/**
 * Custom hook to interact with category state.
 * Implements business validation constraints (e.g. block deletion if in use or default).
 */
export const useCategories = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useCategories must be used within an AppProvider');
  }

  const { categories, dispatchCategories, transactions } = context;

  // Check if a category is currently associated with any transactions
  const isCategoryInUse = (id: string): boolean => {
    return transactions.some((t) => t.categoryId === id);
  };

  // Get name of a category by ID (fallback to "Khác")
  const getCategoryNameById = (id: string): string => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : 'Khác';
  };

  // Helper to add a new category (validation: non-empty, unique name)
  const addCategory = (name: string): { success: boolean; error?: string } => {
    const cleanedName = name.trim();
    if (!cleanedName) {
      return { success: false, error: 'Tên danh mục không được trống.' };
    }

    const exists = categories.some((c) => c.name.toLowerCase() === cleanedName.toLowerCase());
    if (exists) {
      return { success: false, error: 'Danh mục đã tồn tại.' };
    }

    const newCat: Category = {
      id: `cat-${window.crypto.randomUUID()}`,
      name: cleanedName,
      isDefault: false,
    };

    dispatchCategories({ type: 'ADD_CATEGORY', payload: newCat });
    return { success: true };
  };

  // Helper to delete a category (validation: block if default or in-use)
  const deleteCategory = (id: string): { success: boolean; error?: string } => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) {
      return { success: false, error: 'Danh mục không tồn tại.' };
    }

    if (cat.isDefault) {
      return { success: false, error: 'Không thể xóa danh mục mặc định.' };
    }

    if (isCategoryInUse(id)) {
      return { success: false, error: 'Danh mục đang được sử dụng trong ít nhất một giao dịch, không thể xóa.' };
    }

    dispatchCategories({ type: 'DELETE_CATEGORY', payload: { id } });
    return { success: true };
  };

  return {
    categories,
    addCategory,
    deleteCategory,
    isCategoryInUse,
    getCategoryNameById,
  };
};
