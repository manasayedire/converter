// src/reportWebVitals.ts
import { onCLS, onINP, onLCP } from 'web-vitals';

/*
 * Report web vitals
 * @see https://web.dev/vitals/
 * LCP - Largest Contentful Paint
 * @param onPerfEntry - The function to call with the web vitals data
 */
const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onLCP(onPerfEntry);
    onINP(onPerfEntry);
    onCLS(onPerfEntry);
  }
};

export default reportWebVitals;