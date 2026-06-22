import type { Category } from '../modules/categories/types/category.type';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-food', name: 'Ăn uống', isDefault: true },
  { id: 'cat-transport', name: 'Di chuyển', isDefault: true },
  { id: 'cat-salary', name: 'Lương', isDefault: true },
  { id: 'cat-shopping', name: 'Mua sắm', isDefault: true },
  { id: 'cat-entertain', name: 'Giải trí', isDefault: true },
  { id: 'cat-other', name: 'Khác', isDefault: true },
];
