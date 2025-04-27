/**
 * Format currency with the specified locale and currency code
 */
export const formatCurrency = (amount: number, locale = 'en-US', currency = 'USD'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date with the specified locale and options
 */
export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Calculate days remaining until the specified date
 */
export const getDaysRemaining = (dateString: string): number => {
  const targetDate = new Date(dateString);
  const currentDate = new Date();
  
  // Reset time portion for accurate day calculation
  targetDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  
  const differenceInTime = targetDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
  return Math.max(0, differenceInDays);
};

/**
 * Generate a random group code
 */
export const generateGroupCode = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const prefix = letters.charAt(Math.floor(Math.random() * letters.length)) + 
                 letters.charAt(Math.floor(Math.random() * letters.length));
  const numbers = Math.floor(1000 + Math.random() * 9000);
  return prefix + numbers;
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current: number, total: number): number => {
  if (total <= 0) return 0;
  const percentage = (current / total) * 100;
  return Math.min(100, Math.max(0, percentage));
};