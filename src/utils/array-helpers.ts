/**
 * Utility functions for array operations
 */

/**
 * Creates a repeated array for infinite scroll animations
 * @param array - The array to repeat
 * @param repetitions - Number of times to repeat the array
 * @returns Flattened array with repeated items
 */
export const createRepeatedArray = <T>(
  array: readonly T[],
  repetitions: number
): T[] => {
  return Array.from({ length: repetitions }, () => array).flat();
};

/**
 * Creates an infinite scroll array with optimal repetitions for seamless animation
 * @param array - The array to repeat
 * @returns Array with enough repetitions for smooth infinite scroll
 */
export const createInfiniteScrollArray = <T>(array: readonly T[]): T[] => {
  // Use 3 repetitions for seamless loop (like reference code)
  const repetitions = 3;
  return createRepeatedArray(array, repetitions);
};
