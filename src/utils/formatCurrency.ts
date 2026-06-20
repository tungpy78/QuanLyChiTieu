/**
 * Formats a numeric amount to Vietnamese Dong currency format (e.g. 1.500.000 ₫)
 * @param amount Number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
