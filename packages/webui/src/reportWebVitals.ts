// src/reportWebVitals.ts
import { Metric, onCLS, onINP, onLCP } from 'web-vitals';

/*
 * Report web vitals
 * @see https://web.dev/vitals/
 * LCP - Largest Contentful Paint
 * @param onPerfEntry - The function to call with the web vitals data
 */
const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onLCP(onPerfEntry);
    onINP(onPerfEntry);
    onCLS(onPerfEntry);
  }
};

export default reportWebVitals;
