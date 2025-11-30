/**
 * Global error handling utilities
 */

interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: Date;
  url: string;
  userAgent: string;
  type: 'javascript' | 'network' | 'image' | 'form';
}

class ErrorLogger {
  private errors: ErrorLog[] = [];
  private maxErrors = 50;

  log(error: Error | string, type: ErrorLog['type'] = 'javascript') {
    const errorLog: ErrorLog = {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      type
    };

    this.errors.push(errorLog);
    
    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${type.toUpperCase()}]`, errorLog);
    }
  }

  getErrors() {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
  }
}

export const errorLogger = new ErrorLogger();

/**
 * Setup global error handlers
 */
export const setupGlobalErrorHandling = () => {
  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    errorLogger.log(event.error || event.message, 'javascript');
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorLogger.log(event.reason, 'javascript');
    console.error('Unhandled promise rejection:', event.reason);
  });

  // Handle network errors
  window.addEventListener('online', () => {
    console.log('Network connection restored');
  });

  window.addEventListener('offline', () => {
    console.warn('Network connection lost');
    errorLogger.log('Network connection lost', 'network');
  });
};

/**
 * Retry mechanism for failed operations
 */
export const createRetryMechanism = <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const attempt = async () => {
      try {
        const result = await operation();
        resolve(result);
      } catch (error) {
        attempts++;
        
        if (attempts >= maxRetries) {
          errorLogger.log(error instanceof Error ? error : String(error), 'network');
          reject(error);
          return;
        }

        console.warn(`Attempt ${attempts} failed, retrying in ${delay}ms...`);
        setTimeout(attempt, delay * attempts); // Exponential backoff
      }
    };

    attempt();
  });
};

/**
 * Handle form submission errors gracefully
 */
export const handleFormError = (error: unknown, formElement?: HTMLFormElement) => {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
  
  errorLogger.log(errorMessage, 'form');
  
  // Show user-friendly error message
  const errorContainer = formElement?.querySelector('.error-container');
  if (errorContainer) {
    errorContainer.innerHTML = `
      <div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-start gap-3">
        <svg class="w-5 h-5 mt-0.5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <p class="font-medium">Submission Failed</p>
          <p class="text-sm">${errorMessage}</p>
        </div>
      </div>
    `;
  }
};

/**
 * Validate external links and resources
 */
export const validateExternalResources = async () => {
  const links = document.querySelectorAll('a[href^="http"], img[src^="http"]');
  const results: { url: string; status: 'ok' | 'error'; element: string }[] = [];
  
  for (const element of Array.from(links)) {
    const url = (element as HTMLAnchorElement).href || (element as HTMLImageElement).src;
    
    try {
      const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      results.push({
        url,
        status: 'ok',
        element: element.tagName.toLowerCase()
      });
    } catch (error) {
      results.push({
        url,
        status: 'error',
        element: element.tagName.toLowerCase()
      });
      errorLogger.log(`Failed to load resource: ${url}`, 'network');
    }
  }
  
  return results;
};