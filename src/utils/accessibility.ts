/**
 * Accessibility utilities for improved website accessibility
 */

/**
 * Add keyboard navigation support
 */
export const setupKeyboardNavigation = () => {
  // Handle escape key to close modals and mobile menus
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      // Close mobile menu
      const mobileMenuButton = document.querySelector('[aria-expanded="true"]');
      if (mobileMenuButton) {
        (mobileMenuButton as HTMLButtonElement).click();
      }
      
      // Close any open modals
      const closeButtons = document.querySelectorAll('[aria-label*="close"], [aria-label*="Close"]');
      closeButtons.forEach(button => {
        if ((button as HTMLElement).offsetParent !== null) { // Check if visible
          (button as HTMLButtonElement).click();
        }
      });
    }
  });

  // Add focus management for modals
  const trapFocus = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  };

  // Apply focus trapping to modals when they appear
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          if (element.classList?.contains('fixed') && element.classList?.contains('z-50')) {
            trapFocus(element);
          }
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

/**
 * Improve form accessibility
 */
export const enhanceFormAccessibility = () => {
  // Add proper labels and ARIA attributes to form elements
  document.querySelectorAll('form').forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      const label = form.querySelector(`label[for="${input.id}"]`) || 
                   input.closest('div')?.querySelector('label');
      
      if (label && !input.hasAttribute('aria-labelledby')) {
        if (!label.id) {
          label.id = `label-${Math.random().toString(36).substr(2, 9)}`;
        }
        input.setAttribute('aria-labelledby', label.id);
      }
      
      // Add required attribute indication
      if (input.hasAttribute('required')) {
        input.setAttribute('aria-required', 'true');
      }
      
      // Add error state ARIA attributes
      const errorElement = input.parentElement?.querySelector('.text-red-500');
      if (errorElement) {
        if (!errorElement.id) {
          errorElement.id = `error-${Math.random().toString(36).substr(2, 9)}`;
        }
        input.setAttribute('aria-describedby', errorElement.id);
        input.setAttribute('aria-invalid', 'true');
      }
    });
  });
};

/**
 * Add skip navigation link
 */
export const addSkipNavigation = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200';
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content') || document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
};

/**
 * Improve color contrast for better readability
 */
export const checkColorContrast = () => {
  // Add high contrast mode support
  const mediaQuery = window.matchMedia('(prefers-contrast: high)');
  
  const applyHighContrast = (isHighContrast: boolean) => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };
  
  applyHighContrast(mediaQuery.matches);
  mediaQuery.addEventListener('change', (e) => applyHighContrast(e.matches));
};

/**
 * Add ARIA live regions for dynamic content
 */
export const setupLiveRegions = () => {
  // Create live region for status messages
  const liveRegion = document.createElement('div');
  liveRegion.id = 'live-region';
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  document.body.appendChild(liveRegion);
  
  return liveRegion;
};

/**
 * Announce messages to screen readers
 */
export const announceToScreenReader = (message: string) => {
  const liveRegion = document.getElementById('live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};

/**
 * Initialize all accessibility features
 */
export const initializeAccessibility = () => {
  setupKeyboardNavigation();
  enhanceFormAccessibility();
  addSkipNavigation();
  checkColorContrast();
  setupLiveRegions();
  
  // Add focus indicators for better keyboard navigation
  const style = document.createElement('style');
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    
    .focus\\:not-sr-only:focus {
      position: static;
      width: auto;
      height: auto;
      padding: 0.5rem 1rem;
      margin: 0;
      overflow: visible;
      clip: auto;
      white-space: normal;
    }
    
    /* High contrast mode styles */
    .high-contrast {
      filter: contrast(150%);
    }
    
    .high-contrast .text-gray-600 {
      color: #000000 !important;
    }
    
    .high-contrast .text-gray-500 {
      color: #333333 !important;
    }
    
    /* Enhanced focus indicators */
    *:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    button:focus,
    a:focus,
    input:focus,
    select:focus,
    textarea:focus {
      outline: 2px solid #eab308;
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
};