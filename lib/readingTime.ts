import readingTime from 'reading-time';

export interface ReadingTimeResult {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

/**
 * Calculate reading time and word count for text content
 * @param content - The text content to analyze
 * @returns Reading time result with word count and estimated reading time
 */
export function calculateReadingTime(content: string): ReadingTimeResult {
  const result = readingTime(content);
  
  return {
    text: result.text,
    minutes: Math.ceil(result.minutes), // Round up to nearest minute
    time: result.time,
    words: result.words,
  };
}

/**
 * Format reading time for display
 * @param minutes - Number of minutes
 * @returns Formatted reading time string
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return 'Less than 1 min read';
  }
  
  if (minutes === 1) {
    return '1 min read';
  }
  
  return `${minutes} min read`;
}

/**
 * Format word count for display
 * @param words - Number of words
 * @returns Formatted word count string
 */
export function formatWordCount(words: number): string {
  if (words < 1000) {
    return `${words} words`;
  }
  
  const thousands = Math.floor(words / 1000);
  const remainder = words % 1000;
  
  if (remainder === 0) {
    return `${thousands}k words`;
  }
  
  return `${thousands}.${Math.floor(remainder / 100)}k words`;
}
