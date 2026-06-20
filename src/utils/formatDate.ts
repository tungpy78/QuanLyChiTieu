/**
 * Converts a YYYY-MM-DD date string to DD/MM/YYYY format.
 * @param dateStr ISO date string (YYYY-MM-DD)
 * @returns Formatted date string (DD/MM/YYYY)
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
};
